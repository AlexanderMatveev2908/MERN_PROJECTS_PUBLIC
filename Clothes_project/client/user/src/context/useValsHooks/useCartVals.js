import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  // addToCart,
  // removeFromCart,
  getCartHandler,
  // updateQty,
  addToCartSync,
  addToCartAsync,
  libCartWrapper,
  updateQtySync,
  updateAsync,
  removeAsync,
  removeSync,
} from "../lib/cart/cart";
import { findInfoCartArr, setCartArr } from "../lib/cart/cartArr";
import { getDeliveryFee, getQty, getTotAmount } from "../lib/cart/getTots";
import { handleError } from "../api/cart/cartOperations";
import { useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "./../lib/user/formPost";

export const useCartVals = ({ state, dispatch }) => {
  const {
    productsState: { products },
    userState: { token },
    cartState: {
      cartItems,
      cartLoading,
      cartArr,
      addLoading,
      updateLoading,
      removeLoading,
    },
  } = state;

  const navigateCart = useNavigate();
  const locationCart = useLocation();

  const cpyCartRef = useRef(cartItems);

  useEffect(() => {
    cpyCartRef.current = { ...cartItems };
  }, [cartItems]);

  const { deliveryFee, totAmount, totQty } = useMemo(() => {
    const amount = getTotAmount(cartItems, products);
    return {
      deliveryFee: getDeliveryFee(amount),
      totAmount: amount,
      totQty: getQty(cartItems),
    };
  }, [cartItems, products]);

  const higherErrorHandler = useCallback(
    (err) => {
      handleError(
        dispatch,
        navigateCart,
        locationCart.pathname,
        cpyCartRef,
        handleLogout,
        err
      );
    },
    [dispatch, navigateCart, locationCart.pathname, cpyCartRef]
  );

  const memoizedGetCart = useCallback(
    () => getCartHandler(higherErrorHandler, token, dispatch),
    [higherErrorHandler, token, dispatch]
  );

  const setCartArrH = useCallback(
    () => setCartArr(dispatch, cartItems),
    [cartItems, dispatch]
  );

  const findInfoCartArrH = useCallback(
    () => findInfoCartArr(cartArr, products),
    [cartArr, products]
  );

  const makeFuncFromWrapper = (
    asyncCb,
    syncCb,
    loadingField,
    statusIsLoading
  ) =>
    libCartWrapper(
      asyncCb,
      syncCb,
      token,
      dispatch,
      higherErrorHandler,
      loadingField,
      statusIsLoading
    );

  const addToCart = makeFuncFromWrapper(
    addToCartAsync,
    addToCartSync,
    "addLoading"
  );

  const updateQty = makeFuncFromWrapper(
    updateAsync,
    updateQtySync,
    "updateLoading"
  );

  const removeFromCart = (itemId, itemSize) =>
    makeFuncFromWrapper(
      removeAsync,
      removeSync,
      "removeLoading",
      itemId + itemSize
    )(itemId, itemSize);

  return {
    memoizedGetCart,

    cartItems,
    cartArr,

    cartLoading,
    addLoading,
    updateLoading,
    removeLoading,

    setCartArrH,
    findInfoCartArrH,

    addToCart,
    updateQty,
    removeFromCart,

    totAmount,
    deliveryFee,
    totQty,

    navigateCart,
  };
};

/*
when defined a wrapper ,in first cb params are static and in 2 cb are dynamic, instead when calling wrapper they are reverse, first cb is dynamic second static
*/
