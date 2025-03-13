import { axiosInstance } from "../../constants/instances";

export const loginCall = async (registerVals) => {
  try {
    const { data } = await axiosInstance.post(
      "/user/admin/login",
      registerVals
    );

    return data;
  } catch (err) {
    console.dir(err);
    throw new Error(err.response?.data?.msg || err.message);
  }
};
