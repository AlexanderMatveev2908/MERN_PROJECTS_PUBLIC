const updatedOrders = orders.map((order) =>
  order._id === orderId ? { ...order, status } : order
);

ordersDispatch(setOrdersAct(updatedOrders));
