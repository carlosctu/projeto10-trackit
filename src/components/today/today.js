import { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { checkHabit, getTodayHabits, uncheckHabit } from "../../services/api";
import { date, defaultMessage2, weekday } from "../../utils/constants";
import { UserContext } from "../../utils/providers/user_context";
import { MutatingDotsSpinner } from "../../utils/spinners/spinners";
import Navigationbar from "../navbar/navigationbar";
import {
  Body, CheckHabitIcon,
  HabitContainer,
  HabitDescription, Habits, HabitSequence,
  Sequence, Spinner, Text, Title, Wrapper
} from "./styles";

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
          const percentage = ((done.length / total * 100).toFixed(2));
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
