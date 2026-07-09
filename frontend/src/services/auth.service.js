import api from "../api/axios.js";
import { ENDPOINTS } from "../api/endpoints.js";

export const registerUser = async ({
  name,
  email,
  phone,
  password,
  role,
}) => {
  const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, {
    name,
    email,
    phone,
    password,
    role,
  });
  return data.data;
};

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
  return data.data;
};

export const requestPasswordReset = async ({ email }) => {
  const { data } = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  return data.data;
};
