import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../../comp/Spinner/Spinner";
import { useGlobal } from "../../hooks/useGlobal";

const OrdersLayout = () => {
  const { token, ordersLoading } = useGlobal();

  if (ordersLoading && token) return <Spinner style={{ width: "100%" }} />;
  if (!ordersLoading && token) return <Outlet />;
  if (!token) return <Navigate to="/" />;
};
export default OrdersLayout;
