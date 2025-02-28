import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApiHeat from "../datahandle";
import PutProduct from "./ChangeDAta";
const MainPage = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ApiHeat />} />
          <Route path="/:id" element={<PutProduct />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainPage;
