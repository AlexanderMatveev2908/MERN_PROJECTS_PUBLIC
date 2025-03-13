import { SET_VAL } from "../../actionTypes/userActionTypes";

export const handleChangeForm = (dispatch, currForm, e) => {
  const { name, value } = e.target;

  const formToUpdate = currForm === "Sign Up" ? "registerVals" : "loginVals";

  dispatch({ type: SET_VAL, payload: { name, value, formToUpdate } });
};
