import {
  CLEAN_VALS,
  LOGOUT,
  SET_CURR_FORM,
  SET_FORM_LOADING,
  SET_TOKEN,
  SET_VAL,
} from "../../actionTypes/userActionTypes";
import { setCurrStatFormHandler } from "./handlers/currStateForm";
import {
  cleanValsHandler,
  setFormLoadingHandler,
  setValHandler,
} from "./handlers/setVal";
import { setLogoutHandler, setTokenHandler } from "./handlers/token";

export const userReducer = (userState, action) => {
  switch (action.type) {
    case SET_CURR_FORM:
      return setCurrStatFormHandler(userState, action);
    case SET_VAL:
      return setValHandler(userState, action);
    case CLEAN_VALS:
      return cleanValsHandler(userState);
    case SET_TOKEN:
      return setTokenHandler(userState, action);
    case LOGOUT:
      return setLogoutHandler(userState);
    case SET_FORM_LOADING:
      return setFormLoadingHandler(userState, action);
    default:
      return userState;
  }
};
