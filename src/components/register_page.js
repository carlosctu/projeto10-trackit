import { useState } from "react";
import { signUp } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [registerInfo, setInfo] = useState({
    email: "",
    name: "",
    image: "",
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
          setClicked(true);
          signUp(registerInfo)
            .then((response) => {
              if (response.status === 201) {
                setInfo({ email: "", name: "", image: "", password: "" });
                setClicked(false);
                navigate("/");
              }
            })
            .catch((erro) => {
              console.log(erro);
              if (
                erro.response.status === 409 ||
                erro.response.status === 422
              ) {
                alert(erro.response.data.message);
                setClicked(false);
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
          value={registerInfo.email}
          disabled={clicked}
          required
        />
        <Input
          onChange={handleForm}
          name="password"
          type="password"
          placeholder="password"
          value={registerInfo.password}
          disabled={clicked}
          required
        />
        <Input
          onChange={handleForm}
          name="name"
          type="text"
          placeholder="nome"
          value={registerInfo.name}
          disabled={clicked}
          required
        />
        <Input
          onChange={handleForm}
          name="image"
          type="photo"
          placeholder="foto"
          value={registerInfo.image}
          disabled={clicked}
          required
        />
        <FormButtonContainer>
          <ButtonForm>
            {clicked ? (
              <ThreeDots color="#ffffff" height={65} width={80} />
            ) : (
              "Entrar"
            )}
          </ButtonForm>
        </FormButtonContainer>
      </Form>
      <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
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
const FormButtonContainer = styled.div`
  display: flex;
  div {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ButtonForm = styled.button`
  width: 301px;
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
  text-align: center;
`;
