import axios from "axios";

const API = "https://employee-leave-management-system-ug86.onrender.com/api/leaves";

const authHeader = () => ({
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
});


// Employee apply leave with document upload
export const applyLeave = (data) =>
  axios.post(
    `${API}/apply`,
    data,
    {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"multipart/form-data"
      }
    }
  );


// Employee view own leaves
export const getMyLeaves = () =>
  axios.get(
    `${API}/my-leaves`,
    authHeader()
  );


// Manager view all employee leaves
export const getAllLeaves = () =>
  axios.get(
    `${API}/all`,
    authHeader()
  );


// Manager approve leave
export const approveLeave = (id,remarks) =>
  axios.put(
    `${API}/approve/${id}`,
    {
      remarks
    },
    authHeader()
  );


// Manager reject leave
export const rejectLeave = (id,remarks) =>
  axios.put(
    `${API}/reject/${id}`,
    {
      remarks
    },
    authHeader()
  );