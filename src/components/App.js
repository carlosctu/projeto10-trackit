import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../contexts/user_context";
import "../styles/reset.css";
import HabitsPage from "./habits";
import LoginPage from "./login_page";
import RegisterPage from "./register_page";
import Today from "./today";

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
          <Route path="/habitos" element={<HabitsPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
