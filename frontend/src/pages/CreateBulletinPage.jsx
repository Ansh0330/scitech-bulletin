import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useBulletinStore } from "../store/useBulletinStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const CreateBulletinPage = () => {
  const { createBulletin, isLoading } = useBulletinStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Prefill blog ID if coming back from create-blog page
  useEffect(() => {
    if (location.state?.newBlogId) {
      setValue("blog", location.state.newBlogId);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, setValue]);

  if (!authUser || authUser.role !== "admin") {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold text-lg">
        Access Denied. Only admins can add bulletins.
      </div>
    );
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    const blogId = data.blog?.trim();
    if (blogId) {
      formData.append("blog", blogId);
    }
    formData.append("heading", data.heading);
    formData.append("subHeading", data.subHeading || "");
    formData.append("content", data.content);
    formData.append("image", data.image[0]);

    try {
      const res = await createBulletin(formData);
      console.log(res)
      toast.success("Bulletin created successfully!");
      navigate("/bulletins");
    } catch {
      toast.error("Failed to create bulletin");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-2xl shadow-lg mt-16">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[var(--color-radical-red-600)]">
        Create New Bulletin
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        {/* Heading */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Heading *
          </label>
          <input
            {...register("heading", { required: "Heading is required" })}
            type="text"
            placeholder="Enter heading"
            className={`w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-radical-red-600)] ${
              errors.heading ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.heading && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.heading.message}
            </p>
          )}
        </div>

        {/* Sub Heading */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Sub Heading
          </label>
          <input
            {...register("subHeading")}
            type="text"
            placeholder="Enter subheading (optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-radical-red-600)]"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Content *
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            rows={6}
            placeholder="Enter the content"
            className={`w-full border rounded-lg px-4 py-3 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-radical-red-600)] ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.content && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Linked Blog ID with Add Blog Button */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Linked Blog ID (optional)
          </label>
          <div className="flex gap-4">
            <input
              {...register("blog")}
              type="text"
              placeholder="Enter blog ID or add new blog"
              className="flex-grow border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-radical-red-600)]"
            />
            <button
              type="button"
              onClick={() =>
                navigate("/create-blog", {
                  state: { fromCreateBulletin: true },
                })
              }
              className="px-6 py-3 bg-[var(--color-radical-red-600)] text-white font-semibold rounded-lg hover:bg-[var(--color-radical-red-700)] transition"
            >
              Add Blog
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Image *
          </label>
          <input
            {...register("image", {
              required: "Image is required",
              validate: {
                isFile: (files) =>
                  files.length > 0 || "Please upload an image file",
              },
            })}
            type="file"
            accept="image/*"
            className={`w-full border rounded-lg px-4 py-3 text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-radical-red-600)] ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.image && (
            <p className="text-red-500 mt-1 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="mt-6 w-full px-6 py-4 bg-[var(--color-radical-red-600)] text-white text-xl font-bold rounded-lg hover:bg-[var(--color-radical-red-700)] transition"
        >
          {isLoading ? "Creating..." : "Create Bulletin"}
        </button>
      </form>
    </div>
  );
};

export default CreateBulletinPage;
