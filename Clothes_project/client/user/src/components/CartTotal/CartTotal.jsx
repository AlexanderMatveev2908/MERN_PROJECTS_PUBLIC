import { useGlobal } from "../../hooks/useGlobal";
import { addDelivery } from "../../utils/addDelivery";
import { priceFormatter } from "../../utils/priceFormatter";
import Title from "../Title/Title";

const CartTotal = () => {
  const { deliveryFee, totAmount } = useGlobal();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title {...{ txt1: "CART", txt2: "TOTALS" }} />

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{priceFormatter(totAmount)}</p>
          </div>

          <hr />

          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{priceFormatter(deliveryFee)}</p>
          </div>

          <hr />

          <div className="flex justify-between">
            <b>Total</b>
            <b>{priceFormatter(addDelivery(totAmount, deliveryFee))}</b>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartTotal;
