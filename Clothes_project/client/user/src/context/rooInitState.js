import { cartInitState } from "./initStates/cartInitState";
import { orderInitState } from "./initStates/ordersState";
import { placeOrderInitState } from "./initStates/placeOrder";
import { productsInitState } from "./initStates/productsInitState";
import { userInitState } from "./initStates/userInitState";

export const rooInitState = {
  productsState: productsInitState,
  cartState: cartInitState,
  placeOrderState: placeOrderInitState,
  ordersState: orderInitState,
  userState: userInitState,
};
