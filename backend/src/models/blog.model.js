import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    headings: {
      type: [String], // Multiple headings
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: String, // Optional
      },
    ],
    content: {
      type: String, // Store rich text (HTML or Markdown)
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
