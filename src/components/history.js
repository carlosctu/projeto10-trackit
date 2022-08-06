import Header from "./header";
import Navigationbar from "./navigationbar";
import { useContext } from "react";
import { UserContext } from "../contexts/user_context";
import styled from "styled-components";
import { Wrapper, Title, Body } from "./styles";
import { defaultMessage2 } from "./common/common_values";
export default function History() {
  const context = useContext(UserContext);
  return (
    <Wrapper>
      <Header />
      <Body>
        <Title>Histórico</Title>
        <HistoryContainer>
          {defaultMessage2}
        </HistoryContainer>
      </Body>
      <Navigationbar habitsProgress={context.habitsProgress} />
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
