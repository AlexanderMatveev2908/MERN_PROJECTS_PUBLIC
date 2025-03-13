export const getTotalPrice = (food_list, deliveryFee, cartItems) => {
  let totPrice = 0;
  if (!Object.keys(cartItems)?.length) return 0;

  for (let item in cartItems) {
    const price = food_list?.find((food) => food._id === item)?.price;
    if (!price) continue;
    totPrice += (price * 100 * cartItems[item]) / 100;
  }

  // const res =
  //   totPrice && deliveryFee
  //     ? Number((totPrice + deliveryFee).toFixed(2))
  //     : Number(totPrice.toFixed(2));

  return totPrice && deliveryFee
    ? Number((totPrice + deliveryFee).toFixed(2))
    : Number(totPrice.toFixed(2));
};
