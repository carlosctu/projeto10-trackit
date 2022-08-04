import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useContext } from "react";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import Header from "./header";
import Navigationbar from "./navigationbar";

export default function Today() {
  // Chamando o useContext com os valores que serão alterados ao longo
  // da execução do aplicativo
  const userInfo = useContext(UserContext);
  console.log(userInfo);
  const date = dayjs().format("DD/MM ");
  const weekday = dayjs().locale("pt-br").format("dddd");
  return (
    <Wrapper>
      <Header avatar={userInfo.loginData.image} />
      <HabitsContainer>
        <HabitsTitle>
          <h1>
            {`${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${date}`}
          </h1>
          <p>Nenhum hábito conluído ainda</p>
        </HabitsTitle>
        <Habits>
          "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!"
        </Habits>
      </HabitsContainer>
      <Navigationbar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #e5e5e5;
`;

const HabitsContainer = styled.div`
  padding: 80px 17px 0 17px;
`;
const HabitsTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-family: "Lexend Deca", sans-serif;
  font-size: 23px;
  line-height: 29px;
  color: #126ba5;
  margin-bottom: 12px;
  p {
    color: #bababa;
    font-size: 18px;
    line-height: 22px;
  }
`;
const Habits = styled.div`
  margin-top: 28px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.65px;
  font-family: "Lexend Deca", sans-serif;
`;
