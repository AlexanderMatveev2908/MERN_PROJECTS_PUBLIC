import { SET_TOKEN, SET_VAL_LOGIN } from "../../actionTypes/userActionTypes";
import { setValHandler, setTokenHandler } from "./handlers/loginHandler";

export const userReducer = (userState, action) => {
  switch (action.type) {
    case SET_VAL_LOGIN:
      return setValHandler(userState, action);

    case SET_TOKEN:
      return setTokenHandler(userState, action);
    default:
      return userState;
  }
};
