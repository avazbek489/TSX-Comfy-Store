import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProductType {
  id: number
  attributes: {
    image: string;
    title: string;
    price: number;
    category: string;
    company: string;
  };
}

const Products: FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filterProduct, setFilterProduct] = useState<ProductType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [company, setCompany] = useState<string>("all");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products")
      .then((res) => {
        if (res.status == 200) {
          setProducts(res.data.data);
          setFilterProduct(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtProduct = products;

    if (search) {
      filtProduct = filtProduct.filter((el) =>
        el.attributes.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category != "all") {
      filtProduct = filtProduct.filter(
        (el) => el.attributes.category == category
      );
    }

    if (company != "all") {
      filtProduct = filtProduct.filter(
        (el) => el.attributes.company == company
      );
    }

    setFilterProduct(filtProduct);
  }, [search, category, company, products]);

  return (
    <>
      <div className="flex gap-6 justify-center py-5 bg-slate-200">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">all</option>
          <option value="Kids">Kids</option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
          <option value="Sofas">Sofas</option>
          <option value="Beds">Beds</option>
        </select>
        <select
          className="select select-bordered w-full max-w-xs"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="all">all</option>
          <option value="Modenza">Modenza</option>
          <option value="Luxora">Luxora</option>
          <option value="Artifex">Artifex</option>
          <option value="Comfora">Comfora</option>
          <option value="Homestead">Homestead</option>
        </select>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {filterProduct.map((product, index) => (
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              key={index}
              className="card text-center p-4 w-[350px] cursor-pointer shadow-xl hover:shadow-2xl transition duration-300"
            >
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-[200px] rounded-xl object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {product.attributes.title}
                </h2>
                <p className="text-primary mt-2">${product.attributes.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
