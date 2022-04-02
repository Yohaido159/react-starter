import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import MainPage from "./pages/MainPage/MainPage";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";

import InitApp from "./pages/InitApp/InitApp";

function App() {
  return (
    <div className="rtl" style={{ minHeight: "100vh", height: "100vh" }}>
      <Routes>
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<Login />} />
        {/* <Route path="/" element={<MainPage />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      <InitApp />
    </div>
  );
}

export default App;
