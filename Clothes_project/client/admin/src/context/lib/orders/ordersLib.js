import {
  SET_ORDERS,
  SET_ORDERS_ERROR,
  SET_ORDERS_LOADING,
  SET_SUCCESS_UPDATE,
} from "../../actionTypes/ordersActionTypes";
import { SET_TOKEN } from "../../actionTypes/userActionTypes";
import { showToast } from "./../../../utils/toastFn";
import { genId } from "./../../../utils/genId";

export const asyncOrdersWrapper =
  (ctxCb, apiCb, dispatch, fieldLoading, fieldError) =>
  async (...params) => {
    try {
      dispatch({
        type: SET_ORDERS_ERROR,
        payload: {
          field: fieldError,
          status: null,
        },
      });
      dispatch({
        type: SET_ORDERS_LOADING,
        payload: { field: fieldLoading, status: true },
      });

      await ctxCb(apiCb, dispatch, ...params);
    } catch (err) {
      console.log(err);

      if (err.status === 401)
        dispatch({ type: SET_TOKEN, payload: { token: "" } });

      dispatch({
        type: SET_ORDERS_ERROR,
        payload: {
          field: fieldError,
          status: err?.response?.data?.msg || err.message,
        },
      });

      showToast(err?.response?.data?.msg || err.message, "error");
    } finally {
      dispatch({
        type: SET_ORDERS_LOADING,
        payload: { field: fieldLoading, status: false },
      });
    }
  };

export const getOrdersLib = async (apiCb, dispatch) => {
  const { orders } = await apiCb();

  const processedOrders = Array.isArray(orders)
    ? orders?.map((order) => ({
        ...order,
        items: order?.items.map((item) => ({
          ...item,
          uniqueKey: genId(),
        })),
      }))
    : [];

  dispatch({ type: SET_ORDERS, payload: { orders: processedOrders ?? [] } });
};

export const updateOrderStatusLib = async (apiCb, dispatch, orderId, e) => {
  const { value: status } = e.target;

  const { msg } = await apiCb(orderId, status);

  dispatch({ type: SET_SUCCESS_UPDATE, payload: { orderId, status } });
  showToast(msg, "success");
};
