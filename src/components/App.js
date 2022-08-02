import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./register_page";
import LoginPage from "./login_page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
