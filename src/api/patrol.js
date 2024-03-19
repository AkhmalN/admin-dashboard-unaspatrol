import axios from "axios";
import { baseUrl } from "./apiConfig";

export const getPatrol = async () => {
  try {
    const response = await axios.get(
      `https://server-smartpatrol.vercel.app/api/v1/patrol/`
    );
    return response.data.patrols;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Data tidak ditemukan");
    } else {
      throw new Error("Terjadi kesalahan saat mengambil data absen");
    }
  }
};
