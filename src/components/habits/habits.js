import { MutatingDotsSpinner } from "../../utils/spinners/spinners";
import { UserContext } from "../../utils/providers/user_context";
import { defaultMessage, days } from "../../utils/constants";
import { deleteHabit, getHabits } from "../../services/api";
import { Wrapper, Body, Spinner } from "../styles/styles";
import { useContext, useEffect, useState } from "react";
import Navigationbar from "../navbar/navigationbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import NewHabit from "./habit";

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
        <Habits>
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
        </Habits>
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

const HabiTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  ion-icon {
    padding-right: 18px;
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

const HabitDaysContainer = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.color === "#ffffff" ? "#CFCFCF" : "#ffffff"};
`;
const Days = styled.div`
  width: 301px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 4px;
  margin-bottom: 26px;
`;

const HabitsTitle = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: 0 2px;
  font-size: 18px;
  line-height: 23px;
  color: #666666;
`;
