import { CREATEPOST, CREATEPOSTFAIL } from "./types";
import UserService from "../services/user.service";

export const CreatePost = (data) => async (dispatch) => {
  const res = await UserService.CreatePost(data)
    .then((response) => {
      console.log("response", response);
      if (response) {
        dispatch({
          type: CREATEPOST,
          payload: response.data,
        });
      }
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
  return res;
};
