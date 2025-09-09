// pages/CreateBlogPage.jsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore.js"; // your Zustand blog store
import toast from "react-hot-toast";
import ReactQuillEditor from "../components/common/ReactQuillEditor";

const CreateBlogPage = () => {
  const { createBlog, isCreating } = useBlogStore();
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit called with data:", data, "content:", content);
    if (!content || content.trim() === "<p><br></p>") {
      toast.error("Content is required");
      return;
    }

    try {
      const blogData = {
        headings: [data.heading],
        content,
        author: "Admin", // or user from auth store
        images: [], // extend later if needed
      };

      const newBlog = await createBlog(blogData);
      toast.success("Blog created successfully");
      // Redirect back with blog ID to link to bulletin or wherever needed
      navigate("/create-bulletin", { state: { newBlogId: newBlog._id } });
    } catch {
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-2xl shadow-lg mt-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[var(--color-radical-red-600)]">
        Create New Blog
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Heading *</label>
          <input
            {...register("heading", { required: "Heading is required" })}
            type="text"
            placeholder="Enter main blog heading"
            className={`w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-radical-red-600)] ${
              errors.heading ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.heading && <p className="text-red-500 mt-1 text-sm">{errors.heading.message}</p>}
        </div>

        <Controller
          name="content"
          control={control}
          defaultValue={content}
          render={() => <ReactQuillEditor value={content} onChange={setContent} />}
          rules={{ required: true }}
        />

        <button
          type="submit"
          disabled={isCreating}
          className="mt-6 px-8 py-4 bg-[var(--color-radical-red-600)] text-white text-xl font-bold rounded-lg hover:bg-[var(--color-radical-red-700)] transition"
        >
          {isCreating ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
