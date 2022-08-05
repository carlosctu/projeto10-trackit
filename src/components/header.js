import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Header({ avatar }) {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate("/hoje")}>
      <p>TrackIt</p>
      <Avatar src={avatar} alt="" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #126ba5;
  color: #ffffff;
  font-size: 39px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Playball", cursive;
  p {
    padding-left: 18px;
  }
`;
const Avatar = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 95%;
  margin-right: 18px;
`;
