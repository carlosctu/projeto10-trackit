import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../utils/providers/user_context";
import "../styles/reset.css";
import HabitsPage from "../components/habits/habits";
import LoginPage from "../components/splash_page/login_page";
import History from "../components/history/history";
import RegisterPage from "../components/splash_page/register_page";
import Today from "../components/today/today";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ProtectedRoute from "../utils/routes/protected_route";
import PrivateRoute from "../utils/routes/private_route";
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
  const [token, setToken] = useState("");
  const [progressBar, setProgress] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <UserContext.Provider
          value={{
            token: token,
            setToken: setToken,
            progressBar: progressBar,
            setProgress: setProgress,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route
              path="/hoje"
              element={
                <PrivateRoute>
                  <Today />
                </PrivateRoute>
              }
            />
            <Route
              path="/habitos"
              element={
                <PrivateRoute>
                  <HabitsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/historico"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
