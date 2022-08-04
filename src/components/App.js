import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home_page";
import LoginPage from "./login_page";
import RegisterPage from "./register_page";
import "../styles/reset.css";
import Today from "./today";
import { UserContext } from "../contexts/user_context";
import { useState } from "react";

export default function App() {
  // Definindo as informações que usarei no useContext
  const [loginData, setData] = useState("");
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ loginData, setData }}>
        <Routes>
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/habitos" element={<HomePage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
