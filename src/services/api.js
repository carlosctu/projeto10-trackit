import axios from "axios";

function signUp(userInfo) {
  const promise = axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
    userInfo
  );
  return promise;
}

function signIn(userInfo) {
  const promise = axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
    userInfo
  );
  return promise;
}

export { signIn, signUp };
