import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore.js";

const BlogPage = () => {
  const { id } = useParams();
  const { currentBlog, getBlogById, isLoading } = useBlogStore();

  useEffect(() => {
    if (id) getBlogById(id);
  }, [id, getBlogById]);

  if (isLoading) {
    return <div className="text-center mt-20 text-lg">Loading blog...</div>;
  }

  if (!currentBlog) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold text-lg">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-white rounded-2xl shadow-lg">
      <Link
        to="/blogs"
        className="inline-block mb-6 text-[var(--color-radical-red-600)] font-semibold hover:underline"
      >
        ← Back to Blogs
      </Link>

      <h1 className="text-5xl font-extrabold mb-4 text-[var(--color-radical-red-700)]">
        {currentBlog.headings?.[0] || "Untitled Blog"}
      </h1>

      {currentBlog.images && currentBlog.images.length > 0 && (
        <img
          src={currentBlog.images[0]}
          alt={currentBlog.headings?.[0]}
          className="mb-8 rounded-xl w-full object-cover max-h-96"
        />
      )}

      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: currentBlog.content || "" }}
      />

      {currentBlog.author && (
        <p className="mt-12 text-right italic text-gray-600">
          — {currentBlog.author}
        </p>
      )}
    </div>
  );
};

export default BlogPage;
