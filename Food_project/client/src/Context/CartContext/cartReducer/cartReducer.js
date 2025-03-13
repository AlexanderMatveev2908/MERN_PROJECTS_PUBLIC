const actionTypes = {
  SET_FOOD_LIST: "SET_FOOD_LIST",
  SET_FOOD_LOADING: "SET_FOOD_LOADING",
  ADD_TO_CART: "ADD_TO_CART",
  DEC_QTY: "DEC_QTY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  SET_CART: "SET_CART",
  SET_CART_LOADING: "SET_CART_LOADING",
  SET_ORDERS: "SET_ORDERS",
  SET_ORDERS_LOADING: "SET_ORDERS_LOADING",
};

export const cartReducer = (cartState, action) => {
  switch (action.type) {
    case actionTypes.SET_FOOD_LOADING: {
      const status = action.payload;

      return {
        ...cartState,
        foodLoading: status,
      };
    }

    case actionTypes.SET_FOOD_LIST: {
      const foodList = action.payload;

      return {
        ...cartState,
        food_list: foodList,
      };
    }

    case actionTypes.SET_CART_LOADING: {
      const status = action.payload;

      return {
        ...cartState,
        cartLoading: status,
      };
    }

    case actionTypes.SET_CART: {
      const cart = action.payload;

      let totPrice = 0;

      for (let itemId in cartState.cartItems) {
        const price = cartState.food_list.find(
          (food) => food._id === itemId
        )?.price;
        if (!price) continue;
        totPrice += (price * 100 * cart[itemId]) / 100;
      }

      return {
        ...cartState,
        cartItems: cart,
        cartTotPrice: Object.keys(cart).length ? +totPrice.toFixed(2) : 0,
      };
    }

    case actionTypes.ADD_TO_CART: {
      const itemId = action.payload;

      if (!itemId) throw new Error("missing itemId ADD_TO_CART");

      const price = cartState.food_list.find(
        (food) => food._id === itemId
      )?.price;
      const updatedCartPrice =
        (cartState.cartTotPrice * 100 + price * 100) / 100;

      return {
        ...cartState,
        cartItems: {
          ...cartState.cartItems,
          [itemId]: (cartState.cartItems[itemId] || 0) + 1,
        },
        cartTotPrice: cartState.cartTotPrice ? +updatedCartPrice.toFixed(2) : 0,
      };
    }

    case actionTypes.DEC_QTY: {
      const itemId = action.payload;

      if (!itemId) throw new Error("missing itemId DEC_QTY");

      const price = cartState.food_list.find(
        (food) => food._id === itemId
      )?.price;
      const updatedCartPrice =
        (cartState.cartTotPrice * 100 - price * 100) / 100;

      if (cartState.cartItems[itemId] >= 1)
        return {
          ...cartState,
          cartItems: {
            ...cartState.cartItems,
            [itemId]: cartState.cartItems[itemId] - 1,
          },
          cartTotPrice: cartState.cartTotPrice
            ? +updatedCartPrice.toFixed(2)
            : 0,
        };

      // eslint-disable-next-line
      const { [itemId]: _, ...filteredCart } = cartState.cartItems;

      return {
        ...cartState,
        cartItems: filteredCart,
        cartTotPrice: cartState.cartTotPrice ? +updatedCartPrice.toFixed(2) : 0,
      };
    }

    case actionTypes.REMOVE_FROM_CART: {
      const itemId = action.payload;

      if (!itemId) throw new Error("missing itemId REMOVE_FROM_CART");

      const price = cartState.food_list.find(
        (food) => food._id === itemId
      )?.price;
      const updatedCartPrice =
        (cartState.cartTotPrice * 100 -
          price * 100 * cartState.cartItems[itemId]) /
        100;

      // eslint-disable-next-line
      const { [itemId]: _, ...filteredCart } = cartState.cartItems;

      return {
        ...cartState,
        cartItems: filteredCart,
        cartTotPrice: cartState.cartTotPrice ? +updatedCartPrice.toFixed(2) : 0,
      };
    }

    case actionTypes.SET_ORDERS_LOADING: {
      const status = action.payload;

      return {
        ...cartState,
        ordersLoading: status,
      };
    }

    case actionTypes.SET_ORDERS: {
      const orders = action.payload;

      return {
        ...cartState,
        orders,
      };
    }

    default: {
      throw new Error("unknown action type" + action.type);
    }
  }
};
