import React, { useState } from "react";
// import "./style.css";
const ProductForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null, // For file upload
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for file upload
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      // Send POST request to the server
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        body: data, // FormData is sent as the body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          required
        />
      </div>

      <div>
        <input
          type="file"
          name="image"
          placeholder="ImageFile"
          onChange={handleFileChange}
          accept="image/*" // Only allow image files
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
