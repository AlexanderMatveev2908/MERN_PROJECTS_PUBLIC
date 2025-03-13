export const paymentHandler = (placeOrderState, action) => {
  const payment = action.payload;

  if (!payment) throw new Error("Payment is required " + action.type);

  if (payment === placeOrderState.placeOrderForm.paymentMethod)
    return {
      ...placeOrderState,
      placeOrderForm: {
        ...placeOrderState.placeOrderForm,
        paymentMethod: "",
      },
    };
  else {
    return {
      ...placeOrderState,
      placeOrderForm: {
        ...placeOrderState.placeOrderForm,
        paymentMethod: payment,
      },
    };
  }
};

export const setOrderPlacedHandler = (placeOrderState, action) => {
  const { status } = action.payload;

  if (typeof status !== "boolean")
    throw new Error("Status is required " + action.type);

  return {
    ...placeOrderState,
    orderPlaced: status,
  };
};
