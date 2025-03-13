import { axiosInstance } from "../../../constants/instances";

export const getOrdersAPI = async () => {
  const { data } = await axiosInstance.get("/orders/user");

  return data;
};
