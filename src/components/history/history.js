import Navigationbar from "../navbar/navigationbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/providers/user_context";
import styled from "styled-components";
import { Wrapper, Title, Body } from "../styles/styles";
import { defaultMessage3 } from "../../utils/constants";
import CalendarHistory from "../../utils/calendar/calendar";
import { getHistory } from "../../services/api";
import "react-calendar/dist/Calendar.css";
import { MutatingDotsSpinner } from "../../utils/spinners/spinners";
import { Spinner } from "../styles/styles";

export default function History() {
  const context = useContext(UserContext);
  const [preview, setPreview] = useState("");
  const Loading = (
    <Spinner>
      <MutatingDotsSpinner />
    </Spinner>
  );

  useEffect(() => {
    getHistory()
      .then((response) => {
        console.log(response);
        setPreview(
          <CalendarContainer>
            <CalendarHistory />
          </CalendarContainer>
        );
      })
      .catch((error) => {
        console.log(error);
        setPreview(defaultMessage3);
      });
  }, []);
  return (
    <Wrapper>
      <Body>
        <Title>Histórico</Title>
        <HistoryContainer>{preview ? preview : Loading}</HistoryContainer>
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
const CalendarContainer = styled.div``;
