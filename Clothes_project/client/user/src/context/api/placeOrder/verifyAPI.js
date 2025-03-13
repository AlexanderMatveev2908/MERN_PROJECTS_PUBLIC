import { axiosInstance } from "../../../constants/instances";

export const verifyStripeAPI = async (searchParams) => {
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  if (success !== "true") return { deleted: true };

  const { data } = await axiosInstance.post(
    `/orders/user/verify_stripe?success=${success}&orderId=${orderId}`
  );
  return data;
};
