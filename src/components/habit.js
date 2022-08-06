import styled from "styled-components";
import { createHabit } from "../services/api";
import { useState, useEffect } from "react";

export default function NewHabit({ setAddHabit, setRefresh, habit, setHabit }) {
  const days = [
    { id: 0, day: "D" },
    { id: 1, day: "S" },
    { id: 2, day: "T" },
    { id: 3, day: "Q" },
    { id: 4, day: "Q" },
    { id: 5, day: "S" },
    { id: 6, day: "S" },
  ];
  const [selectedDays, setDays] = useState([]);
  const [disable, setDisable] = useState(false);

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
        if (habit.name === "" || habit.days.length === 0) {
          setDisable(false);
          event.preventDefault();
          return alert("Favor preencher todos os campos!");
        }
        createHabit(habit)
          .then((response) => {
            setHabit({ name: "", days: "" });
            setAddHabit(false);
            setDisable(false);
            setRefresh(true);
            console.log("Habito criado: " + response);
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
              setAddHabit(false);
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
