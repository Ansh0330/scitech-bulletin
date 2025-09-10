import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import toast from "react-hot-toast";

export const useBulletinStore = create((set) => ({
  bulletins: [],
  latestBulletins: [],
  isLoading: false,

  getAllBulletins: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/bulletins/get-all-bulletins");
      set({ bulletins: res.data.data });
    } catch (error) {
      toast.error("Failed to load bulletins");
    } finally {
      set({ isLoading: false });
    }
  },

  getLatestBulletins: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/bulletins/get-latest-bulletins");
      set({ latestBulletins: res.data.data });
    } catch (error) {
      toast.error("Failed to load latest bulletins");
    } finally {
      set({ isLoading: false });
    }
  },

  createBulletin: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/bulletins/create-bulletin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("CREATE BULLETIN RESPONSE ---->", res.data);
      toast.success("Bulletin created successfully");
      // Optionally update bulletins list
    } catch (error) {
      toast.error("Failed to create bulletin");
    } finally {
      set({ isLoading: false });
    }
  },

  editBulletin: async (id, formData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.put(`/bulletins/edit-bulletin/${id}`, formData);
      toast.success("Bulletin updated successfully");
      // Optionally update local store bulletins
    } catch (error) {
      toast.error("Failed to update bulletin");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBulletin: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/bulletins//delete-bulletin/${id}`);
      toast.success("Bulletin deleted successfully");
      // Optionally update local store bulletins
    } catch (error) {
      toast.error("Failed to delete bulletin");
    } finally {
      set({ isLoading: false });
    }
  },
}));
