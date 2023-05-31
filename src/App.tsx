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
import SimStore from "./pages/store";
import Sim_Contact from "./pages/contact";
import AdminRegister from "./pages/admin/authen/register";

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
        <Route path="/lien-he" element={<Sim_Contact />} />
        <Route path="/gio-hang" element={<SimStore />} />
        <Route path="/sim/chi-tiet-sim/:sim" element={<SimDetail />} />
        <Route path="/sim/:cate" element={<Categorys />} />
        <Route path="/sim/:cate/:product" element={<Categorys />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
