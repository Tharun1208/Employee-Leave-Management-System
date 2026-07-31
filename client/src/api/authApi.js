import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Register user
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// Login user
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Forgot password
export const forgotPassword = (data) => {
  return API.post("/auth/forgot-password", data);
};

// Reset password
export const resetPassword = (data) => {
  return API.post("/auth/reset-password", data);
};

export default API;