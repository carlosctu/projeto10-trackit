import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import { signIn } from "../services/api";

export default function LoginPage() {
  const loginInfo = useContext(UserContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [userInfo, setInfo] = useState({
    email: "",
    password: "",
  });
  const auth = JSON.parse(localStorage.getItem("auth"));

  function handleForm(event) {
    setInfo((info) => ({ ...info, [event.target.name]: event.target.value }));
  }
  if (auth) {
    return (
      <>
        <Navigate to="/hoje" />
      </>
    );
  } else {
    return (
      <Wrapper>
        <Image src="../assets/img/logo.png" alt="trackIt" />
        <Form
          onSubmit={(event) => {
            setClicked(true);

            signIn(userInfo)
              .then((response) => {
                loginInfo.setData(response.data);
                setInfo({ email: "", password: "" });
                setClicked(false);
                navigate("/hoje");
                const userAuth = JSON.stringify({
                  token: response.data.token,
                  image: response.data.image,
                });
                localStorage.setItem("auth", userAuth);
              })
              .catch((erro) => {
                alert(erro.response.data.message);
                setClicked(false);
              });

            event.preventDefault();
          }}
        >
          <input
            onChange={handleForm}
            name="email"
            type="email"
            placeholder="email"
            value={userInfo.email}
            disabled={clicked}
            required
          />
          <input
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
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;
const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #52b6ff;
`;
