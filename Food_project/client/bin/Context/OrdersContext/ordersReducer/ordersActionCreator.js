export const setOrdersAct = (orders) => ({
  type: "SET_ORDERS",
  payload: orders,
});

export const setOrdersLoadingAct = (status) => ({
  type: "SET_ORDERS_LOADING",
  payload: status,
});
