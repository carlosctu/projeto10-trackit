import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.primary};
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
