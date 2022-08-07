import { CircularProgressbar } from "react-circular-progressbar";
import { NavigationContainer, ProgressbarContainer } from "../styles/styles";
import { useNavigate } from "react-router-dom";
export default function Navigationbar({ progressBar }) {
  const navigate = useNavigate();
  return (
    <NavigationContainer>
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
        <CircularProgressbar value={progressBar} text="Hoje" />
      </ProgressbarContainer>
      <p
        onClick={() => {
          navigate("/historico");
        }}
      >
        Histórico
      </p>
    </NavigationContainer>
  );
}
