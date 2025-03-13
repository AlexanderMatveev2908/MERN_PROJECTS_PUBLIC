import { addDeliveryFee } from "./../utils/addDeliveryFee";
import {
  clearFormAct,
  setLoadingAct,
} from "../hooks/useFormV2/formReducer/actionCreator";
import {
  setOrdersAct,
  setOrdersLoadingAct,
} from "../Context/CartContext/cartReducer/cartActionCreators";

export const getOrdersV0 = async (cartDispatch, ordersInstance, reset) => {
  try {
    cartDispatch(setOrdersLoadingAct(true));
    const res = await ordersInstance.get();

    if (res.data?.ok) cartDispatch(setOrdersAct(res.data.orders));
  } catch (err) {
    if (err?.response?.status === 401) reset(err);

    console.log(err);
  } finally {
    cartDispatch(setOrdersLoadingAct(false));
  }
};

export const getOrderV0 = async (
  itemId,
  ordersInstance,
  cartDispatch,
  orders
) => {
  try {
    const res = await ordersInstance.get(`/${itemId}?fields=status,-_id`);

    if (res.data?.ok) {
      const updatedOrders = orders.map((order) =>
        order._id === itemId
          ? { ...order, status: res.data.order.status }
          : order
      );

      cartDispatch(setOrdersAct(updatedOrders));
    }
  } catch (err) {
    console.log(err);
  }
};

export const handlePlaceOrderV0 = async (
  e,
  formState,
  food_list,
  cartItems,
  formDispatch,
  ordersInstance,
  reset,
  cartTotPrice
) => {
  e.preventDefault();

  const { orderVals } = formState;

  let orderItems = [];

  food_list.forEach((item) => {
    if (cartItems[item._id]) {
      orderItems.push({
        ...item,
        quantity: cartItems[item._id],
        price: item.price,
      });
    }
  });

  const orderData = {
    address: orderVals,
    items: orderItems,
    amount: addDeliveryFee(cartTotPrice, 10),
  };

  const formType = "orderVals";
  const formTypeLoading = "orderLoading";

  try {
    formDispatch(setLoadingAct(true, formTypeLoading));

    const res = await ordersInstance.post("/", orderData);

    if (res.data?.ok) {
      const { session_url } = res.data;
      window.location.replace(session_url);

      formDispatch(clearFormAct(formType));
    }
  } catch (err) {
    if (err?.response?.status === 401) reset(err);
    console.log(err);
  } finally {
    formDispatch(setLoadingAct(false, formTypeLoading));
  }
};
