import {
  // setBestsellerHandler,
  // setLatestHandler,
  setProductsErrorHandler,
  setProductsHandler,
  setProductsLoadingHandler,
} from "./handlers/setProducts";
import { setProductItemHandler } from "./handlers/setItem";

import {
  SET_PRODUCTS,
  SET_PRODUCTS_LOADING,
  SET_PRODUCT_ITEM,
  // SET_LATEST_PRODUCTS,
  // SET_BESTSELLER_PRODUCTS,
  SET_FILTERED_PRODUCTS,
  CLEAN_SEARCH,
  SET_VISIBLE_SEARCH,
  SET_PRODUCTS_ERROR,
  CHANGE_FILTERS,
} from "../../actionTypes/productsActTypes";
import { setFilteredProductsHandler } from "./handlers/filters";
import { changeFilters } from "./handlers/categories";
import { cleanSearchHandler, setVisibleSearchHandler } from "./handlers/search";

export const productsReducer = (productsState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return setProductsHandler(productsState, action);

    case SET_PRODUCTS_LOADING:
      return setProductsLoadingHandler(productsState, action);

    case SET_PRODUCTS_ERROR:
      return setProductsErrorHandler(productsState, action);

    case SET_PRODUCT_ITEM:
      return setProductItemHandler(productsState, action);

    case SET_FILTERED_PRODUCTS:
      return setFilteredProductsHandler(productsState, action);

    case CHANGE_FILTERS:
      return changeFilters(productsState, action);

    case CLEAN_SEARCH:
      return cleanSearchHandler(productsState);

    case SET_VISIBLE_SEARCH:
      return setVisibleSearchHandler(productsState, action);

    default:
      return productsState;
  }
};
