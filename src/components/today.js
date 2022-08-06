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
import { defaultMessage } from "./common/common_values";
import { Wrapper, Title, Body, Spinner } from "./styles";

export default function Today() {
  const userInfo = useContext(UserContext);
  const [habitsCounter, setCounter] = useState(0);
  const [habitsDone, setDoneCounter] = useState(0);
  const [disable, setDisable] = useState(false);
  const date = dayjs().format("DD/MM ");
  const weekday = dayjs().locale("pt-br").format("dddd");
  const [dayHabits, setHabits] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loadingContext, setLoading] = useState(
    <Spinner>
      <MutatingDots height={80} width={80} />
    </Spinner>
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
          response.data.map((habit) =>
            habit.done ? prevState++ : userInfo.setProgress(0)
          );
          return prevState;
        });
        setCounter(response.data.length);
        setHabits(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
        setLoading(defaultMessage);
      });
    setDisable(false);
  }, [refresh, userInfo]);
  return (
    <Wrapper>
      <Header avatar={userInfo.loginData.image} />
      <Body>
        <Title>
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
        </Title>
        <TodayHabits
          dayHabits={dayHabits}
          loadingContext={loadingContext}
          setRefresh={setRefresh}
          disable={disable}
          setDisable={setDisable}
        />
      </Body>
      <Navigationbar habitsProgress={userInfo.habitsProgress} />
    </Wrapper>
  );
}

function TodayHabits({
  dayHabits,
  loadingContext,
  setRefresh,
  disable,
  setDisable,
}) {
  return (
    <Habits>
      <HabitSequence>
        {dayHabits ? "" : <Text>{loadingContext}</Text>}
      </HabitSequence>

      {dayHabits
        ? dayHabits.map((habit, index) => {
            console.log(habit.currentSequence === habit.highestSequence);
            return (
              <HabitContainer key={index}>
                <HabitDescription>
                  <h1>{habit.name}</h1>
                  <p>
                    Sequência atual:
                    <Sequence
                      color={habit.currentSequence === habit.highestSequence}
                    >
                      {habit.currentSequence} dias
                    </Sequence>
                  </p>
                  <p>
                    Sequência atual:
                    <Sequence
                      color={habit.currentSequence === habit.highestSequence}
                    >
                      {habit.highestSequence} dias
                    </Sequence>
                  </p>
                </HabitDescription>
                <CheckHabitIcon
                  disable={disable ? "none" : "all"}
                  color={habit.done ? "#8FC549" : "#E7E7E7"}
                >
                  <ion-icon
                    name="checkbox"
                    onClick={() => {
                      setDisable(true);
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

const Text = styled.div`
  font-size: 18px;
  line-height: 23px;
  color: #666666;
  letter-spacing: 0;
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
    color: #666666;
    letter-spacing: 0;
  }
`;
const HabitDescription = styled.div`
  color: #666666;
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
const Sequence = styled.span`
  color: ${(props) => (props.color ? "#8FC549" : "#666666")};
  padding-left: 4px;
`;
const CheckHabitIcon = styled.div`
  color: ${(props) => props.color};
  pointer-events: ${(props) => props.disable};
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

const Habits = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.65px;
`;
