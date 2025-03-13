import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "./binContext/cartReducer";
import { setCartAct } from "./binContext/storeActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { foodReducer } from "./binContext/foodReducer";
import { ordersReducer } from "./binContext/ordersReducer";
import {
  createCartInstance,
  createOrdersInstance,
  foodInstanceV0,
  userInstanceV0,
} from "../constants/urls";

import {
  initCartState,
  initFoodState,
  initOrdersState,
} from "./binContext/initStates";
import { getTotalPrice } from "../lib/getTotalPrice";
import {
  addToCartV0,
  decQtyV0,
  loadCartV0,
  removeFromCartV0,
} from "../lib/cartLib";
import { getFoodListV0 } from "../lib/foodLib";
import { getOrdersV0, getOrderV0 } from "../lib/ordersLib";

export const StoreContext = createContext(null);

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) throw new Error("useStore must be used within a StoreProvider");

  return { ...context };
};

export const useStoreContext = () => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initCartState);
  const { cartItems, cartLoading } = cartState;

  const [foodState, foodDispatch] = useReducer(foodReducer, initFoodState);
  const { food_list, foodLoading } = foodState;

  const [ordersState, ordersDispatch] = useReducer(
    ordersReducer,
    initOrdersState
  );
  const { orders, ordersLoading } = ordersState;

  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  const userInstance = useMemo(() => userInstanceV0, []);
  const foodInstance = useMemo(() => foodInstanceV0, []);
  const cartInstance = useMemo(() => createCartInstance(token), [token]);
  const ordersInstance = useMemo(() => createOrdersInstance(token), [token]);

  const reset = useCallback(
    (err) => {
      localStorage.removeItem("token");
      setToken(null);
      cartDispatch(setCartAct({}));
      navigate("/");

      if (err) toast("session expired");
    },
    [navigate]
  );

  const getFoodList = useCallback(
    () => getFoodListV0(foodDispatch, foodInstance),
    [foodInstance]
  );

  const loadCart = useCallback(
    () => loadCartV0(cartDispatch, cartInstance, reset),
    [reset, cartInstance]
  );

  const addToCart = (itemId) =>
    addToCartV0(itemId, token, cartDispatch, cartInstance, reset);

  const decQty = (itemId) =>
    decQtyV0(itemId, token, cartDispatch, cartInstance, reset);

  const removeFromCart = (itemId) =>
    removeFromCartV0(
      itemId,
      token,
      cartDispatch,
      cartInstance,
      reset,
      cartItems
    );

  const getOrders = useCallback(
    () => getOrdersV0(ordersDispatch, ordersInstance, reset),
    [ordersInstance, reset]
  );

  const getOrder = (itemId) =>
    getOrderV0(itemId, ordersInstance, ordersDispatch, orders);

  const getTotPrice = useCallback(
    (deliveryFee) => getTotalPrice(deliveryFee, cartItems, food_list),
    [cartItems, food_list]
  );

  return {
    getFoodList,
    food_list,
    foodLoading,

    cartItems,
    cartLoading,

    loadCart,
    addToCart,
    decQty,
    removeFromCart,
    getTotPrice,

    getOrders,
    getOrder,
    orders,
    ordersLoading,
    ordersInstance,

    token,
    setToken,

    showLogin,
    setShowLogin,

    reset,

    userInstance,
    foodInstance,
    cartInstance,

    cartDispatch,
  };
};
