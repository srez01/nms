import React, { useEffect, useState } from "react";
// import "./style.css";

const ApiHeat = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=6&offset=2")
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching Data:", error));
  }, []);

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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ApiHeat;
