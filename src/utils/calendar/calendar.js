import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { getHistory } from "../../services/api";
import {
  CalendarInfo, CheckCircle,
  ClosedCircle, DescColor, Description, HabitsBody,
  HabitsContainer, HistoryBody, Wrapper
} from "./styles";

export default function CalendarHistory() {
  const [value, onChange] = useState(new Date());
  const [dayHistory, setDays] = useState([]);
  const [showHabits, setHabits] = useState(null);

  useEffect(() => {
    getHistory()
      .then((response) => {
        setDays(response.data);
      })
      .catch((error) => console.log(error));
  }, [showHabits]);

  //   https://stackoverflow.com/questions/60446117/how-to-mark-particular-dates-in-react-calender
  function Tile({ date }) {
    const days = dayjs(date).format("DD/MM/YYYY");
    const titeClass = dayHistory.map((history) => {
      let className = "";
      if (history.day === days) {
        const done = history.habits.filter((e) => e.done);
        const all = history.habits.map((e) => e);
        if (done.length === all.length) {
          className = "done";
        } else {
          className = "notDone";
        }
      }
      return className;
    });
    return titeClass;
  }

  function handleDay(event) {
    const day = dayjs(event).format("DD/MM/YYYY");
    const hasHabits = dayHistory.filter((habit) => habit.day === day);
    if (hasHabits.length !== 0) {
      return setHabits(hasHabits);
    } else {
      return setHabits(null);
    }
  }
  return (
    <Wrapper>
      <Calendar
        calendarType="US"
        onChange={onChange}
        locale="pt-br"
        tileClassName={Tile}
        value={value}
        onClickDay={handleDay}
      />
      <CalendarInfo>
        <p>Legenda:</p>
        <Description>
          Habitos do dia completos:
          <DescColor color="#bdcfb5"></DescColor>
        </Description>
        <Description>
          Habitos do dia incompletos:
          <DescColor color="#ba3b46"></DescColor>
        </Description>
        <div>
          {showHabits ? <HistoryContainer showHabits={showHabits} /> : ""}
        </div>
      </CalendarInfo>
    </Wrapper>
  );
}

function HistoryContainer({ showHabits }) {
  return showHabits.map((e, index) => {
    return (
      <HistoryBody key={index}>
        <p>Habitos do {e.day}:</p>
        <HabitsBody>
          <HistoryHabits info={e.habits} />
        </HabitsBody>
      </HistoryBody>
    );
  });
}
function HistoryHabits({ info }) {
  return info.map((e, index) => {
    return (
      <HabitsContainer key={index}>
        {e.name}
        {e.done ? <CheckCircle /> : <ClosedCircle />}
      </HabitsContainer>
    );
  });
}
