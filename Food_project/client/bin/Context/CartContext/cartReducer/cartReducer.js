const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  DEC_QTY: "DEC_QTY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  SET_CART: "SET_CART",
  SET_CART_LOADING: "SET_CART_LOADING",
};

export const cartReducer = (cartState, action) => {
  switch (action.type) {
    case actionTypes.SET_CART_LOADING: {
      const status = action.payload;
      return {
        ...cartState,
        cartLoading: status,
      };
    }

    case actionTypes.SET_CART: {
      const cart = action.payload;

      return {
        ...cartState,
        cartItems: cart,
      };
    }

    case actionTypes.ADD_TO_CART: {
      const itemId = action.payload;

      if (!itemId) throw new Error("missing itemId ADD_TO_CART");

      if (!cartState.cartItems[itemId])
        return {
          ...cartState,
          cartItems: {
            ...cartState.cartItems,
            [itemId]: 1,
          },
        };

      return {
        ...cartState,
        cartItems: {
          ...cartState.cartItems,
          [itemId]: cartState.cartItems[itemId] + 1,
        },
      };
    }
    case actionTypes.DEC_QTY: {
      const itemId = action.payload;

      if (!itemId) throw new Error("missing itemId DEC_QTY");

      if (cartState.cartItems[itemId] >= 1)
        return {
          ...cartState,
          cartItems: {
            ...cartState.cartItems,
            [itemId]: cartState.cartItems[itemId] - 1,
          },
        };
      // eslint-disable-next-line
      const { [itemId]: _, ...filteredCart } = cartState.cartItems;

      return {
        ...cartState,
        cartItems: filteredCart,
      };
    }

    case actionTypes.REMOVE_FROM_CART: {
      const itemId = action.payload;

      if (!itemId) throw new Error("missing itemId REMOVE_FROM_CART");

      // eslint-disable-next-line
      const { [itemId]: _, ...filteredCart } = cartState.cartItems;

      return {
        ...cartState,
        cartItems: filteredCart,
      };
    }

    default:
      throw new Error("unknown action type");
  }
};
