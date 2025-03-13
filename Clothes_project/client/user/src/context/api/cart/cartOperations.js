import { axiosInstance } from "../../../constants/instances";
import { showToast } from "../../../utils/toast";
import { ROLLBACK } from "../../actionTypes/cartActionTypes";

export const handleError = (
  dispatch,
  navigate,
  location,
  prevCart,
  basicLogout,
  err
) => {
  if (err.status === 401) {
    basicLogout(dispatch, navigate, location);
  } else {
    dispatch({ type: ROLLBACK, payload: prevCart });
  }

  showToast(err.response?.data?.msg || err.message, "error");
};

export const getCartAPI = async () => {
  const {
    data: { cartData },
  } = await axiosInstance.get("/cart");

  return cartData;
};

export const addItemCartAPI = async (itemId, itemSize) => {
  const { data } = await axiosInstance.patch("/cart", {
    itemId,
    itemSize,
    action: "ADD",
  });

  return data;
};

export const updateQtyAPI = async (itemId, itemSize, qty) => {
  const { data } = await axiosInstance.patch("/cart", {
    itemId,
    itemSize,
    qty,
    action: "UPDATE_QTY",
  });

  return data;
};

export const removeItemAPI = async (itemId, itemSize) => {
  const { data } = await axiosInstance.patch("/cart", {
    itemId,
    itemSize,
    action: "REMOVE",
  });

  return data;
};
