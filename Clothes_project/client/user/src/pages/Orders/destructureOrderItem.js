export const destructureOrderItem = (orderItem) => {
  const {
    _id = "",
    name = "",
    size = "",
    qty = 0,
    status = "",
    date = "",
    paymentMethod = "",
  } = orderItem ?? {};

  const { price = 0 } = orderItem ?? {};
  const { image = [] } = orderItem ?? {};

  return {
    _id,
    name,
    price,
    image,
    size,
    qty,
    status,
    date,
    paymentMethod,
  };
};
