import { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";
import { UserContext } from "../contexts/user_context";
import { createHabit, deleteHabit, getHabits } from "../services/api";
import Header from "./header";
import Navigationbar from "./navigationbar";

export default function HabitsPage() {
  const userInfo = useContext(UserContext);
  const token = userInfo.loginData.token;
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
    { id: 1, day: "D" },
    { id: 2, day: "S" },
    { id: 3, day: "T" },
    { id: 4, day: "Q" },
    { id: 5, day: "Q" },
    { id: 6, day: "S" },
    { id: 7, day: "S" },
  ];
  useEffect(() => {
    setRefresh(false);
    getHabits(token)
      .then((response) => {
        if (response.data.length !== 0) {
          setProgressIndicator("");
          setUserHabits(response.data.reverse());
          console.log("caiu no then");
          console.log(response.data);
          console.log(response.data.length === 0);
        } else {
          console.log("caiuaqui");
          setProgressIndicator(
            "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
          );
        }
      })
      .catch((error) => {
        console.log("caiu no error");
        setProgressIndicator(
          "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
        );
        console.log(error);
      });
  }, [token, refresh]);

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
              token={token}
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
                            deleteHabit(token, habit.id).then((response) => {
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
      <Navigationbar />
    </Wrapper>
  );
}

function NewHabit({ token, setAddHabit, setRefresh, habit, setHabit }) {
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
  const [disable, setDisable] = useState(false);

  console.log(habit.name);
  console.log(habit);
  function handleForm(event) {
    setHabit((info) => ({ ...info, [event.target.name]: event.target.value }));
  }

  useEffect(
    () => setHabit((info) => ({ ...info, days: selectedDays })),
    [selectedDays, setHabit]
  );

  return (
    <Form
      onSubmit={(event) => {
        if (habit.name === "") {
          setDisable(false);
          event.preventDefault();
          return alert("Favor colocar um hábito!");
        } else if (habit.days.length === 0) {
          setDisable(false);
          event.preventDefault();
          return alert("Favor escolher as datas do hábito!");
        }
        createHabit(habit, token)
          .then((response) => {
            if (response.status === 201) {
              setHabit({ name: "", days: "" });
              setAddHabit(false);
              setDisable(false);
              setRefresh(true);

              console.log(response);
            }
          })
          .catch((error) => {
            console.log("error:" + error.response.data.message);
            setDisable(false);
          });

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
          disabled={disable}
          required
        />
        <Days>
          {days.map((data) => {
            return (
              <Day
                key={data.id}
                day={data.day}
                id={data.id}
                habit={habit}
                setHabit={setHabit}
                setDays={setDays}
              />
            );
          })}
        </Days>
        <Buttoncontainer>
          <CardButton
            onClick={(event) => {
              console.log(event);
              setAddHabit(false);
              console.log(habit.name);
              event.preventDefault();
            }}
            color="#52B6FF"
            backgroundcolor="#ffffff"
          >
            Cancelar
          </CardButton>
          <CardButton
            onClick={() => setDisable(true)}
            color="#ffffff"
            backgroundcolor="#52B6FF"
          >
            Salvar
          </CardButton>
        </Buttoncontainer>
      </NewCard>
    </Form>
  );
}

function Day({ id, day, setDays, habit }) {
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

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
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
  border-radius: 10px;
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
