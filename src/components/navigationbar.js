import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
export default function Navigationbar() {
  const navigate = useNavigate();
  return (
    <NavigationBar>
      <p
        onClick={() => {
          navigate("/habitos");
        }}
      >
        Hábitos
      </p>
      <ProgressbarContainer
        onClick={() => {
          navigate("/hoje");
        }}
      >
        <CircularProgressbar value="0" text="Hoje" />
      </ProgressbarContainer>
      <p>Histórico</p>
    </NavigationBar>
  );
}
const ProgressbarContainer = styled.div`
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
const NavigationBar = styled.div`
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
  font-family: "Lexend Deca", sans-serif;
  line-height: 22px;
  color: #52b6ff;
`;
