export const addToCartV0 = async (
  itemId,
  token,
  cartDispatch,
  addToCartAct,
  cartInstance,
  setCartAct,
  reset
) => {
  if (!token) {
    cartDispatch(addToCartAct(itemId));
  } else {
    try {
      const res = await cartInstance.post("/", { itemId });

      if (res.data?.ok) cartDispatch(setCartAct(res.data.userCart));
    } catch (err) {
      if (err.response.status === 401) reset(err);
      console.log(err);
    }
  }
};

export const createAddToCart = (
  token,
  cartDispatch,
  addToCartAct,
  cartInstance,
  setCartAct,
  reset
) => {
  return async (itemId) =>
    addToCartV0(
      itemId,
      token,
      cartDispatch,
      addToCartAct,
      cartInstance,
      setCartAct,
      reset
    );
};

export const decQtyV0 = async (
  itemId,
  token,
  cartDispatch,
  decQtyAct,
  cartInstance,
  setCartAct,
  reset
) => {
  if (!token) {
    cartDispatch(decQtyAct(itemId));
  } else {
    try {
      const res = await cartInstance.patch("/", { itemId });

      if (res.data?.ok) cartDispatch(setCartAct(res.data.userCart));
    } catch (err) {
      if (err.response.status === 401) reset(err);
      console.log(err);
    }
  }
};

export const createDecQty = (
  token,
  cartDispatch,
  decQtyAct,
  cartInstance,
  setCartAct,
  reset
) => {
  return async (itemId) =>
    await decQtyV0(
      itemId,
      token,
      cartDispatch,
      decQtyAct,
      cartInstance,
      setCartAct,
      reset
    );
};
export const removeFromCartV0 = async (
  itemId,
  token,
  cartDispatch,
  removeFromCartAct,
  cartInstance,
  setCartAct,
  reset
) => {
  if (!token) {
    cartDispatch(removeFromCartAct(itemId));
  } else {
    try {
      const res = await cartInstance.delete("/", {
        data: { itemId },
      });

      if (res.data?.ok) cartDispatch(setCartAct(res.data.userCart));
    } catch (err) {
      if (err.response.status === 401) reset(err);

      console.log(err);
    }
  }
};

export const createRemoveFromCart = (
  token,
  cartDispatch,
  removeFromCartAct,
  cartInstance,
  setCartAct,
  reset
) => {
  return async (itemId) =>
    await removeFromCartV0(
      itemId,
      token,
      cartDispatch,
      removeFromCartAct,
      cartInstance,
      setCartAct,
      reset
    );
};
