import { useContext, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { getHistory } from "../../services/api";
import CalendarHistory from "../../utils/calendar/calendar";
import { defaultMessage3 } from "../../utils/constants";
import { UserContext } from "../../utils/providers/user_context";
import { MutatingDotsSpinner } from "../../utils/spinners/spinners";
import Navigationbar from "../navbar/navigationbar";
import {
  Body, CalendarContainer,
  HistoryContainer, Spinner,
  Title,
  Wrapper
} from "./styles";

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
