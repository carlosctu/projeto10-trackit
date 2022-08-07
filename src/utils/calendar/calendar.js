import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "dayjs/locale/pt-br";
import { getHistory } from "../../services/api";
import dayjs from "dayjs";
import styled from "styled-components";
import { CheckmarkCircle, CloseCircle } from "react-ionicons";

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
    setHabits(hasHabits);
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

const HistoryBody = styled.div`
  p {
    padding-bottom: 15px;
  }
`;
const CheckCircle = styled(CheckmarkCircle)`
  padding-right: 20px;
  height: 12px;
  width: 12px;
  svg {
    fill: #bdcfb5;
  }
`;
const ClosedCircle = styled(CloseCircle)`
  padding-right: 20px;
  height: 12px;
  width: 12px;
  svg {
    fill: #ba3b46;
  }
`;

const HabitsBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
const HabitsContainer = styled.div`
  display: flex;
  align-items: unset;
  justify-content: space-between;
  box-sizing: border-box;
  width: 340px;
  height: 51px;
  padding: 13px 0 13px 15px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  .react-calendar {
    border-radius: 10px;
    font-family: "Lexend Deca", sans-serif;
  }
  .react-calendar__navigation__label {
    font-family: "Lexend Deca", sans-serif;
    font-size: 14px;
  }

  .react-calendar__month-view__days__day {
    border-radius: 25%;
  }
  .react-calendar__month-view__weekdays__weekday {
    font-size: 13px;
  }
  .done {
    background-color: #bdcfb5;
    color: #ffffff;
  }
  .notDone {
    background-color: #ba3b46;
    color: #ffffff;
  }
`;
const CalendarInfo = styled.div`
  p {
    margin-top: 10px;
    font-weight: 700;
  }
`;
const Description = styled.div`
  display: flex;
  width: 240px;
  font-size: 13.5px;
  justify-content: space-between;
`;
const DescColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
