import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ROLLBACK,
  SET_CART_ARR,
  SET_CART_ITEMS,
  SET_CART_LOADING,
  UPDATE_QTY,
} from "../../actionTypes/cartActionTypes";
import { addToCartHandler } from "./handlers/addToCart";
import { cartLoadingHandler } from "./handlers/cartLoading";
import { removeFromCartHandler } from "./handlers/removeFromCart";
import { handleRollback } from "./handlers/rollbacjHandler";
import { setCartArrHandler, setCartItemsHandler } from "./handlers/setCart";
import { updateQtyHandler } from "./handlers/updateQty";

export const cartReducer = (
  { cartState, productsState: { products } },
  action
) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return setCartItemsHandler(cartState, action);
    case SET_CART_ARR:
      return setCartArrHandler(cartState, action);

    case ADD_TO_CART:
      return addToCartHandler(cartState, products, action);

    case UPDATE_QTY:
      return updateQtyHandler(cartState, products, action);

    case ROLLBACK:
      return handleRollback(cartState, action);

    case REMOVE_FROM_CART:
      return removeFromCartHandler(cartState, products, action);

    case SET_CART_LOADING:
      return cartLoadingHandler(cartState, action);

    default:
      return cartState;
  }
};
