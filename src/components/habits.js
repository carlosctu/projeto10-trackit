import { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import { createHabit, getHabits } from "../services/api";
import Header from "./header";
import Navigationbar from "./navigationbar";

export default function HabitsPage() {
  const userInfo = useContext(UserContext);
  const token = userInfo.loginData.token;
  const [addHabit, setAddHabit] = useState(false);
  const [userHabits, setUserHabits] = useState("");
  const days = [
    { id: 1, day: "D" },
    { id: 2, day: "S" },
    { id: 3, day: "T" },
    { id: 4, day: "Q" },
    { id: 5, day: "Q" },
    { id: 6, day: "S" },
    { id: 7, day: "S" },
  ];
  useEffect(() => {
    getHabits(token)
      .then((response) => {
        setUserHabits(response.data);
        console.log(userHabits);
      })
      .catch((error) => console.log(error));
  }, [token]);
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
          {addHabit ? <NewHabit token={token} /> : ""}
          {userHabits ? (
            userHabits.map((habit, index) => {
              return (
                <HabitContainer key={index}>
                  <HabitName>{habit.name}</HabitName>
                  <Days>
                    {days.map((data, i) => {
                      return (
                        <HabitDaysContainer
                          key={i}
                          color={
                            habit.days.includes(data.id) ? "#ffffff" : "#CFCFCF"
                          }
                          backgroundcolor={
                            habit.days.includes(data.id) ? "#CFCFCF" : "#ffffff"
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
          ) : (
            <p>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          )}
        </Habits>
      </HabitsContainer>
      <Navigationbar />
    </Wrapper>
  );
}

function NewHabit({ token }) {
  const days = [
    { id: 1, day: "D" },
    { id: 2, day: "S" },
    { id: 3, day: "T" },
    { id: 4, day: "Q" },
    { id: 5, day: "Q" },
    { id: 6, day: "S" },
    { id: 7, day: "S" },
  ];
  const [selectedDays, setDays] = useState([]);
  const [habit, setHabit] = useState({
    name: "",
    days: [],
  });
  console.log(habit);
  function handleForm(event) {
    setHabit((info) => ({ ...info, [event.target.name]: event.target.value }));
  }

  useEffect(
    () => setHabit((info) => ({ ...info, days: selectedDays })),
    [selectedDays]
  );

  return (
    <Form
      onSubmit={(event) => {
        console.log(token);

        createHabit(habit, token)
          .then((response) => {
            if (response.status === 201) {
              setHabit({ name: "", days: "" });
              console.log(response);
            }
          })
          .catch((error) => console.log(error));

        event.preventDefault();
      }}
    >
      <NewCard>
        <CardInput
          placeholder="nome do hábito"
          type="text"
          name="name"
          value={habit.name}
          onChange={handleForm}
          required
        />
        <Days>
          {days.map((data) => {
            return (
              <Day
                key={data.id}
                day={data.day}
                id={data.id}
                setHabit={setHabit}
                setDays={setDays}
              />
            );
          })}
        </Days>
        <Buttoncontainer>
          <CardButton color="#52B6FF" backgroundcolor="#ffffff">
            Cancelar
          </CardButton>
          <CardButton color="#ffffff" backgroundcolor="#52B6FF">
            Salvar
          </CardButton>
        </Buttoncontainer>
      </NewCard>
    </Form>
  );
}

function Day({ id, day, setDays }) {
  const [clicked, setClicked] = useState(false);

  return (
    <DayContainer
      color={clicked ? "#ffffff" : "#CFCFCF"}
      backgroundcolor={clicked ? "#CFCFCF" : "#ffffff"}
      onClick={() => {
        if (clicked) {
          setDays((days) =>
            days.filter((element) => {
              return element !== id;
            })
          );
        } else {
          setDays((days) => [...days, id]);
        }
        setClicked((prevState) => !prevState);
      }}
    >
      {day}
    </DayContainer>
  );
}

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

// Styles
const Form = styled.form`
  margin-bottom: 29px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const NewCard = styled.div`
  width: 340px;
  height: 180px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CardInput = styled.input`
  box-sizing: border-box;
  width: 301px;
  height: 45px;
  padding-left: 11px;
  font-size: 18px;
  font-weight: 400;
  border: 2px solid #d4d4d4;
  border-radius: 4px;
  margin: 10px 19px;
  &::placeholder {
    color: #dbdbdb;
    font-family: "Lexend Deca", sans-serif;
  }
`;
const Days = styled.div`
  width: 301px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 4px;
  margin-bottom: 26px;
`;
const DayContainer = styled.div`
  cursor: pointer;
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
const Buttoncontainer = styled.div`
  width: 303px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 12px;
`;
const CardButton = styled.button`
  border: none;
  font-size: 16px;
  line-height: 20px;
  width: 84px;
  height: 35px;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e5e5e5;
`;
const HabitsContainer = styled.div`
  width: 340px;
  align-items: center;
  justify-content: center;
  justify-self: center;
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
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 340px;
  padding: 0 2px;
  font-size: 18px;
  line-height: 23px;
  font-family: "Lexend Deca", sans-serif;
  color: #666666;
`;
