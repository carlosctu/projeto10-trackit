import axios from "axios";

const baseURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };
  return config;
}

function signUp(body) {
  const promise = axios.post(`${baseURL}/auth/sign-up`, body);
  return promise;
}

function signIn(body) {
  const promise = axios.post(`${baseURL}/auth/login`, body);
  return promise;
}

function createHabit(body) {
  const config = createHeaders();
  // Post(url, data, headers:'Authorization': token)
  const promise = axios.post(`${baseURL}/habits`, body, config);
  return promise;
}

function getHabits() {
  const config = createHeaders();
  const promise = axios.get(`${baseURL}/habits`, config);
  return promise;
}

function deleteHabit(id) {
  const config = createHeaders();
  console.log(id);
  const promise = axios.delete(`${baseURL}/habits/${id}`, config);
  return promise;
}

function getTodayHabits() {
  const config = createHeaders();
  const promise = axios.get(`${baseURL}/habits/today`, config);

  return promise;
}

function checkHabit(id) {
  const config = createHeaders();
  console.log(config);
  const promise = axios.post(`${baseURL}/habits/${id}/check`, "", config);
  return promise;
}
function uncheckHabit(id) {
  const config = createHeaders();
  
  console.log(config);
  const promise = axios.post(`${baseURL}/habits/${id}/uncheck`, "", config);
  return promise;
}

export {
  signIn,
  signUp,
  createHabit,
  getHabits,
  deleteHabit,
  getTodayHabits,
  checkHabit,
  uncheckHabit
};
