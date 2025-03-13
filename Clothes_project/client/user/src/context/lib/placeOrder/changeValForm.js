import { SET_PLACE_VAL } from "../../actionTypes/placeOrderActionTypes";

export const handleChangePlaceForm = (dispatch, e) => {
  const { name: field, value: val } = e.target;

  dispatch({ type: SET_PLACE_VAL, payload: { field, val } });
};
