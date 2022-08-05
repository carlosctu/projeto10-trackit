import axios from "axios";

const baseURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function signUp(userInfo) {
  const promise = axios.post(`${baseURL}/auth/sign-up`, userInfo);
  return promise;
}

function signIn(userInfo) {
  const promise = axios.post(`${baseURL}/auth/login`, userInfo);
  return promise;
}

function createHabit(habitInfo, token) {
  // Post(url, data, headers:'Authorization': token)
  const promise = axios.post(`${baseURL}/habits`, habitInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function getHabits(token) {
  const promise = axios.get(`${baseURL}/habits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function deleteHabit(token, id) {
  const promise = axios.delete(`${baseURL}/habits/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
}

function getTodayHabits(token) {
  const promise = axios.get(`${baseURL}/habits/today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return promise;
}

export { signIn, signUp, createHabit, getHabits, deleteHabit, getTodayHabits };

