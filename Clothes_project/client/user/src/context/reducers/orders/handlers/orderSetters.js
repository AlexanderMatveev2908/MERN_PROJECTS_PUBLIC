export const ordersLoadingSetter = (ordersState, action) => {
  const { field, status } = action.payload;

  if (!field || typeof status !== "boolean")
    throw new Error("invalid field " + action.type);

  return {
    ...ordersState,
    [field]: status,
  };
};

export const ordersErrorSetter = (ordersState, action) => {
  const { status } = action.payload;

  if (typeof status !== "string" && status !== null)
    throw new Error("invalid status " + action.type);

  return {
    ...ordersState,
    ordersError: status,
  };
};

export const ordersSetter = (ordersState, action) => {
  const { orders } = action.payload;

  if (!Array.isArray(orders)) throw new Error("invalid orders " + action.type);

  return {
    ...ordersState,
    orders,
  };
};
