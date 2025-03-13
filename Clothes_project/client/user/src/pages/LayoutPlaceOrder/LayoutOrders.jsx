import { Outlet } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect } from "react";

const LayoutPlaceOrder = () => {
  const {
    token,
    totQty,
    cartLoading,
    orderPlaced,
    placeOrderNavigate,
    paymentMethod,
  } = useGlobal();

  useEffect(() => {
    if (token) {
      if (orderPlaced && !cartLoading && !totQty) {
        placeOrderNavigate("/orders");
      } else if (!orderPlaced && !cartLoading && !totQty) {
        placeOrderNavigate("/collection");
      }
    } else {
      placeOrderNavigate("/collection");
    }
  }, [
    token,
    cartLoading,
    totQty,
    placeOrderNavigate,
    orderPlaced,
    paymentMethod,
  ]);

  return token && cartLoading ? (
    <div className="w-full flex justify-center items-center h-[70vh] ">
      <Spinner propStyle={{ width: "250px", height: "250px" }} />
    </div>
  ) : (
    <Outlet />
  );
};
export default LayoutPlaceOrder;
//   return token && cartLoading ? (
//     <div className="w-full flex justify-center items-center h-[70vh] ">
//       <Spinner propStyle={{ width: "250px", height: "250px" }} />
//     </div>
//   ) : token && !cartLoading && totQty ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/" replace={true} />
//   );
// };
// export default LayoutPlaceOrder;
