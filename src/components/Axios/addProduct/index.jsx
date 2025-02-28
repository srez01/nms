import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/categories?limit=7"
        );
        setCategories(response.data);
      } catch (e) {
        console.log("Error fetching categories:", e);
      }
    }
    fetchCategories();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", parseInt(form.price));
    formData.append("description", form.description);
    formData.append("categoryId", parseInt(form.categoryId));
    formData.append("images", image); // Append the file

    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Product added successfully:", response.data);
    } catch (e) {
      console.error("Error adding product:", e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Product Name"
        value={form.title}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={form.price}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
      />
      <br />
      <select name="categoryId" value={form.categoryId} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleFileChange}
      />
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
