import { useState } from "react";
import { signUp } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDotsSpinner } from "../../utils/spinners/spinners";
import {
  SplashWrapper,
  Logo,
  Form,
  FormButtonContainer,
} from "../styles/styles";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [registerInfo, setInfo] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });

  function handleForm(event) {
    setInfo((info) => ({ ...info, [event.target.name]: event.target.value }));
  }
  function handleSubmit(event) {
    setDisable(true);
    signUp(registerInfo)
      .then(() => {
        setDisable(false);
        navigate("/");
      })
      .catch((erro) => {
        alert(erro.response.data.message);
        setDisable(false);
      });
    event.preventDefault();
  }
  return (
    <SplashWrapper>
      <Logo src="../assets/img/logo.png" alt="trackIt" />
      <Form onSubmit={handleSubmit}>
        <input
          onChange={handleForm}
          name="email"
          type="email"
          placeholder="email"
          value={registerInfo.email}
          disabled={disable}
          required
        />
        <input
          onChange={handleForm}
          name="password"
          type="password"
          placeholder="password"
          value={registerInfo.password}
          disabled={disable}
          required
        />
        <input
          onChange={handleForm}
          name="name"
          type="text"
          placeholder="nome"
          value={registerInfo.name}
          disabled={disable}
          required
        />
        <input
          onChange={handleForm}
          name="image"
          type="photo"
          placeholder="foto"
          value={registerInfo.image}
          disabled={disable}
          required
        />
        <FormButtonContainer>
          <button>{disable ? <ThreeDotsSpinner /> : "Entrar"}</button>
        </FormButtonContainer>
      </Form>
      <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
    </SplashWrapper>
  );
}

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #52b6ff;
  text-align: center;
`;
