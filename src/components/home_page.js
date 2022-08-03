import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
  const [habitsList, setHabits] = useState(false);
  const location = useLocation();
  return (
    <Wrapper>
      <Header>
        <p>trackIt</p>
        <HeaderAvatar src={location.state.image} alt="user avatar" />
      </Header>
      <HabitsContainer>
        <HabitsTitle>
          <p>Meus hábitos</p>
          <ion-icon name="add-circle-outline"></ion-icon>
        </HabitsTitle>
        <Habits>
          {habitsList
            ? ""
            : "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"}
        </Habits>
      </HabitsContainer>
      <NavigationBar>
        <p>Hábitos</p>
        <p>Histórico</p>
      </NavigationBar>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #126ba5;
  color: #ffffff;
  font-size: 39px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    padding-left: 18px;
  }
`;
const HeaderAvatar = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  padding-right: 18px;
`;
const HabitsContainer = styled.div`
  margin-top: 80px;
  padding: 0 17px;
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

const NavigationBar = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  font-family: "Lexend Deca", sans-serif;
  line-height: 22px;
  color: #52b6ff;
`;
