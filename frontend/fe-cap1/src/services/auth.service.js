import axios from "axios";

const API_URL = "http://localhost:3000";

const register = (username, email, password) => {
  return axios.post(API_URL + "/user", {
   
    email,
    password,
    
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
     
      email:username,
      password,
      
    })
    .then((response) => {
      if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
