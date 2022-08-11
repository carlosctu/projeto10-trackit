import { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { deleteHabit, getHabits } from "../../services/api";
import { days, defaultMessage } from "../../utils/constants";
import { UserContext } from "../../utils/providers/user_context";
import { MutatingDotsSpinner } from "../../utils/spinners/spinners";
import Navigationbar from "../navbar/navigationbar";
import NewHabit from "./habit";
import {
  Body,
  Days,
  HabitContainer,
  HabitDaysContainer,
  HabiTitleContainer,
  HabitsBody,
  HabitsTitle,
  Spinner,
  Wrapper
} from "./styles";

export default function HabitsPage() {
  const userInfo = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);
  const [addHabit, setAddHabit] = useState(false);
  const [wasClicked, setClicked] = useState(false);
  const [userHabits, setUserHabits] = useState("");
  const [habit, setHabit] = useState({
    name: "",
    days: [],
  });
  const [progressIndicator, setProgressIndicator] = useState(
    <Spinner>
      <MutatingDotsSpinner />
    </Spinner>
  );

  useEffect(() => {
    setRefresh(false);
    getHabits()
      .then((response) => {
        if (response.data.length !== 0) {
          setProgressIndicator(null);
          setUserHabits(response.data.reverse());
        } else {
          setUserHabits("");
          setProgressIndicator(defaultMessage);
        }
      })
      .catch(() => {
        setProgressIndicator(defaultMessage);
      });
  }, [refresh]);

  function handleConfirm(habitId) {
    const confirm = window.confirm(`Deseja cancelar o habito ${habitId.name}?`);
    if (confirm) {
      deleteHabit(habitId.id).then(() => {
        setRefresh(true);
      });
    }
  }

  return (
    <Wrapper>
      <Body>
        <HabitsTitle>
          Meus hábitos
          <ion-icon
            name="add-circle-outline"
            onClick={() => {
              setAddHabit(true);
            }}
          ></ion-icon>
        </HabitsTitle>
        <HabitsBody>
          {addHabit ? (
            <NewHabit
              habit={habit}
              wasClicked={wasClicked}
              setClicked={setClicked}
              setHabit={setHabit}
              addHabit={addHabit}
              setAddHabit={setAddHabit}
              setRefresh={setRefresh}
            />
          ) : null}
          {userHabits
            ? userHabits.map((habitId, index) => {
                return (
                  <HabitContainer key={index}>
                    <HabiTitleContainer>
                      {habitId.name}
                      <ion-icon
                        name="trash-outline"
                        onClick={() => handleConfirm(habitId)}
                      ></ion-icon>
                    </HabiTitleContainer>
                    <Days>
                      <UserHabitDays habitId={habitId} habitDays={days} />
                    </Days>
                  </HabitContainer>
                );
              })
            : progressIndicator}
        </HabitsBody>
      </Body>
      <Navigationbar progressBar={userInfo.progressBar} />
    </Wrapper>
  );
}

function UserHabitDays({ habitId, habitDays }) {
  return (
    <Days>
      {habitDays.map((data, index) => {
        return (
          <HabitDaysContainer
            key={index}
            color={habitId.days.includes(data.id) ? "#ffffff" : "#CFCFCF"}
          >
            {data.day}
          </HabitDaysContainer>
        );
      })}
    </Days>
  );
}
