import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ApiHeat from "./components/HitApi/Products/ApiHeat";
import PutProduct from "./components/HitApi/ChangeDAta";
import AddProduct from "./components/Axios/addProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiHeat />} />
        <Route path="/:id" element={<PutProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
