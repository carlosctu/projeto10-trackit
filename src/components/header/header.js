import { useNavigate } from "react-router-dom";
import { Avatar, Wrapper } from "./styles";

export default function Header({ userAvatar }) {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate("/hoje")}>
      <p>TrackIt</p>
      <Avatar src={userAvatar} alt="" />
    </Wrapper>
  );
}
