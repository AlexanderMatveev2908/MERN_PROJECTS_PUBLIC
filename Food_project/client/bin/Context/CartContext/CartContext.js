import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../../../bin/binContext/cartReducer";
import { cartInitState } from "./cartReducer/cartInitState";
import { setCartAct } from "./cartReducer/cartActionCreators";
import { createCartInstance } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCartV0,
  decQtyV0,
  loadCartV0,
  removeFromCartV0,
} from "../../lib/cartLib";

export const CartContext = createContext();

export const useCartContextVals = () => {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitState);
  const { cartItems, cartLoading } = cartState;

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const cartInstance = useMemo(() => createCartInstance(token), [token]);

  const navigate = useNavigate();

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

  return {
    cartItems,
    cartLoading,

    token,
    setToken,
    reset,

    loadCart,
    addToCart,
    decQty,
    removeFromCart,
  };
};
