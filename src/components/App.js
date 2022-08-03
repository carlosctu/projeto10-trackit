import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home_page";
import LoginPage from "./login_page";
import RegisterPage from "./register_page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/habitos" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
