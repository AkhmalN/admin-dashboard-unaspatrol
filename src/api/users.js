import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getUsers = async () => {
  try {
    const response = await axios.get(
      `https://server-smartpatrol.vercel.app/api/v1/users/`
    );
    return response.data.users;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data absen");
    }
  }
};

export const getUserDetail = async (userId) => {
  try {
    const response = await axios.get(
      `http://192.168.100.123:8083/api/v1/users/${userId}`
    );
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${baseUrl}/users/${userId}`);
    console.log(response);
  } catch (error) {}
};
