import axios from "axios";

const API_URL = "/api/auth/";

//register
const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}register`, userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}login`, userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
