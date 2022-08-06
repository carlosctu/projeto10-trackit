import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../contexts/user_context";
import "../styles/reset.css";
import HabitsPage from "./habits";
import LoginPage from "./login_page";
import History from "./history";
import RegisterPage from "./register_page";
import Today from "./today";
import { ThemeProvider, createGlobalStyle } from "styled-components";


const theme = {
  primary: "#e5e5e5",
  secondary: "#126BA5",
};

const GlobalStyle = createGlobalStyle`
  div{
  font-family: "Lexend Deca", sans-serif;
    }
  input{
  height: 45px;
  padding-left: 11px;
  font-size: 16px;
  font-weight: 400;
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  }
  input::placeholder{
    color: #dbdbdb;
  }
`;

export default function App() {
  // Definindo as informações que usarei no useContext
  const [loginData, setData] = useState("");
  const [habitsProgress, setProgress] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <UserContext.Provider
          value={{ loginData, setData, habitsProgress, setProgress }}
        >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/historico" element={<History />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
