import axios from "axios";

const API_URL = "http://localhost:3000";

const register = (username, email, password) => {
  return axios.post(API_URL + "/api/v1/register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/api/v1/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("api/v1/logout");
};

export default {
  register,
  login,
  logout,
};
