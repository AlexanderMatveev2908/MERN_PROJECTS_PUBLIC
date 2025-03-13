import { SET_CURR_FORM } from "../../actionTypes/userActionTypes";

export const setCurrStateForm = (dispatch, updatedState) => {
  dispatch({
    type: SET_CURR_FORM,
    payload: updatedState,
  });
};
