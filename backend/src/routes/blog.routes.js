import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public route to get all blogs
router.get("/get-all-blogs", getBlogs);

// Public route to get a single blog by ID
router.get("/get-blog-by-id/:id", getBlogById);

// Protected route to create a blog (only authenticated users)
router.post("/create-blog", isLoggedIn, createBlog);

// Protected route to update a blog by ID (authenticated users)
router.put("/update-blog/:id", isLoggedIn, updateBlog);

// Protected route to delete a blog by ID (authenticated users)
router.delete("/delete-blog/:id", isLoggedIn, deleteBlog);

export default router;
