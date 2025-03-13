const higherErrorHandler = useCallback(
(err) => {
const cartCopy = { ...cartItems }; // Create a copy when needed
handleError(dispatch, navigateCart, locationCart.path, cartCopy, err);
},
[dispatch, navigateCart, locationCart.path, cartItems] // Include cartItems in dependencies
);

const memoizedGetCart = useCallback(
() => getCartHandler(higherErrorHandler, dispatch),
[higherErrorHandler, dispatch]
);
