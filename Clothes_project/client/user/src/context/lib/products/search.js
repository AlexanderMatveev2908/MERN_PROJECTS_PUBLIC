import {
  CLEAN_SEARCH,
  SET_VISIBLE_SEARCH,
} from "../../actionTypes/productsActTypes";

export const setVisibleSearch = (dispatch, status) => {
  dispatch({ type: SET_VISIBLE_SEARCH, payload: status });
};

export const cleanSearch = (dispatch) => {
  dispatch({ type: CLEAN_SEARCH });
};
