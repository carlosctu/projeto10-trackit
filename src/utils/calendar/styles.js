import { CheckmarkCircle, CloseCircle } from "react-ionicons";
import styled from "styled-components";

export const HistoryBody = styled.div`
  p {
    padding-bottom: 15px;
  }
`;

export const HabitsBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
export const HabitsContainer = styled.div`
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

export const Wrapper = styled.div`
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
export const CalendarInfo = styled.div`
  p {
    margin-top: 10px;
    font-weight: 700;
  }
`;
export const Description = styled.div`
  display: flex;
  width: 240px;
  font-size: 13.5px;
  justify-content: space-between;
`;
export const DescColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
export const CheckCircle = styled(CheckmarkCircle)`
  padding-right: 20px;
  height: 12px;
  width: 12px;
  svg {
    fill: #bdcfb5;
  }
`;
export const ClosedCircle = styled(CloseCircle)`
  padding-right: 20px;
  height: 12px;
  width: 12px;
  svg {
    fill: #ba3b46;
  }
`;
