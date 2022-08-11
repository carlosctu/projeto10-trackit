import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signIn } from "../../services/api";
import { ThreeDotsSpinner } from "../../utils/spinners/spinners";
import { Form, FormButtonContainer, Logo, Wrapper } from "./styles";

export default function LoginPage() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [userInfo, setInfo] = useState({
    email: "",
    password: "",
  });

  function handleForm(event) {
    setInfo((info) => ({ ...info, [event.target.name]: event.target.value }));
  }
  function handleSubmit(event) {
    setDisable(true);
    signIn(userInfo)
      .then((response) => {
        setDisable(false);
        navigate("/hoje");
        const userAuth = JSON.stringify({
          token: response.data.token,
          image: response.data.image,
        });
        localStorage.setItem("auth", userAuth);
      })
      .catch((erro) => {
        alert(erro.response.data.message);
        setDisable(false);
      });

    event.preventDefault();
  }

  return (
    <Wrapper>
      <Logo src="../assets/img/logo.png" alt="trackIt" />
      <Form onSubmit={handleSubmit}>
        <input
          onChange={handleForm}
          name="email"
          type="email"
          placeholder="email"
          value={userInfo.email}
          disabled={disable}
          required
        />
        <input
          onChange={handleForm}
          name="password"
          type="password"
          placeholder="senha"
          value={userInfo.password}
          disabled={disable}
          required
        />
        <FormButtonContainer>
          <button>{disable ? <ThreeDotsSpinner /> : "Entrar"}</button>
        </FormButtonContainer>
      </Form>
      <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
    </Wrapper>
  );
}

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #52b6ff;
`;
