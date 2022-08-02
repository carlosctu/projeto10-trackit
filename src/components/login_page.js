import styled from "styled-components";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Wrapper>
      <img src="../assets/img/logo.png" alt="trackIt" />
      <Form>
        <Input name="email" type="email" placeholder="email" required />
        <Input
          name="password"
          type="password"
          placeholder="password"
          required
        />
        <ButtonForm>Entrar</ButtonForm>
      </Form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 303px;
  height: 45px;
  padding-left: 11px;
`;
const ButtonForm = styled.button``;
