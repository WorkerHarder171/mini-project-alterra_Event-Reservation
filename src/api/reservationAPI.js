import {AxiosError} from "axios";
import {axiosInstance} from "../config/axiosInstance";

export const getReservation = {
  postEvent: async (data) => {
    try {
      const response = await axiosInstance.post("/event", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(AxiosError);
      throw new Error(error);
    }
  },
  getEvent: async (id) => {
    try {
      const response = await axiosInstance.get("/event",id);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(AxiosError);
      throw new Error(error);
    }
  },
  editEvent: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/event/${id}`, data);
      console.log("response edit =>", response);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(AxiosError);
      throw new Error(error);
    }
  },
  deleteEvent: async (id) => {
    try {
      const response = await axiosInstance.delete(`/event/${id}`);
      console.log("response delete =>", response);
      if (!response) {
        return { response };
      }
      return window.confirm("Apakah anda ingin menghapus event ini?");
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(AxiosError);
      throw new Error(error);
    }
  },
};
