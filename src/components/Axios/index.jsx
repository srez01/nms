import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import AddProduct from "./addProduct";

const Product = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> <br />
          <Link to="/addproduct">Add Product</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Product Home</h1>} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Product;
