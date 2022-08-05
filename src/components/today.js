import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import { getTodayHabits } from "../services/api";
import Header from "./header";
import Navigationbar from "./navigationbar";

export default function Today() {
  // Chamando o useContext com os valores que serão alterados ao longo
  // da execução do aplicativo
  const userInfo = useContext(UserContext);
  console.log(userInfo);
  const date = dayjs().format("DD/MM ");
  const weekday = dayjs().locale("pt-br").format("dddd");
  const [dayHabits, setHabits] = useState("");
  const token = userInfo.loginData.token;
  useEffect(() => {
    getTodayHabits(token)
      .then((response) => {
        console.log(response);
        setHabits(response.data);
      })
      .catch((error) => console.log(error));
  }, [token]);
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
          <p>
            "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
            para começar a trackear!"
          </p>

          {dayHabits
            ? dayHabits.map((habit, index) => {
                return (
                  <HabitContainer key={index}>
                    <HabitDescription>
                      {habit.name}
                      <p>{`Sequência atual: ${habit.currentSequence} dias`}</p>
                      <p>{`Sequência atual: ${habit.highestSequence} dias`}</p>
                    </HabitDescription>
                    <CheckHabitIcon>
                      <ion-icon name="checkbox"></ion-icon>
                    </CheckHabitIcon>
                  </HabitContainer>
                );
              })
            : ""}
        </Habits>
      </HabitsContainer>
      <Navigationbar />
    </Wrapper>
  );
}

const HabitDescription = styled.div``;
const CheckHabitIcon = styled.div`
  ion-icon {
    width: 69px;
    height: 69px;
    fill: #e7e7e7;
    padding-right: 15px;
  }
`;
const HabitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 340px;
  height: 91px;
  padding: 13px 0 13px 15px;
  padding-left: 15px;
  background-color: white;
  border-radius: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #e5e5e5;
  background-color: #e5e5e5;
`;

const HabitsContainer = styled.div`
  padding: 80px 17px 100px 17px;
  height: 100%;
  max-width: 100vh;
  background-color: #e5e5e5;
  width: 340px;
  align-items: center;
  justify-content: center;
  justify-self: center;
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
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 28px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.65px;
  font-family: "Lexend Deca", sans-serif;
`;
