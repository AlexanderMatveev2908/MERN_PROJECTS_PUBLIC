import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";

const LayoutListOrders = () => {
  const { token } = useGlobal();
  return token ? <Outlet /> : <Navigate to="/" replace={true} />;
};
export default LayoutListOrders;
