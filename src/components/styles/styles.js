import styled from "styled-components";

// Today, Habits & History Page
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.primary};
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
export const Habits = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.65px;
`;
export const HabitsBody = styled(Habits)`
  width: 340px;
  padding: 0 2px;
  color: #666666;
`;

// Spinner
export const Spinner = styled.div`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  circle {
    fill: #126ba5;
  }
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

// SplashPage Styles:
export const SplashWrapper = styled(Wrapper)`
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
`;
export const Logo = styled.img`
  width: 180px;
  height: 178px;
`;
export const Form = styled.form`
  width: 303px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
export const FormButtonContainer = styled.div`
  display: flex;
  div {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    width: 301px;
    height: 45px;
    font-size: 18px;
    font-weight: 400;
    background-color: #52b6ff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin-bottom: 25px;
  }
`;
// Header
export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #126ba5;
  color: #ffffff;
  font-size: 39px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Playball", cursive;
  p {
    padding-left: 18px;
  }
`;
export const Avatar = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 95%;
  margin-right: 18px;
`;


// Navbar
export const NavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  color: #52b6ff;
`;
export const ProgressbarContainer = styled.div`
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 95%;
  margin-bottom: 40px;
  background-color: #52b6ff;
  .CircularProgressbar-path {
    stroke: #ffffff;
  }
  .CircularProgressbar-trail {
    stroke: #52b6ff;
  }
  .CircularProgressbar-text {
    fill: #ffffff;
  }
  .CircularProgressbar-background {
    fill: green;
  }
`;