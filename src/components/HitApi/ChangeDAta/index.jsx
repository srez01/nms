import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const PutProduct = () => {
  const { id } = useParams(); // Extract `id` from the URL
  const location = useLocation();
  const navigate = useNavigate(); // Use `useNavigate` for redirection
  const product = location.state?.product; // Get the product data from location state

  // Initialize `data` state with product data or default values
  const [data, setData] = useState(
    product || { title: "", price: 0, description: "" }
  );

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate data before making the request
    if (!data.title || !data.price || !data.description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resource updated:", response.data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // Handle delete (DELETE request)
  const handleDelete = async () => {
    if (!id) {
      alert("Invalid product ID.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );

      if (response.status === 200) {
        alert("Product deleted successfully!");
        navigate("/"); // Redirect to home or another page after deletion
      } else {
        console.log("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-input"
        />
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          placeholder="Price"
          className="form-input"
        />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-textarea"
        ></textarea>
        <button type="submit" className="form-button">
          Update Product
        </button>
        <button type="button" onClick={handleDelete} className="delete-button">
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default PutProduct;
