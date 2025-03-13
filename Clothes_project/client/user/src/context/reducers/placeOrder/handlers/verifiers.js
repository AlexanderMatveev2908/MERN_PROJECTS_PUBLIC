export const setVerifying = (placeOrderState, action) => {
  const { field, status } = action.payload;

  if (!field || typeof status !== "boolean")
    throw new Error("invalid field " + action.type);

  return {
    ...placeOrderState,
    [field]: status,
  };
};
