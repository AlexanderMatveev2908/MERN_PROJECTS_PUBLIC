import { useCallback, useMemo, useReducer, useState } from "react";
import { setCartAct } from "./cartReducer/cartActionCreators";
import {
  createCartInstance,
  createOrdersInstance,
  foodInstanceV0,
} from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFoodListV0 } from "./../../lib/foodLib";
import {
  addToCartV0,
  decQtyV0,
  loadCartV0,
  removeFromCartV0,
} from "../../lib/cartLib";
import { cartReducer } from "./cartReducer/cartReducer";
import { cartInitState } from "./cartReducer/cartInitState";
import { getOrdersV0, getOrderV0 } from "../../lib/ordersLib";

export const useCartContextVals = () => {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitState);
  const {
    food_list,
    foodLoading,
    cartItems,
    cartTotPrice,
    cartLoading,
    orders,
    ordersLoading,
  } = cartState;

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showLogin, setShowLogin] = useState(false);

  const ordersInstance = useMemo(() => createOrdersInstance(token), [token]);
  const foodInstance = useMemo(() => foodInstanceV0, []);
  const cartInstance = useMemo(() => createCartInstance(token), [token]);

  const getFoodList = useCallback(
    () => getFoodListV0(cartDispatch, foodInstance),
    [foodInstance]
  );

  const navigate = useNavigate();

  const reset = useCallback(
    (err) => {
      setToken(null);
      localStorage.removeItem("token");
      cartDispatch(setCartAct({}));
      navigate("/");

      if (err) toast("session expired");
    },
    [navigate]
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
    () => getOrdersV0(cartDispatch, ordersInstance, reset),
    [ordersInstance, reset]
  );

  const getOrder = (itemId) =>
    getOrderV0(itemId, ordersInstance, cartDispatch, orders);

  return {
    getFoodList,
    food_list,
    foodLoading,

    cartItems,
    cartLoading,
    cartTotPrice,

    showLogin,
    setShowLogin,
    token,
    setToken,

    reset,

    loadCart,
    addToCart,
    decQty,
    removeFromCart,

    getOrders,
    getOrder,
    orders,
    ordersLoading,
    ordersInstance,
  };
};
