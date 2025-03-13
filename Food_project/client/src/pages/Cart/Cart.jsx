import "./Cart.css";
import { useNavigate } from "react-router-dom";
import CartTotal from "../../comp/CartTotal.jsx/CartTotal";
import CartItem from "../../comp/CartItem/CartItem";
import Spinner from "../../comp/Spinner/Spinner";
import { useGlobal } from "../../hooks/useGlobal";

const Cart = () => {
  const { cartItems, cartLoading, cartTotPrice, token, food_list } =
    useGlobal();
  const navigate = useNavigate();

  const handleProceedCheck = () => {
    if (cartTotPrice && token) navigate("/place-order");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {cartLoading ? (
          <Spinner style={{ width: "100%" }} />
        ) : (
          food_list.map((item) => {
            if (cartItems[item._id]) {
              return <CartItem key={item._id} {...item} />;
            }
          })
        )}
      </div>

      <div className="cart-bottom">
        <CartTotal>
          <button onClick={handleProceedCheck}>PROCEED TO CHECKOUT</button>
        </CartTotal>

        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, Enter it here</p>

            <div className="cart-promo-code-input">
              <input type="text" placeholder="Promo Code..." />

              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
