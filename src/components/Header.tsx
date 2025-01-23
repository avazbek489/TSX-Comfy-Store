import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <div className="flex items-center justify-between px-7 bg-slate-100 py-2">
      <div className="">
        <Link
          to="/"
          className="hidden lg:flex btn btn-primary text-3xl items-center"
        >
          C
        </Link>
      </div>
      <nav className="flex gap-5">
          <Link className="btn btn-link capitalize" to="/">
            Home
          </Link>
          <Link className="btn btn-link capitalize" to="/about">
            About
          </Link>
          <Link className="btn btn-link capitalize" to="/products">
            Product
          </Link>
          <Link className="btn btn-link capitalize" to="/cart">
            Cart
          </Link>
      </nav>
      <div className="flex gap-3">
        <h2>mode</h2>
        <Link to="/cart" className="navbar-end">Cart</Link>
      </div>
    </div>
  );
};

export default Header;
