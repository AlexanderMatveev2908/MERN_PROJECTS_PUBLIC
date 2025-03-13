import { placeOrderInitState } from "../../../initStates/placeOrder";

export const setPlaceValHandler = (placeOrderState, action) => {
  const { field, val } = action.payload;

  if (!field || typeof val !== "string")
    throw new Error("Invalid field or value " + action.type);

  return {
    ...placeOrderState,
    placeOrderForm: {
      ...placeOrderState.placeOrderForm,
      [field]: val,
    },
  };
};

export const cleanPlaceHandler = (placeOrderState) => {
  return {
    ...placeOrderState,
    placeOrderForm: placeOrderInitState.placeOrderForm,
  };
};

export const setPlaceFormLoading = (placeOrderState, action) => {
  const { field, status } = action.payload;

  if (!field || typeof status !== "boolean")
    throw new Error("Invalid status " + action.type);

  return {
    ...placeOrderState,
    [field]: status,
  };
};
