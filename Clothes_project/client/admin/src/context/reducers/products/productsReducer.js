import {
  CLEAN_ADD_FORM,
  PRODUCT_DELETED,
  SET_PRODUCTS,
  SET_PRODUCTS_ERROR,
  SET_PRODUCTS_LOADING,
  SET_VAL_ADD_FORM,
  TOGGLE_SIZE,
} from "../../actionTypes/productsActionTypes";
import {
  cleanAddFormHandler,
  setErrorHandler,
  setLoadingHandler,
} from "./handlers/productsLoading";
import {
  productsDeletedHandler,
  setProductsHandler,
} from "./handlers/setProductsHandler";
import {
  setValAddFormHandler,
  toggleSizeHandler,
} from "./handlers/setValAddFormHandler";

export const productsReducer = (productsState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return setProductsHandler(productsState, action);
    case PRODUCT_DELETED:
      return productsDeletedHandler(productsState, action);
    case SET_VAL_ADD_FORM:
      return setValAddFormHandler(productsState, action);
    case TOGGLE_SIZE:
      return toggleSizeHandler(productsState, action);
    case CLEAN_ADD_FORM:
      return cleanAddFormHandler(productsState);
    case SET_PRODUCTS_LOADING:
      return setLoadingHandler(productsState, action);
    case SET_PRODUCTS_ERROR:
      return setErrorHandler(productsState, action);
    default:
      return productsState;
  }
};
