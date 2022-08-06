import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useContext, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import { getTodayHabits, checkHabit, uncheckHabit } from "../services/api";
import Header from "./header";
import Navigationbar from "./navigationbar";

export default function Today() {
  // Chamando o useContext com os valores que serão alterados ao longo
  // da execução do aplicativo
  const userInfo = useContext(UserContext);
  const [habitsCounter, setCounter] = useState(0);
  const [habitsDone, setDoneCounter] = useState(0);
  const date = dayjs().format("DD/MM ");
  const weekday = dayjs().locale("pt-br").format("dddd");
  const [dayHabits, setHabits] = useState("");
  const [refresh, setRefresh] = useState(false);
  const defaultMessage =
    "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!";
  const [loadingContext, setLoading] = useState(
    <MutatingDots height={80} width={80} />
  );

  function calculateProgress(done, total) {
    const progress = (done / total).toFixed(2) * 100;
    userInfo.setProgress(progress);
    return progress;
  }

  useEffect(() => {
    setRefresh(false);
    getTodayHabits()
      .then((response) => {
        if (response.data.length === 0) {
          return setLoading(defaultMessage);
        }
        setDoneCounter(0);
        setDoneCounter((prevState) => {
          response.data.map((habit) => (habit.done ? prevState++ : null));
          return prevState;
        });
        setCounter(response.data.length);
        setHabits(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
        setLoading(defaultMessage);
      });
  }, [refresh]);
  return (
    <Wrapper>
      <Header avatar={userInfo.loginData.image} />
      <HabitsContainer>
        <HabitsTitle>
          <h1>
            {`${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${date}`}
          </h1>

          {habitsDone ? (
            <span>
              {calculateProgress(habitsDone, habitsCounter)}% dos hábitos
              concluídos
            </span>
          ) : (
            <p>Nenhum hábito conluído ainda </p>
          )}
        </HabitsTitle>
        <TodayHabits
          dayHabits={dayHabits}
          loadingContext={loadingContext}
          setRefresh={setRefresh}
          setDoneCounter={setDoneCounter}
          habitsDone={habitsDone}
        />
      </HabitsContainer>
      <Navigationbar habitsProgress={userInfo.habitsProgress} />
    </Wrapper>
  );
}

function TodayHabits({ dayHabits, loadingContext, setRefresh }) {
  return (
    <Habits>
      <HabitSequence>
        {dayHabits ? "" : <Spinner>{loadingContext}</Spinner>}
      </HabitSequence>

      {dayHabits
        ? dayHabits.map((habit, index) => {
            return (
              <HabitContainer key={index}>
                <HabitDescription>
                  <h1>{habit.name}</h1>
                  <p>{`Sequência atual: ${habit.currentSequence} dias`}</p>
                  <p>{`Sequência atual: ${habit.highestSequence} dias`}</p>
                </HabitDescription>
                <CheckHabitIcon color={habit.done ? "#8FC549" : "#E7E7E7"}>
                  <ion-icon
                    name="checkbox"
                    onClick={() => {
                      if (habit.done) {
                        uncheckHabit(habit.id)
                          .then((response) => {
                            console.log(response);
                            setRefresh(true);
                          })
                          .catch((error) => console.log(error));
                      } else {
                        checkHabit(habit.id)
                          .then((response) => {
                            console.log(response);
                            setRefresh(true);
                          })
                          .catch((error) => console.log(error));
                      }
                    }}
                  ></ion-icon>
                </CheckHabitIcon>
              </HabitContainer>
            );
          })
        : ""}
    </Habits>
  );
}
const Spinner = styled.div`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 23px;
  font-family: "Lexend Deca", sans-serif;
  color: #666666;
  letter-spacing: 0;
  circle {
    fill: #126ba5;
  }
`;
const HabitSequence = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2px;
  p {
    font-size: 18px;
    line-height: 23px;
    font-family: "Lexend Deca", sans-serif;
    color: #666666;
    letter-spacing: 0;
  }
`;
const HabitDescription = styled.div`
  color: #666666;
  font-family: "Lexend Deca", sans-serif;
  p {
    font-size: 13px;
    line-height: 17px;
  }
  h1 {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 7px;
  }
`;
const CheckHabitIcon = styled.div`
  color: ${(props) => props.color};
  ion-icon {
    width: 69px;
    height: 69px;
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
  display: flex;
  justify-content: center;
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
  h1{
    margin-bottom: 5px;
  }
  p {
    color: #bababa;
    font-size: 18px;
    line-height: 22px;
  }
  span {
    font-size: 18px;
    line-height: 22px;
    color: #8fc549;
    letter-spacing: 0.5;
  }
`;
const Habits = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.65px;
  font-family: "Lexend Deca", sans-serif;
`;
