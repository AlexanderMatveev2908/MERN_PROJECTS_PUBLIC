export const updateCartItem = (itemId, action, userCart) => {
  switch (action) {
    case ADD_OR_INC_QTY: {
      const existingItemIndex = userCart.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) userCart[existingItemIndex].quantity += 1;
      else userCart.push({ itemId, quantity: 1 });

      break;
    }

    case DEC_QTY: {
      const existingItemIndex = userCart.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        if (userCart[existingItemIndex].quantity > 1)
          userCart[existingItemIndex].quantity -= 1;
      } else {
        userCart.splice(existingItemIndex, 1);
      }

      break;
    }

    case REMOVE_FROM_CART: {
      userCart = userCart.filter((item) => item.id !== itemId);

      break;
    }

    default:
      return res.status(400).json({ message: "=> Invalid action " + action });
  }
};

// const updateCart = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const { existingCart } = req.body;

//     let { cartData: userCart } = await UserModel.findById(userId);

//     // if (existingCart) userCart = { ...userCart, ...existingCart };

//     if (existingCart) {
//       for (let itemId in existingCart) {
//         if (userCart[itemId]) userCart[itemId] += existingCart[itemId];
//         else userCart[itemId] = existingCart[itemId];
//       }
//     }

//     await UserModel.findByIdAndUpdate(userId, { cartData: userCart });

//     return res.status(200).json({ ok: true, userCart });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
// router
//   .route("/")
//   .get(getUserCart)
//   .post(addToCart)
//   .patch(decQty)
//   .delete(removeFromCart);

const addToCart = async (req, res) => {
  const { userId } = req.user;
  const { itemId } = req.body;

  if (!itemId)
    return res.status(400).json({ message: "=> Item ID is required" });
  try {
    const { cartData: userCart } = await UserModel.findById(userId);

    if (!userCart[itemId]) userCart[itemId] = 1;
    else userCart[itemId]++;

    await UserModel.findByIdAndUpdate(userId, { cartData: userCart });

    return res
      .status(200)
      .json({ ok: true, userCart, message: "=> Item added to cart" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const decQty = async (req, res) => {
  const { userId } = req.user;
  const { itemId } = req.body;

  if (!itemId)
    return res.status(400).json({ message: "=> Item ID is required" });
  try {
    let { cartData: userCart } = await UserModel.findById(userId);

    if (!userCart[itemId])
      return res.status(400).json({ message: "=> Item not found in cart" });
    else if (userCart[itemId] === 1) {
      const { [itemId]: _, ...rest } = userCart;
      userCart = { ...rest };
    } else if (userCart[itemId] > 1) userCart[itemId]--;

    await UserModel.findOneAndUpdate({ _id: userId }, { cartData: userCart });

    return res
      .status(200)
      .json({ ok: true, userCart, message: "=> Item quantity decreased" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const { userId } = req.user;
  const { itemId } = req.body;

  if (!itemId)
    return res.status(400).json({ message: "=> Item ID is required" });

  try {
    let { cartData: userCart } = await UserModel.findById(userId);

    if (!userCart[itemId]) {
      return res.status(400).json({ message: "=> Item not found in cart" });
    } else {
      const { [itemId]: _, ...rest } = userCart;
      userCart = { ...rest };
    }

    await UserModel.findOneAndUpdate({ _id: userId }, { cartData: userCart });

    return res
      .status(200)
      .json({ ok: true, userCart, message: "=> Item removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
