import Spinner from "../../components/Spinner/Spinner";
import Title from "../../components/Title/Title";
import { useGlobal } from "../../hooks/useGlobal";
import { destructureOrderItem } from "./destructureOrderItem";
import OrderItem from "./OrderItem";

const Orders = () => {
  const { orders, ordersLoading, token, getOrdersMemoized } = useGlobal();

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title {...{ txt1: "MY", txt2: "ORDERS" }} />
      </div>

      <div>
        {token && ordersLoading ? (
          <div className="w-full h-full justify-center items-center">
            <Spinner propStyle={{ width: "180px", height: "180px" }} />
          </div>
        ) : orders?.length ? (
          orders.map((item) => (
            <OrderItem
              key={item.uniqueKey}
              {...{ ...destructureOrderItem(item), getOrdersMemoized }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Orders;
