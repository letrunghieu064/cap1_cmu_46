import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

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
  console.log("address", address);
  const add = await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address} Đà Nẵng 550000, Việt Nam.json?access_token=pk.eyJ1IjoiaGlldXRydW5nbGUiLCJhIjoiY2w5dDdtMmpzMDV5dzN1bGcyZXJ3ZHduaSJ9.DRb427bvxQf-pgmEU8AlAw`
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
    
  const res = await axios
    .post(
      console.log("token",authHeader()),
      API_URL + "/posts",
      {
      
        name:"bao",
        descripstion,
        address,
        img_url,
        // longitude: add.data.features[0].center[0],
        // latitude: add.data.features[0].center[1],
      },
      { headers: authHeader() },
      
    )
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      return response.data;
    });

  return res;
};
const editProfile = async (
  first_name,
  last_name,
  genger,
  email,
  birthday,
  card_id,
  phonenumber,
  address,
  imgurl
) => {
  const res = await axios
    .put(
      API_URL + "/Profile/editProfile",

      {
        first_name,
        last_name,
        genger,
        email,
        birthday,
        card_id,
        phonenumber,
        address,
        img_url: imgurl,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      return response.data;
    });
  return res;
};
const deletePost = async (id) => {
  console.log("id", id);
  await axios
    .delete(
      API_URL + `/Post/deletePost`,
      { id },

      { headers: authHeader() }
    )
    .then((response) => {
      if (response) {
        return response.data.statusCode;
      }
    });
};
const createComment = async (id, descripstion) => {
  const res = await axios
    .post(
      API_URL + `/Post/createComment`,
      { id, descripstion },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data.data;
    });
  return res;
};
const getComments = async (id) => {
  const res = await axios
    .get(API_URL + `/Post/getComments`, { id }, { headers: authHeader() })
    .then((response) => {
      console.log("comment", response.data.data);
      return response.data.data;
    });
  return res;
};
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  CreatePost,
  editProfile,
  createComment,
  getComments,
  deletePost,
};
