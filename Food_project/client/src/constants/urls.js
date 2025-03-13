import axios from "axios";

export const urlUser = "http://localhost:4000/api/v1/user";

export const urlFood = "http://localhost:4000/api/v1/food";

export const urlCart = "http://localhost:4000/api/v1/cart";

export const urlOrder = "http://localhost:4000/api/v1/order";

export const userInstanceV0 = axios.create({
  baseURL: urlUser,
});

export const foodInstanceV0 = axios.create({
  baseURL: urlFood,
});

export const createCartInstance = (token) =>
  axios.create({
    baseURL: urlCart,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const createOrdersInstance = (token) =>
  axios.create({
    baseURL: urlOrder,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
