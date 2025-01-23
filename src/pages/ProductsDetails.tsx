import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ProductDetailsType {
  id: number;
  attributes: {
    image: string;
    title: string;
    price: number;
    category: string;
    company: string;
    description: string;
    colors: string[];
  };
}

const ProductsDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
        .then((res) => {
          if (res.status == 200) {
            setProduct(res.data.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center">
        <button className="btn loading btn-primary">LOADING...</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 mb-5 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 px-6">
      <img
        src={product.attributes.image}
        alt={product.attributes.title}
        className="w-96 h-96 object-cover rounded-lg lg:w-full"
      />
      <div className="flex flex-col">
        <h1 className="text-3xl text-slate-700 font-bold capitalize">
          {product.attributes.title}
        </h1>
        <h2 className="text-xl text-neutral-content font-bold mt-2">
          {product.attributes.company}
        </h2>
        <p className="text-xl mt-3">${product.attributes.price}</p>
        <p className="mt-6 leading-8">{product.attributes.description}</p>

        <div className="mt-6">
          <h3 className="text-md font-medium -tracking-wider capitalize">
            Colors
          </h3>
          <div className="flex gap-2">
            {product.attributes.colors.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Amount</h3>
          <div className="w-[400px]">
            <select
              className="select w-full select-primary select-bordered select-md"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-10">
          <button className="btn btn-primary  btn-md">ADD TO BAG</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
