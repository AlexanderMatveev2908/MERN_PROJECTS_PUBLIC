// export const getTotCartPriceAct = (cartItems, foodList) => ({
//   type: "GET_TOTAL_CART_PRICE",
//   payload: { cartItems, foodList },
// });

// case actionTypes.GET_TOTAL_CART_PRICE: {
//   const { cartItems, foodList } = action.payload;

//   if (!cartItems || !foodList)
//     throw new Error("missing cartItems || foodList GET_TOTAL_CART_PRICE");

//   const tot = Object.entries(cartItems).reduce((acc, [key, val]) => {
//     const item = foodList.find((food) => food._id === key);
//     if (item) acc += (item.price * 100 * val) / 100;
//     return acc;
//   }, 0);

//   return {
//     ...cartState,
//     totPrice: tot,
//   };
// }
