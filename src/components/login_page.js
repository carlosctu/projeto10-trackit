import { useState } from "react";
import { signIn } from "../services/api";
import { Link } from "react-router-dom";
import styled from "styled-components";

// narutaocareca@hotmail.com
// narutocareca

export default function LoginPage() {
  const [userInfo, setInfo] = useState({
    email: "",
    password: "",
  });
  function handleForm(event) {
    setInfo((info) => ({ ...info, [event.target.name]: event.target.value }));
  }
  return (
    <Wrapper>
      <Image src="../assets/img/logo.png" alt="trackIt" />
      <Form
        onSubmit={(event) => {
          try {
            signIn(userInfo).then((response) => {
              if (response.status === 200) {
                setInfo({ email: "", password: "" });
                alert("Eventualmente HomePage...");
              }
            });
          } catch (error) {
            console.log(error);
          }
          signIn(userInfo).catch((erro) => {
            if (erro.response.status === 401) {
              alert(erro.response.data.message);
            }
          });
          event.preventDefault();
        }}
      >
        <Input
          onChange={handleForm}
          name="email"
          type="email"
          placeholder="email"
          value={userInfo.email}
          required
        />
        <Input
          onChange={handleForm}
          name="password"
          type="password"
          placeholder="senha"
          value={userInfo.password}
          required
        />
        <ButtonForm>Entrar</ButtonForm>
      </Form>
      <StyledLink to="/cadastro">Não tem uma conta? Cadastre-se!</StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
`;
const Image = styled.img`
  width: 180px;
  height: 178px;
`;
const Form = styled.form`
  width: 303px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
const Input = styled.input`
  height: 45px;
  padding-left: 11px;
  font-size: 18px;
  font-weight: 400;
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  &::placeholder {
    color: #dbdbdb;
    font-family: "Lexend Deca", sans-serif;
  }
`;
const ButtonForm = styled.button`
  height: 45px;
  font-size: 18px;
  font-weight: 400;
  background-color: #52b6ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  margin-bottom: 25px;
  font-family: "Lexend Deca", sans-serif;
`;
const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #52b6ff;
`;
