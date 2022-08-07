import { getTodayHabits, checkHabit, uncheckHabit } from "../../services/api";
import { MutatingDotsSpinner } from "../../utils/spinners/spinners";
import { UserContext } from "../../utils/providers/user_context";
import { Wrapper, Title, Body, Spinner } from "../styles/styles";
import { useContext, useEffect, useState } from "react";
import { defaultMessage2, date, weekday } from "../../utils/constants";
import "react-circular-progressbar/dist/styles.css";
import Navigationbar from "../navbar/navigationbar";
import styled from "styled-components";

export default function Today() {
  const userInfo = useContext(UserContext);
  const [dayHabits, setHabits] = useState("");
  const [habitsStatus, setStatus] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loadingContext, setLoading] = useState(
    <Spinner>
      <MutatingDotsSpinner />
    </Spinner>
  );
  useEffect(() => {
    setRefresh(false);

    getTodayHabits()
      .then((response) => {
        if (response.data.length === 0) {
          return setLoading(defaultMessage2);
        }
        setHabits(response.data.reverse());
        const done = response.data.filter((e) => e.done);
        const total = response.data.length;
        if (done.length !== 0) {
          const percentage = (done.length / total).toFixed(2) * 100;
          setStatus(<span>{percentage}% dos hábitos concluídos</span>);
          userInfo.setProgress(percentage);
        } else {
          setStatus(<p>Nenhum hábito conluído ainda</p>);
          userInfo.setProgress(0);
        }
      })
      .catch(() => {
        setLoading(defaultMessage2);
      });
  }, [refresh, userInfo]);
  return (
    <Wrapper>
      <Body>
        <Title>
          <h1>
            {`${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${date}`}
          </h1>
          {habitsStatus}
        </Title>
        <Habits>
          <HabitSequence>
            {dayHabits ? null : <Text>{loadingContext}</Text>}
          </HabitSequence>
          {dayHabits
            ? dayHabits.map((habit) => {
                return (
                  <TodayHabits
                    key={habit.id}
                    habit={habit}
                    setRefresh={setRefresh}
                  />
                );
              })
            : null}
        </Habits>
      </Body>
      <Navigationbar progressBar={userInfo.progressBar} />
    </Wrapper>
  );
}

function TodayHabits({ habit, setRefresh }) {
  const current = habit.currentSequence;
  const best = habit.highestSequence;
  const isEqual = current === best && current !== 0;
  const habitDescription = [
    { name: "Sequência atual: ", value: current },
    { name: "Seu recorde: ", value: best },
  ];

  function CheckUncheck() {
    if (habit.done) {
      uncheckHabit(habit.id)
        .then(() => {
          setRefresh(true);
        })
        .catch((error) => console.log(error));
    } else {
      checkHabit(habit.id)
        .then(() => {
          setRefresh(true);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <HabitContainer>
      <HabitDescription>
        <h1>{habit.name}</h1>
        {habitDescription.map((e, index) => {
          return (
            <p key={index}>
              {e.name}
              <Sequence color={isEqual ? "#8FC549" : "#666666"}>
                {e.value} dias
              </Sequence>
            </p>
          );
        })}
      </HabitDescription>
      <CheckHabitIcon color={habit.done ? "#8FC549" : "#E7E7E7"}>
        <ion-icon name="checkbox" onClick={() => CheckUncheck()}></ion-icon>
      </CheckHabitIcon>
    </HabitContainer>
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
  color: ${(props) => props.color};
  padding-left: 4px;
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
  background-color: #ffffff;
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
