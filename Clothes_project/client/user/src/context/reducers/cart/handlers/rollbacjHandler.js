export const handleRollback = (cartState, action) => {
  const { prevCart } = action.payload;

  return {
    ...cartState,
    cartItems: prevCart,
  };
};
