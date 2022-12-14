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
      return response;
    });

  return res;
};
const editProfile = async (
  id,
  data
) => {
  const res = await axios
    .put(
      API_URL + `/users/${id}`,  
      { 
        ...data
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
const editComment = async (id,description) => {
  console.log("id", id,description);
  const res = await axios
    .put(API_URL + `/comments/${id}`, {description},{ headers: authHeader() })
    .then((response) => {
      console.log("hi",response)
      if (response) {
        console.log("rescmoment",response.data.statusCode)
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
      return response.data;
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
const createLike = async (id,post_id) => {
  const res = await axios
    .post(API_URL + `/likes`, {id,post_id} ,{ headers: authHeader() })
    .then((response) => {
      return response.data;
    });
  return res;
};
const getUser = async (id)=>{
  const res = await axios
    .get(API_URL + `/users/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      return response;
    });
  return res;
}
const editPost = async (id,data)=>{
  const res = await axios 
  .put(API_URL + `/posts/${id}`, { ...data }, { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
return res;
}
const getLikes =async ()=>{
  const res = await axios 
  .get(API_URL + `/likes`,  { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
return res;
}



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
  deleteAdminPost,
  getUser,
  editPost,
  createLike,
  getLikes
};
