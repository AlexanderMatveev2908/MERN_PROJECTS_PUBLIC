const actionTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  UPDATE_QTY: "UPDATE_QTY",
};
const { ADD, REMOVE, UPDATE_QTY } = actionTypes;

export const makeUpdateLogic = (cartData, itemId, itemSize, action, qty) => {
  switch (action) {
    case ADD:
      return handleAdd(cartData, itemId, itemSize);
    case UPDATE_QTY:
      return handleUpdateQty(cartData, itemId, itemSize, qty);
    case REMOVE:
      return handleRemove(cartData, itemId, itemSize);
  }
};

const handleAdd = (cartData, itemId, itemSize) => {
  if (cartData[itemId]) {
    if (cartData[itemId][itemSize]) {
      cartData[itemId] = {
        ...cartData[itemId],
        [itemSize]: cartData[itemId][itemSize] + 1,
      };
    } else {
      cartData[itemId] = {
        ...cartData[itemId],
        [itemSize]: 1,
      };
    }
  } else {
    cartData[itemId] = {
      [itemSize]: 1,
    };
  }

  return cartData;
};

const handleUpdateQty = (cartData, itemId, itemSize, qty) => ({
  ...cartData,
  [itemId]: {
    ...cartData[itemId],
    [itemSize]: qty,
  },
});

const handleRemove = (cartData, itemId, itemSize) => {
  const { [itemSize]: _, ...filtered } = cartData[itemId];
  cartData[itemId] = filtered;

  if (!Object.keys(cartData[itemId])?.length) {
    const { [itemId]: _, ...totalFiltered } = cartData;
    cartData = totalFiltered;
  }

  return cartData;
};
