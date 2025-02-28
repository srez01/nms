import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../AddData";

// import "./Apihit.css";
// import "../"
const ApiHeat = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=10&offset=15")
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching Data:", error));
  }, []);

  const handleClick = (id) => {
    console.log("Clicked ID:", id);
    const filterdata = data.filter((item) => item.id === id);
    console.log("Filtered Data:", filterdata);
    navigate(`/${id}`, { state: { product: filterdata[0] } });
  };

  return (
    <div>
      <h1>API Data:</h1>
      <div className="card-container">
        {data &&
          data.map((item) => {
            return (
              <div key={item.id} className="card">
                <img src={item.images[0]} alt="product" />
                <div className="card-content"> </div>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-price">${item.price}</p>
                <p className="card-description">{item.description}</p>
                <button onClick={() => handleClick(item?.id)}>Edit</button>
                {/* <button onClick={}>Edit2</button>
                <button onClick={}>Delete</button> */}
              </div>
            );
          })}
      </div>
      <button
        onClick={() => {
          navigate("/addproduct");
        }}
      >
        Add Items
      </button>
    </div>
  );
};

export default ApiHeat;
