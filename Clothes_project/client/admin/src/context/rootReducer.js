import { ordersReducer } from "./reducers/orders/ordersReducer";
import { productsReducer } from "./reducers/products/productsReducer";
import { userReducer } from "./reducers/user/userReducer";

export const rootReducer = (state, action) => ({
  userState: userReducer(state.userState, action),
  productsState: productsReducer(state.productsState, action),
  ordersState: ordersReducer(state.ordersState, action),
});
