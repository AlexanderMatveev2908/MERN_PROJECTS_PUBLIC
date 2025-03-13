import { ordersInitState } from "./initStates/ordersinitState";
import { productsInitState } from "./initStates/productsInitState";
import { userInitState } from "./initStates/userInitState";

export const rootInitState = {
  userState: userInitState,
  productsState: productsInitState,
  ordersState: ordersInitState,
};
