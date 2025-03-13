import { useGlobal } from "../../hooks/useGlobal";
import Title from "./../../components/Title/Title";
import Spinner from "./../../components/Spinner/Spinner";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import CartTotal from "../../components/CartTotal/CartTotal";
import { destructureItemCart } from "./destructure";

const Cart = () => {
  const { findInfoCartArrH, cartLoading, token, totQty } = useGlobal();
  const cartArrToDisplay = findInfoCartArrH();
  const navigate = useNavigate();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title {...{ txt1: "YOUR", txt2: "CART" }} />
      </div>

      {token && cartLoading ? (
        <Spinner propStyle={{ width: "200px", height: "200px" }} />
      ) : (
        cartArrToDisplay?.length &&
        cartArrToDisplay.map((item) => (
          <CartItem key={item.uniqueKey} {...destructureItemCart(item)} />
        ))
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() =>
                token && totQty ? navigate("/place-order") : null
              }
              className="bg-black text-white text-sm px-8 my-8 py-3 "
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
