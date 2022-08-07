import Navigationbar from "../navbar/navigationbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/providers/user_context";
import styled from "styled-components";
import { Wrapper, Title, Body } from "../styles/styles";
import { defaultMessage2 } from "../../utils/constants";
import Calendar from "react-calendar";
import { getHistory } from "../../services/api";
import "react-calendar/dist/Calendar.css";
import { MutatingDotsSpinner } from "../../utils/spinners/spinners";

export default function History() {
  const context = useContext(UserContext);
  const [value, onChange] = useState(new Date());
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getHistory()
      .then((response) => {
        console.log(response);
        setPreview(
          <CalendarContainer>
            <Calendar onChange={onChange} value={value} />
          </CalendarContainer>
        );
      })
      .catch((error) => {
        console.log(error);
        setPreview(defaultMessage2);
      });
  }, []);
  return (
    <Wrapper>
      <Body>
        <Title>Histórico</Title>
        <HistoryContainer>{preview}</HistoryContainer>
      </Body>
      <Navigationbar progressBar={context.progressBar} />
    </Wrapper>
  );
}

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #666666;
  line-height: 23px;
  letter-spacing: 0.65px;
`;
const CalendarContainer = styled.div`
  button {
  }
`;
