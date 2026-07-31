import axios from "axios";

const API_URL = "https://employee-leave-management-system-ug86.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getEmployeesCount = () => {
  return api.get(
    "/users/employees",
    authHeader()
  );
};

export const getAllLeaves = () => {
  return api.get(
    "/leaves/all",
    authHeader()
  );
};