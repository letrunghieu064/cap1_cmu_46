import { CREATEPOST, CREATEPOSTFAIL } from "../actions/types";
const initialState = {
  list: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATEPOST: {
      const newlist = [...state.list];
      newlist.push(action.payload);
      return { ...state, list: newlist };
    }
    default:
      return state;
  }
}
