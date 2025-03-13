import Order from "../../components/Order/Order";
import Spinner from "../../components/Spinner/Spinner";
import { useOrdersContext } from "../../hooks/useOrdersContext";
import "./Orders.css";

const Orders = () => {
  const { isOrdersLoading, orders } = useOrdersContext();

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="orders-list">
        {isOrdersLoading ? (
          <Spinner style={{ width: "100%" }} />
        ) : (
          orders.map((order) => <Order key={order._id} {...order} />)
        )}
      </div>
    </div>
  );
};
export default Orders;
