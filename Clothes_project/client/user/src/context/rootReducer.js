import { cartReducer } from "./reducers/cart/cartReducer";
import { ordersReducer } from "./reducers/orders/ordersReducer";
import { placeOrderReducer } from "./reducers/placeOrder/placeOrderReducer";
import { productsReducer } from "./reducers/products/productsReducer";
import { userReducer } from "./reducers/userReducer/userReducer";

export const rootReducer = (state, action) => ({
  productsState: productsReducer(state.productsState, action),
  cartState: cartReducer(
    { cartState: state.cartState, productsState: state.productsState },
    action
  ),
  placeOrderState: placeOrderReducer(state.placeOrderState, action),
  ordersState: ordersReducer(state.ordersState, action),
  userState: userReducer(state.userState, action),
});
