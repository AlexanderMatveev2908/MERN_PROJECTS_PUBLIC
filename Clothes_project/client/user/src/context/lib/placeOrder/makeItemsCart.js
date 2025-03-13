export const makeCartArrFromCartItems = (cartItemsObj, products) => {
  const cartArrForOrder = [];

  for (const item in cartItemsObj) {
    for (const size in cartItemsObj[item]) {
      if (cartItemsObj[item][size]) {
        const itemInfo = {
          ...products.find(({ _id }) => _id === item),
        };
        if (itemInfo) {
          itemInfo.qty = cartItemsObj[item][size];
          itemInfo.size = size;
          itemInfo.uniqueKey = `${item}-${size}`;
          cartArrForOrder.push(itemInfo);
        }
      }
    }
  }

  return cartArrForOrder;
};

export const makeCartArr = (cartItemsObj, products) => {
  if (!cartItemsObj || !Object.keys(cartItemsObj)?.length || !products?.length)
    return;

  const cartArr = [];

  Object.entries(cartItemsObj).forEach(([itemId, sizes]) => {
    Object.entries(sizes).forEach(([size, qty]) => {
      if (qty) {
        const itemInfo = { ...products.find(({ _id }) => _id === itemId) };

        if (itemInfo)
          cartArr.push({
            ...itemInfo,
            qty,
            size,
            uniqueKey: `${itemId}-${size}`,
          });
      }
    });
  });

  return cartArr;
};
