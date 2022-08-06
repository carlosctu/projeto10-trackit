import { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import { deleteHabit, getHabits } from "../services/api";
import NewHabit from "./habit";
import Header from "./header";
import Navigationbar from "./navigationbar";

export default function HabitsPage() {
  const defaultMessage =
    "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!";
  const userInfo = useContext(UserContext);
  console.log("userInfo" + userInfo.habitPercentage);
  // Atualiza os habitos quando um novo for inserido
  const [refresh, setRefresh] = useState(false);
  const [addHabit, setAddHabit] = useState(false);
  const [userHabits, setUserHabits] = useState("");
  const [habit, setHabit] = useState({
    name: "",
    days: [],
  });
  const [progressIndicator, setProgressIndicator] = useState(
    <Spinner>
      <MutatingDots height={80} width={80} />
    </Spinner>
  );
  const days = [
    { id: 0, day: "D" },
    { id: 1, day: "S" },
    { id: 2, day: "T" },
    { id: 3, day: "Q" },
    { id: 4, day: "Q" },
    { id: 5, day: "S" },
    { id: 6, day: "S" },
  ];
  useEffect(() => {
    setRefresh(false);
    getHabits()
      .then((response) => {
        if (response.data.length !== 0) {
          setProgressIndicator("");
          setUserHabits(response.data.reverse());
          console.log("Lista Habitos: " + response.data);
        } else {
          setUserHabits("");
          setProgressIndicator(defaultMessage);
        }
      })
      .catch((error) => {
        console.log(error);
        setProgressIndicator(defaultMessage);
      });
  }, [refresh]);

  return (
    <Wrapper>
      <Header avatar={userInfo.loginData.image} />
      <HabitsContainer>
        <HabitsTitle>
          <p>Meus hábitos</p>
          <ion-icon
            name="add-circle-outline"
            onClick={() => {
              setAddHabit(true);
            }}
          ></ion-icon>
        </HabitsTitle>
        <Habits>
          {addHabit ? (
            <NewHabit
              habit={habit}
              setHabit={setHabit}
              setAddHabit={setAddHabit}
              setRefresh={setRefresh}
            />
          ) : (
            ""
          )}
          {userHabits
            ? userHabits.map((habit, index) => {
                console.log(habit);
                return (
                  <HabitContainer key={index}>
                    <HabiTitleContainer>
                      <HabitName>{habit.name}</HabitName>
                      <ion-icon
                        name="trash-outline"
                        onClick={() => {
                          const confirm = window.confirm(
                            `Deseja cancelar o habito ${habit.name}?`
                          );
                          if (confirm) {
                            deleteHabit(habit.id).then((response) => {
                              setRefresh(true);
                              console.log(response);
                            });
                          }
                        }}
                      ></ion-icon>
                    </HabiTitleContainer>
                    <Days>
                      {days.map((data, i) => {
                        return (
                          <HabitDaysContainer
                            key={i}
                            color={
                              habit.days.includes(data.id)
                                ? "#ffffff"
                                : "#CFCFCF"
                            }
                            backgroundcolor={
                              habit.days.includes(data.id)
                                ? "#CFCFCF"
                                : "#ffffff"
                            }
                          >
                            {data.day}
                          </HabitDaysContainer>
                        );
                      })}
                    </Days>
                    <Buttoncontainer></Buttoncontainer>
                  </HabitContainer>
                );
              })
            : progressIndicator}
        </Habits>
      </HabitsContainer>
      <Navigationbar habitsProgress={userInfo.habitsProgress} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HabitsContainer = styled.div`
  height: 100%;
  max-width: 100vh;
  background-color: #e5e5e5;
  width: 340px;
  align-items: center;
  justify-content: center;
  justify-self: center;
  padding: 80px 17px 0 17px;
`;
const HabiTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ion-icon {
    padding-right: 18px;
  }
`;
const Spinner = styled.div`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  circle {
    fill: #126ba5;
  }
`;
const HabitContainer = styled.div`
  box-sizing: border-box;
  width: 340px;
  height: 91px;
  padding: 13px 0 13px 15px;
  padding-left: 15px;
  background-color: white;
  border-radius: 10px;
`;
const HabitName = styled.p`
  margin-bottom: 8px;
`;
const HabitDaysContainer = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
`;

const Days = styled.div`
  width: 301px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 4px;
  margin-bottom: 26px;
`;

const Buttoncontainer = styled.div`
  width: 303px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 12px;
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
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 340px;
  padding: 0 2px 100px 2px;
  font-size: 18px;
  line-height: 23px;
  font-family: "Lexend Deca", sans-serif;
  color: #666666;
`;
