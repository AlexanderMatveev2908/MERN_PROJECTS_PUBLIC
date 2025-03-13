import { CHANGE_FILTERS } from "../../actionTypes/productsActTypes";

export const handleChangeFilter = (dispatch, e) => {
  const { value: val, name: field } = e.target;
  dispatch({ type: CHANGE_FILTERS, payload: { field, val } });
};
