export const setErrorSetter = (ordersState, action) => {
  const { field, status } = action.payload;

  if (!field || (typeof status !== "string" && status !== null))
    throw new Error("invalid field " + action.type);

  return {
    ...ordersState,
    [field]: status,
  };
};

export const ordersLoadingSetter = (ordersState, action) => {
  const { field, status } = action.payload;

  if (!field || typeof status !== "boolean")
    throw new Error("invalid field " + action.type);

  return {
    ...ordersState,
    [field]: status,
  };
};
