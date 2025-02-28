import React, { useState } from "react";

const ApiPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Create a post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea name="body" value={formData.body} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApiPost;
