import { useContext } from 'react';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

const useCombinedContext = () => {
const cartContext = useContext(CartContext);
const userContext = useContext(UserContext);

return { ...cartContext, ...userContext };
};

export default useCombinedContext;

<!--  -->

import React, { createContext, useState, useContext } from 'react';

// Cart Context
const CartContext = createContext();
const CartProvider = ({ children }) => {
const [cart, setCart] = useState([]);
const addToCart = (item) => setCart([...cart, item]);
return (
<CartContext.Provider value={{ cart, addToCart }}>
{children}
</CartContext.Provider>
);
};

// User Context
const UserContext = createContext();
const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const login = (userData) => setUser(userData);
return (
<UserContext.Provider value={{ user, login }}>
{children}
</UserContext.Provider>
);
};

// Combined Provider
const CombinedProvider = ({ children }) => (
<CartProvider>
<UserProvider>
{children}
</UserProvider>
</CartProvider>
);

export { CombinedProvider, CartContext, UserContext };

<!--  -->

import { useContext } from 'react';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

const useCombinedContext = () => {
const cartContext = useContext(CartContext);
const userContext = useContext(UserContext);

return { ...cartContext, ...userContext };
};

export default useCombinedContext;

<!--  -->

import { useContext } from 'react';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

const useCombinedContext = () => {
const cartContext = useContext(CartContext);
const userContext = useContext(UserContext);

return { ...cartContext, ...userContext };
};

export default useCombinedContext;

<!--  -->

import React from 'react';
import useCombinedContext from './useCombinedContext';

const MyComponent = () => {
const { cart, addToCart, user, login } = useCombinedContext();

const handleAddToCart = () => addToCart('Item 1');
const handleLogin = () => login({ name: 'John Doe' });

return (

<div>
<button onClick={handleAddToCart}>Add to Cart</button>
<button onClick={handleLogin}>Login</button>
<div>Cart: {cart.join(', ')}</div>
<div>User: {user ? user.name : 'Not logged in'}</div>
</div>
);
};

<!--  -->

import React from 'react';
import { CombinedProvider } from './contexts';
import MyComponent from './MyComponent';

const App = () => (
<CombinedProvider>
<MyComponent />
</CombinedProvider>
);

export default App;
