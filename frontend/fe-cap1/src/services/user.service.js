import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "getuser", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const CreatePost = async (descripstion, address, img_url) => {
  await axios
    .post(API_URL + "/Project/createpost", {
      descripstion,
      address,
      img_url,
      headers: authHeader(),
    })
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  CreatePost,
};
