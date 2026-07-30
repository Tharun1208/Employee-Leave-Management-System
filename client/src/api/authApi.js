import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};
export const updateEmployee = (id, data) => {
    return API.put(`/employees/${id}`, data);
};

export const deleteEmployee = (id) => {
    return API.delete(`/employees/${id}`);
};
export default API;