import { showToast } from "../../../utils/toast";
import {
  SET_ORDERS,
  SET_ORDERS_ERROR,
  SET_ORDERS_LOADING,
} from "../../actionTypes/ordersActionTypes";
import { getOrdersAPI } from "../../api/orders/ordersAPI";
import { genBytes } from "./../../../utils/genBytes";

export const getOrders = async (dispatch, token, logoutCB) => {
  try {
    if (!token) return;

    dispatch({
      type: SET_ORDERS_LOADING,
      payload: { field: "ordersLoading", status: true },
    });

    const { orders } = await getOrdersAPI();

    let orderItems;

    if (orders?.length)
      orderItems = orders
        .flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            paymentMethod: order.paymentMethod,
            isPaid: order.isPaid,
            date: order.date,
            uniqueKey: genBytes(),
          }))
        )
        .reverse();
    else orderItems = [];

    dispatch({ type: SET_ORDERS, payload: { orders: orderItems } });
  } catch (err) {
    if (err.status === 401) logoutCB();

    showToast(err?.response?.data?.msg || err.message, "error");

    dispatch({
      type: SET_ORDERS_ERROR,
      payload: { status: err?.response?.data?.msg || err.message },
    });
  } finally {
    dispatch({
      type: SET_ORDERS_LOADING,
      payload: { field: "ordersLoading", status: false },
    });
  }
};
