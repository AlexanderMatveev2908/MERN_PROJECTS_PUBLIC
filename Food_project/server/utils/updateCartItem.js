const actionTypes = {
  ADD_OR_INC_QTY: "ADD_OR_INC_QTY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  DEC_QTY_OR_REMOVE: "DEC_QTY_OR_REMOVE",
};

const { ADD_OR_INC_QTY, DEC_QTY_OR_REMOVE, REMOVE_FROM_CART } = actionTypes;

export const updateCartItem = (itemId, action, userCart) => {
  switch (action) {
    case ADD_OR_INC_QTY: {
      if (userCart[itemId]) userCart[itemId]++;
      else userCart[itemId] = 1;

      break;
    }

    case DEC_QTY_OR_REMOVE: {
      if (userCart[itemId])
        if (userCart[itemId] > 1) userCart[itemId] -= 1;
        else delete userCart[itemId];

      break;
    }

    case REMOVE_FROM_CART: {
      if (userCart[itemId]) {
        delete userCart[itemId];
      }

      break;
    }

    default:
      return res.status(400).json({ message: "=> Invalid action " + action });
  }
};
