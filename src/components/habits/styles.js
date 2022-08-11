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
export const HabitsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 23px;
  color: #126ba5;
  margin-bottom: 12px;
  ion-icon {
    cursor: pointer;
    width: 41px;
    height: 35px;
  }
`;

export const HabitsBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.65px;
  width: 340px;
  padding: 0 2px;
  color: #666666;
`;
export const HabitContainer = styled.div`
  box-sizing: border-box;
  height: 91px;
  padding: 13px 0 13px 15px;
  background-color: #ffffff;
  border-radius: 10px;
`;
export const HabiTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  ion-icon {
    padding-right: 18px;
  }
`;
export const Days = styled.div`
  display: flex;
  column-gap: 4px;
`;
export const HabitDaysContainer = styled.div`
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
export const Spinner = styled.div`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  circle {
    fill: #126ba5;
  }
`;
export const Form = styled.form`
  margin-bottom: 29px;
  display: ${(props) => props.display};
`;
export const NewCard = styled.div`
  height: 180px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
export const CardInput = styled.input`
  box-sizing: border-box;
  width: 301px;
  height: 45px;
  font-size: 18px;
  margin: 10px 19px;
  &::placeholder {
    color: #dbdbdb;
  }
`;
export const DaysHabit = styled(Days)`
  width: 301px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 26px;
`;
export const DayContainer = styled.div`
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
export const Buttoncontainer = styled.div`
  width: 303px;
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;
`;
export const CardButton = styled.button`
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
