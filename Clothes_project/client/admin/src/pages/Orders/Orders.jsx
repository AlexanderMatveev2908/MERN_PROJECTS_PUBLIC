import Spinner from "./../../components/Spinner/Spinner";
import { useGlobal } from "./../../hooks/useGlobal";
import OrderItem from "./OrderItem";
const Orders = () => {
  const { ordersLoading, orders, updateOrder } = useGlobal();

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {ordersLoading ? (
          <Spinner propStyle={{ width: "200px", height: "200px" }} />
        ) : (
          orders?.length &&
          orders.map((order) => (
            <OrderItem key={order._id} {...{ ...order, updateOrder }} />
          ))
        )}
      </div>
    </div>
  );
};
export default Orders;
