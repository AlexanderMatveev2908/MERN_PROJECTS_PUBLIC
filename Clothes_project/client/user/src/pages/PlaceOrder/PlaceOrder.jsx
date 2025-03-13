import CartTotal from "../../components/CartTotal/CartTotal";
import Title from "../../components/Title/Title";
import Fields from "./Fields";
import Payments from "./Payments";
import { useGlobal } from "../../hooks/useGlobal";

const PlaceOrder = () => {
  const {
    chosePayment,
    placeOrderForm,
    handleChangePlaceForm,
    placeOrderLoading,
    placeOrderHandler,
  } = useGlobal();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        placeOrderHandler();
      }}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]border-t sm:gap-10"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl">
          <Title {...{ txt1: "DELIVERY", txt2: "INFORMATION" }} />
        </div>

        <Fields {...{ placeOrderForm, handleChangePlaceForm }} />
      </div>

      <div className="mt-8 sm:w-full">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title {...{ txt1: "PAYMENT", txt2: "METHOD" }} />

          <div className="flex gap-3 flex-col xl:flex-row">
            <Payments
              {...{ chosePayment, paymentMethod: placeOrderForm.paymentMethod }}
            />
          </div>

          <div className="w-full text-end mt-8">
            <button
              disabled={placeOrderLoading}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              {placeOrderLoading ? "Placing order..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
