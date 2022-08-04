import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signIn } from "../services/api";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../contexts/user_context";

// narutaocareca@hotmail.com
// narutocareca
// sadsamuraidog@gmail.com
// 123456

export default function LoginPage({ setLoginInfo }) {
  const loginInfo = useContext(UserContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
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
          setClicked(true);

          signIn(userInfo)
            .then((response) => {
              if (response.status === 200) {
                loginInfo.setData(response.data);
                setInfo({ email: "", password: "" });
                setClicked(false);
                navigate("/hoje", {
                  state: {
                    image: response.data.image,
                    token: response.data.token,
                  },
                  replace: true,
                });
              }
            })
            .catch((erro) => {
              console.log(erro);
              if (erro.response.status === 401) {
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
          value={userInfo.email}
          disabled={clicked}
          required
        />
        <Input
          onChange={handleForm}
          name="password"
          type="password"
          placeholder="senha"
          value={userInfo.password}
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
`;
