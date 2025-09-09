import Blog from "../models/blog.model.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { headings, images, content, author } = req.body;

    if (!headings || !Array.isArray(headings) || headings.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one heading is required" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required" });
    }

    const blogAuthor = author || "Admin"; // fallback to Admin if no author provided

    const newBlog = new Blog({
      headings,
      images,
      content,
      author: blogAuthor,
    });

    await newBlog.save();

    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error getting blogs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { headings, images, content, author } = req.body;

    if (!headings || !Array.isArray(headings) || headings.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one heading is required" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Content is required" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        headings,
        images,
        content,
        author: author || "Admin",
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
