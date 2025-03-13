import axios from "axios";

export const url = "http://localhost:4000/api/v1/food";

export const ordersUrl = "http://localhost:4000/api/v1/order";

export const foodsInstance = axios.create({ baseURL: url });

export const ordersInstance = axios.create({ baseURL: ordersUrl });
