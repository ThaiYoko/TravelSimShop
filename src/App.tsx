import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";

import { data_api } from "./sp/api/data";
import { Load_Data_Pl_Success } from "./sp/redux/slice/data";
import { useDispatch } from "react-redux";
import SimDetail from "./pages/simDetail";
import Categorys from "./pages/categorys";
import AdminLogin from "./pages/admin/authen/login";
import AdminDashboard from "./pages/admin/dashboard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handle_load_data = async () => {
      await data_api.load_data(dispatch, Load_Data_Pl_Success);
    };
    handle_load_data();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorys/:cate" element={<Categorys />} />
        <Route path="/product/:id" element={<SimDetail />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
