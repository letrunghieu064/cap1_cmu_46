import { CREATEPOST, CREATEPOSTFAIL } from "./types";
import UserService from "../services/user.service";

export const CreatePost = (descripstion, address, img_url) => (dispatch) => {
  UserService.CreatePost(descripstion, address, img_url).then(
    async (response) => {
      await dispatch({
        type: CREATEPOST,
        payload: response.data.data,
      });
    }
  );
};
