import { axiosInstance } from "./../../../constants/instances";
export const placeOrderAPI = async ({ dataToOrder }) => {
  const { data } = await axiosInstance.post("/orders/user", {
    ...dataToOrder,
  });

  console.log(data);

  return data;
};
