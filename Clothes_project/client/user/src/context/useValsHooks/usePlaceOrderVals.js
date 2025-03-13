import { handleChangePlaceForm } from "../lib/placeOrder/changeValForm";
import { chosePayment } from "../lib/placeOrder/payment";
import { placeOrderHandler } from "../lib/placeOrder/placeOrderHandler";
import { getDeliveryFee, getTotAmount } from "../lib/cart/getTots";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { handleLogout } from "../lib/user/formPost";
import { makeCartArr } from "../lib/placeOrder/makeItemsCart";
import { addDelivery } from "../../utils/addDelivery";
import { useCallback } from "react";
import { verifyStripeLib } from "../lib/placeOrder/verifiers";

export const usePlaceOrderVals = ({ state, dispatch }) => {
  const {
    userState: { token },
    productsState: { products },
    cartState: { cartItems },
    placeOrderState: { placeOrderForm, placeOrderLoading, orderPlaced },
  } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const { paymentMethod, ...address } = placeOrderForm;

  const placeOrderNavigate = useNavigate();
  const placeOrderLocation = useLocation();

  const amountBeforeFee = getTotAmount(cartItems, products);
  const dataToOrder = {
    items: makeCartArr(cartItems, products),
    address,
    paymentMethod,
    amount: addDelivery(amountBeforeFee, getDeliveryFee(amountBeforeFee)),
  };

  const forcedLogoutPlaceOrder = useCallback(
    () =>
      handleLogout(dispatch, placeOrderNavigate, placeOrderLocation.pathname),
    [dispatch, placeOrderNavigate, placeOrderLocation]
  );

  const verifyStripeMemoized = useCallback(
    () =>
      verifyStripeLib(
        searchParams,
        placeOrderNavigate,
        dispatch,
        token,
        forcedLogoutPlaceOrder
      ),
    [searchParams, placeOrderNavigate, dispatch, token, forcedLogoutPlaceOrder]
  );

  return {
    chosePayment: (payment) => chosePayment(dispatch, payment),
    handleChangePlaceForm: (e) => handleChangePlaceForm(dispatch, e),
    placeOrderHandler: () =>
      placeOrderHandler({
        dispatch,
        forcedLogoutPlaceOrder,
        dataToOrder,
      }),

    placeOrderForm,
    placeOrderLoading,

    orderPlaced,
    placeOrderNavigate,

    searchParams,
    setSearchParams,

    verifyStripeMemoized,
  };
};
