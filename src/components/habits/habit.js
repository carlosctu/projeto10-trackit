import { useEffect, useState } from "react";
import { createHabit } from "../../services/api";
import { days } from "../../utils/constants";
import { ThreeDotsSpinner } from "../../utils/spinners/spinners";
import {
  Buttoncontainer,
  CardButton, CardInput, DayContainer, DaysHabit, Form,
  NewCard
} from "./styles";

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
        <DaysHabit>
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
        </DaysHabit>
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
            {!disable ? "Salvar" : <ThreeDotsSpinner />}
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
