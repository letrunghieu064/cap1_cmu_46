import { CREATEPOST, CREATEPOSTFAIL } from "./types";
import UserService from "../services/user.service";

export const CreatePost =
  (descripstion, address, img_url) => async (dispatch) => {
    const res = await UserService.CreatePost(descripstion, address, img_url)
      .then((data) => {
        console.log(data);
        if (data) {
          dispatch({
            type: CREATEPOST,
            payload: data.data,
          });
        }
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
    return res;
  };
