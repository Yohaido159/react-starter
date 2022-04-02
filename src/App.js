import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";

import InitApp from "./pages/InitApp/InitApp";

function App() {
  return (
    <div className="rtl" style={{ minHeight: "100vh", height: "100vh" }}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <InitApp />
    </div>
  );
}

export default App;
