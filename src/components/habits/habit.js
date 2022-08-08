import styled from "styled-components";
import { createHabit } from "../../services/api";
import { useState, useEffect } from "react";
import { days } from "../../utils/constants";
import { ThreeDotsSpinner } from "../../utils/spinners/spinners";

export default function NewHabit({
  setAddHabit,
  addHabit,
  setRefresh,
  habit,
  setHabit,
}) {
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
      display={addHabit ? null : "none"}
      onSubmit={(event) => {
        if (habit.name === "" || habit.days.length === 0) {
          setDisable(false);
          event.preventDefault();
          return alert("Favor preencher todos os campos!");
        }
        createHabit(habit)
          .then(() => {
            setHabit({ name: "", days: "" });
            setAddHabit(false);
            setDisable(false);
            setRefresh(true);
          })
          .catch(() => {
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
          >
            Cancelar
          </CardButton>
          <CardButton onClick={() => setDisable(true)} color="#ffffff">
            {!disable ? <ThreeDotsSpinner /> : "Salvar"}
          </CardButton>
        </Buttoncontainer>
      </NewCard>
    </Form>
  );
}

function Day({ id, day, setDays }) {
  const [clicked, setClicked] = useState(false);

  function checkDay() {
    if (clicked) {
      setDays((weekday) =>
        weekday.filter((element) => {
          return element !== id;
        })
      );
    } else {
      setDays((weekday) => [...weekday, id]);
    }
    setClicked((prevState) => !prevState);
  }

  return (
    <DayContainer
      color={clicked ? "#ffffff" : "#CFCFCF"}
      onClick={() => {
        checkDay();
      }}
    >
      {day}
    </DayContainer>
  );
}

// Styles
const Form = styled.form`
  margin-bottom: 29px;
  display: ${(props) => props.display};
`;
const NewCard = styled.div`
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
  font-size: 18px;
  margin: 10px 19px;
  &::placeholder {
    color: #dbdbdb;
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
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.color === "#ffffff" ? "#CFCFCF" : "#ffffff"};
`;
const Buttoncontainer = styled.div`
  width: 303px;
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
`;
const CardButton = styled.button`
  border: none;
  font-size: 16px;
  width: 84px;
  height: 35px;
  border-radius: 5px;
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.color === "#52B6FF" ? "#ffffff" : "#52B6FF"};

  svg {
    width: 50px;
    height: 30px;
    padding-left: 12px;
  }
`;
