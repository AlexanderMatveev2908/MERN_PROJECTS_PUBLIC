import { axiosInstance } from "../../constants/instances";

export const getOrdersAPI = async () => {
  const { data } = await axiosInstance.get("/orders/admin");

  return data;
};

export const updateStatusORderAPI = async (orderId, status) => {
  const { data } = await axiosInstance.patch("/orders/admin", {
    orderId,
    status,
  });

  return data;
};
