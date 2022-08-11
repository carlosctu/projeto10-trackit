import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { ProgressbarContainer, Wrapper } from "./styles";
export default function Navigationbar({ progressBar }) {
  const navigate = useNavigate();
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
