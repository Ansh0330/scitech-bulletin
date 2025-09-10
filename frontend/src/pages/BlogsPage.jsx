import React, { useEffect, useState } from "react";
import { useBlogStore } from "../store/useBlogStore.js";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const { blogs, getBlogs, isLoading } = useBlogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 7;

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Utility to truncate content and strip HTML tags
  const getShortContent = (html, maxLength = 150) => {
    const plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  if (isLoading) {
    return <div className="text-center mt-20 text-lg">Loading blogs...</div>;
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600 font-semibold">
        No blogs available.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white rounded-2xl shadow-lg mt-16">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-[var(--color-radical-red-600)]">
        Blogs
      </h1>

      <ul className="divide-y divide-gray-300">
        {currentBlogs.map((blog) => (
          <li key={blog._id} className="py-6">
            <Link
              to={`/blog/${blog._id}`}
              className="block hover:bg-[var(--color-radical-red-50)] rounded-lg p-4 transition"
            >
              <h2 className="text-2xl font-semibold text-[var(--color-radical-red-700)] mb-2">
                {blog.headings?.[0] || "Untitled Blog"}
              </h2>
              <p className="text-gray-700 mb-1">
                {getShortContent(blog.content)}
              </p>
              <p className="text-sm text-gray-500 italic">
                — {blog.author || "Unknown Author"}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Buttons */}
      <nav className="mt-12 flex justify-center space-x-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md font-medium ${
              currentPage === index + 1
                ? "bg-[var(--color-radical-red-600)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[var(--color-radical-red-100)]"
            }`}
            aria-current={currentPage === index + 1 ? "page" : undefined}
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BlogsPage;
