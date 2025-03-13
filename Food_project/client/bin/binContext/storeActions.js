export const setFoodListAct = (foodList) => ({
  type: "SET_FOOD_LIST",
  payload: foodList,
});

export const setFoodLoadingAct = (status) => ({
  type: "SET_FOOD_LOADING",
  payload: status,
});

// --------------------------------------------

export const setCartAct = (cart) => ({
  type: "SET_CART",
  payload: cart,
});

export const setCartLoadingAct = (status) => ({
  type: "SET_CART_LOADING",
  payload: status,
});

export const addToCartAct = (itemId) => ({
  type: "ADD_TO_CART",
  payload: itemId,
});

export const decQtyAct = (itemId) => ({
  type: "DEC_QTY",
  payload: itemId,
});

export const removeFromCartAct = (itemId) => ({
  type: "REMOVE_FROM_CART",
  payload: itemId,
});

// ---------------------------------------------------

export const setOrdersAct = (orders) => ({
  type: "SET_ORDERS",
  payload: orders,
});

export const setOrdersLoadingAct = (status) => ({
  type: "SET_ORDERS_LOADING",
  payload: status,
});
