import Header from "./header";
import Navigationbar from "./navigationbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/user_context";

export default function HomePage() {
  const avatar = useContext(UserContext);
  return (
    <Wrapper>
      <Header avatar={avatar.loginData.image} />
      <HabitsContainer>
        <HabitsTitle>
          <p>Meus hábitos</p>
          <ion-icon name="add-circle-outline"></ion-icon>
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
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Lexend Deca", sans-serif;
  font-size: 23px;
  line-height: 29px;
  color: #126ba5;
  margin-bottom: 12px;
  ion-icon {
    cursor: pointer;
    width: 41px;
    height: 35px;
  }
`;
const Habits = styled.div`
  font-size: 18px;
  line-height: 23px;
  font-family: "Lexend Deca", sans-serif;
`;
