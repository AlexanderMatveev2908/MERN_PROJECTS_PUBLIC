const actionTypes = {
  SET_ORDERS: "SET_ORDERS",
  SET_ORDERS_LOADING: "SET_ORDERS_LOADING",
};

export const ordersReducer = (ordersState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS_LOADING: {
      const status = action.payload;

      return {
        ...ordersState,
        ordersLoading: status,
      };
    }

    case actionTypes.SET_ORDERS: {
      const orders = action.payload;

      return {
        ...ordersState,
        orders,
      };
    }

    default:
      throw new Error("unknown action type " + action.type);
  }
};
