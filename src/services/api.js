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

function createHabit(habitInfo, token) {
  // Post(url, data, headers:'Authorization': token)
  const promise = axios.post(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
    habitInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return promise;
}

function getHabits(token) {
  const promise = axios.get(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return promise;
}

function deleteHabit(token, id) {
  const promise = axios.delete(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return promise;
}

export { signIn, signUp, createHabit, getHabits, deleteHabit };

