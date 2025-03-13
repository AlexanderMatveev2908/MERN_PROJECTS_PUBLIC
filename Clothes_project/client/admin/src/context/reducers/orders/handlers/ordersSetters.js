export const ordersSetter = (ordersState, action) => {
  const { orders } = action.payload;

  if (!Array.isArray(orders)) throw new Error("invalid orders " + action.type);

  return {
    ...ordersState,
    orders,
  };
};

export const orderUpdateSetter = (ordersState, action) => {
  const { orderId, status } = action.payload;

  if (![orderId, status].every((el) => !!el))
    throw new Error("missing fields " + action.type);

  const updatedOrders = ordersState.orders.map((order) =>
    order._id === orderId ? { ...order, status } : order
  );

  return {
    ...ordersState,
    orders: updatedOrders,
  };
};
