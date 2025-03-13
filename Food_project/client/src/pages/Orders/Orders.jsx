import OrderItem from "../../comp/OrderItem/OrderItem";
import Spinner from "../../comp/Spinner/Spinner";
import { useGlobal } from "../../hooks/useGlobal";
import "./Orders.css";

const Orders = () => {
  const { orders, ordersLoading } = useGlobal();

  if (ordersLoading) return <Spinner style={{ width: "100%" }} />;

  return (
    <div className="orders">
      <h2>My Orders</h2>
      <div className="orders-container">
        {orders.map((order) => (
          <OrderItem key={order._id} {...{ order, ordersLoading }} />
        ))}
      </div>
    </div>
  );
};
export default Orders;
