import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.primary};
`;
export const Body = styled.div`
  padding: 80px 17px 100px 17px;
  height: 100%;
  max-width: 100vh;
  background-color: ${(props) => props.theme.primary};
  width: 340px;
  align-items: center;
  justify-content: center;
  justify-self: center;
`;
export const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 23px;
  line-height: 29px;
  color: #126ba5;
  margin-bottom: 12px;
  h1 {
    margin-bottom: 5px;
  }
  p {
    color: #bababa;
    font-size: 18px;
    line-height: 22px;
  }
  span {
    font-size: 18px;
    line-height: 22px;
    color: #8fc549;
    letter-spacing: 0.5;
  }
`;
export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #666666;
  line-height: 23px;
  letter-spacing: 0.65px;
`;
export const Spinner = styled.div`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  circle {
    fill: #126ba5;
  }
`;
export const CalendarContainer = styled.div``;
