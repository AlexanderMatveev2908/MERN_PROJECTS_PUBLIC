const actionTypes = {
  SET_ORDERS: "SET_ORDERS",
  SET_ORDERS_LOADING: "SET_ORDERS_LOADING",
  SET_UPDATING_LOADING: "SET_UPDATING_LOADING",
};

export const ordersReducer = (ordersState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS: {
      const orders = action.payload;

      return {
        ...ordersState,
        orders,
      };
    }

    case actionTypes.SET_ORDERS_LOADING: {
      const status = action.payload;

      return {
        ...ordersState,
        isOrdersLoading: status,
      };
    }

    case actionTypes.SET_UPDATING_LOADING: {
      const statusOrOrderId = action.payload;

      return {
        ...ordersState,
        isUpdatingLoading: statusOrOrderId,
      };
    }

    default: {
      throw new Error("unknown action " + action.type);
    }
  }
};

export const setOrdersLoadingAct = (status) => ({
  type: actionTypes.SET_ORDERS_LOADING,
  payload: status,
});

export const setOrdersAct = (orders) => ({
  type: actionTypes.SET_ORDERS,
  payload: orders,
});

export const setUpdatingLoadingAct = (statusOrOrderId) => ({
  type: actionTypes.SET_UPDATING_LOADING,
  payload: statusOrOrderId,
});
