import { useMemo, useReducer } from "react";
import { userInstanceV0 } from "../../constants/urls";

import { handleChangeV0, handleSubmitV0 } from "../../lib/userLib";
import { formReducer } from "./formReducer/formReducer";
import { initState } from "./formReducer/formInitState";
import { handlePlaceOrderV0 } from "./../../lib/ordersLib";
import { useGlobal } from "../useGlobal";

export const useFormV2 = () => {
  const [formState, formDispatch] = useReducer(formReducer, initState);

  const { registerVals, loginVals, userLoading, orderVals, orderLoading } =
    formState;

  const {
    setToken,
    setShowLogin,
    food_list,
    cartItems,
    ordersInstance,
    reset,
    cartTotPrice,
  } = useGlobal();

  const userInstance = useMemo(() => userInstanceV0, []);

  const handleChange = (e, currState) =>
    handleChangeV0(e, currState, formDispatch);

  const handleSubmit = (e, currState) =>
    handleSubmitV0(
      e,
      currState,
      formState,
      formDispatch,
      userInstance,
      setToken,
      setShowLogin
    );

  const handlePlaceOrder = (e) =>
    handlePlaceOrderV0(
      e,
      formState,
      food_list,
      cartItems,
      formDispatch,
      ordersInstance,
      reset,
      cartTotPrice
    );

  return {
    handleChange,
    handleSubmit,

    handlePlaceOrder,

    registerVals,
    loginVals,
    userLoading,

    orderVals,
    orderLoading,
  };
};
