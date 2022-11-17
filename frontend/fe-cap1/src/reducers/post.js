import { CREATEPOST, CREATEPOSTFAIL } from "../actions/types";
const initialState = {};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATEPOST: {
      // const newlist = [...state.list];
      // newlist.push(action.payload);
      return { ...payload };
    }
    default:
      return state;
  }
}
