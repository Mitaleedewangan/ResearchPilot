// import axios from "axios";
// import { saveAuth } from "../utils/auth";

// const API_URL = "http://localhost:8000/api/auth";

// export const signup = async (name, email, password) => {
//   const response = await axios.post(`${API_URL}/signup`, {
//     name,
//     email,
//     password,
//   });

//   saveAuth(response.data);

//   return response.data;
// };

// export const login = async (email, password) => {
//   const response = await axios.post(`${API_URL}/login`, {
//     email,
//     password,
//   });

//   saveAuth(response.data);

//   return response.data;
// };


import axios from "axios";
import { saveAuth } from "../utils/auth";

const API_URL = "http://localhost:8000/api/auth";

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, {
    name,
    email,
    password,
  });

  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  saveAuth(response.data);

  return response.data;
};