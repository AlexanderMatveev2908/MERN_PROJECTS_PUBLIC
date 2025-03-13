import { toast } from "react-toastify";
import {
  setOrdersAct,
  setOrdersLoadingAct,
  setUpdatingLoadingAct,
} from "../Context/ordersReducer";
import { ordersInstance } from "../constants/url";

export const getAllOrdersV0 = async (ordersDispatch) => {
  try {
    ordersDispatch(setOrdersLoadingAct(true));

    const res = await ordersInstance.get("/list");

    if (res.data?.ok) ordersDispatch(setOrdersAct(res.data.orders));
  } catch (err) {
    console.log(err);
    toast.error(`${err.response.data.message}`);
  } finally {
    ordersDispatch(setOrdersLoadingAct(false));
  }
};

export const updateStatusV0 = async (
  e,
  orderId,
  ordersDispatch,
  getAllOrders
) => {
  const { value } = e.target;

  if (!value) throw new Error("=> Invalid input: ");

  try {
    ordersDispatch(setUpdatingLoadingAct(orderId));

    const res = await ordersInstance.patch(`/${orderId}`, { status: value });

    if (res.data?.ok) {
      getAllOrders();
      toast.success("update successfully");
    }
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    ordersDispatch(setUpdatingLoadingAct(false));
  }
};
