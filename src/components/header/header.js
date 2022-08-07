import { useNavigate } from "react-router-dom";
import { HeaderContainer, Avatar } from "../styles/styles";

export default function Header({ userAvatar }) {
  const navigate = useNavigate();
  return (
    <HeaderContainer onClick={() => navigate("/hoje")}>
      <p>TrackIt</p>
      <Avatar src={userAvatar} alt="" />
    </HeaderContainer>
  );
}

