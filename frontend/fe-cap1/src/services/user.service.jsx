import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/v1";

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
const CreatePost = async (data) => {
  // console.log("data", ...data);
  const res = await axios
    .post(API_URL + "/posts", { ...data }, { headers: authHeader() })
    .then((response) => {
      console.log("response", response);
      return response.data;
    })
    .then((response) => {
      return response.data;
    });

  return res;
};
const editProfile = async (
  id,
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
      API_URL + `/users/${id}`,

      {
        id,
        first_name,
        last_name,
        gender : genger,
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

  const res = await axios
    .delete(API_URL + `/posts/${id}`, { headers: authHeader() })
    .then((response) => {
      if (response) {
        return response.data.statusCode;
      }
    });
  return res;
};
const deleteAdminPost = async (id) => {
  console.log("id", id);
  const res = await axios
    .delete(API_URL + `/admin/posts/${id}`, { headers: authHeader() })
    .then((response) => {
      if (response) {
        return response.data.statusCode;
      }
    });
  return res;
};
const editComment = async (id) => {
  console.log("id", id);
  const res = await axios
    .delete(API_URL + `/Post/editComment/${id}`, { headers: authHeader() })
    .then((response) => {
      if (response) {
        return response.data.statusCode;
      }
    });
  return res;
};
const createComment = async (post_id, description) => {
  console.log("id",post_id)
  const res = await axios
    .post(
      API_URL + `/comments`,
      { post_id,description },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log("responre",response.data.data)
      return response.data.data;
    });
  return res;
};
const deleteComment = async (id) => {
  const res = await axios
    .delete(API_URL + `/comments/${id}`, { headers: authHeader() })
    .then((response) => {
      console.log("respo,", response.data.statusCode);
      return response.data.statusCode;
    });
  return res;
};
const getComments = async (id) => {
  const res = await axios
    .get(API_URL + `/posts/${id}`, { headers: authHeader() })
    .then((response) => {
      console.log("comment", response.data.comments);
      return response.data.comments;
    });
  return res;
};
const getAllUser = async () => {
  const res = await axios
    .get(API_URL + `/users`, { headers: authHeader() })
    .then((response) => {
      return response.data.data;
    })
    .then((response) => {
      return response;
    });
  return res;
};
const deleteUser = async (id) => {
  const res = await axios
    .delete(API_URL + `/admin/users/${id}`, { headers: authHeader() })
    .then((response) => {
      console.log("respo,", response.data.statusCode);
      return response.data.statusCode;
    });
  return res;
};
const createLike = async (count) => {
  const res = await axios
    .post(API_URL + `/Post/createLike`, { count }, { headers: authHeader() })
    .then((response) => {
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
  deleteComment,
  editComment,
  getAllUser,
  deleteUser,
  createLike,
  deleteAdminPost
};
