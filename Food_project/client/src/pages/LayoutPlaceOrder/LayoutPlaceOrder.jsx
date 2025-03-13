import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../../comp/Spinner/Spinner";
import { useEffect } from "react";
import { useGlobal } from "../../hooks/useGlobal";
// import { useCart } from "../../hooks/useCart";

const LayoutPlaceOrder = () => {
  // const { cartItems, token, cartLoading, loadCart } = useCart();
  const { cartItems, token, cartLoading, loadCart } = useGlobal();

  const navigate = useNavigate();

  useEffect(() => {
    const handleGuests = async () => {
      try {
        if (!token) navigate("/");
        else if (token && !Object.keys(cartItems).length) {
          await loadCart().then((data) => {
            if (!Object.keys(data).length) navigate("/");
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleGuests();
  }, [navigate, token, loadCart, cartItems]);

  if (cartLoading) return <Spinner />;
  else if (Object.keys(cartItems).length && token) return <Outlet />;
};
export default LayoutPlaceOrder;
