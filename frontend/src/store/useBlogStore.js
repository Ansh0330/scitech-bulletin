import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import toast from "react-hot-toast";

export const useBlogStore = create((set) => ({
  blogs: [],
  currentBlog: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  // Fetch all blogs
  getBlogs: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/blogs/get-all-blogs");
      set({ blogs: res.data.data || [] });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch single blog by id
  getBlogById: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/blogs/get-blog-by-id/${id}`);
      set({ currentBlog: res.data.data || null });
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to fetch blog");
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a new blog
  createBlog: async (blogData) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/blogs/create-blog", blogData);
      toast.success("Blog created successfully");
      // Optionally refresh blog list after creation
      set((state) => ({ blogs: [res.data.data, ...state.blogs] }));
      return res.data.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
      throw error;
    } finally {
      set({ isCreating: false });
    }
  },

  // Update a blog by ID
  updateBlog: async (id, blogData) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(`/blogs/update-blog/${id}`, blogData);
      toast.success("Blog updated successfully");
      // Update currentBlog and blogs list accordingly
      set((state) => {
        const updatedBlogs = state.blogs.map((b) =>
          b._id === id ? res.data.data : b
        );
        return { currentBlog: res.data.data, blogs: updatedBlogs };
      });
      return res.data.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
      throw error;
    } finally {
      set({ isUpdating: false });
    }
  },

  // Delete a blog by ID
  deleteBlog: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/blogs/delete-blog/${id}`);
      toast.success("Blog deleted successfully");
      set((state) => ({
        blogs: state.blogs.filter((b) => b._id !== id),
        currentBlog: state.currentBlog?._id === id ? null : state.currentBlog,
      }));
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      set({ isDeleting: false });
    }
  },
}));
