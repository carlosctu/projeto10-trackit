import styled from "styled-components";

export const Wrapper = styled.div`
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
