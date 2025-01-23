import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductsDetails from "./pages/ProductsDetails";

const App: FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductsDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
