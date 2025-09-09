import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import { useBulletinStore } from "../store/useBulletinStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 6; // 3 x 3 grid

const BulletinsPage = () => {
  const navigate = useNavigate();
  const { bulletins, getAllBulletins, isLoading } = useBulletinStore();
  const { authUser } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedBulletins = bulletins.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(bulletins.length / ITEMS_PER_PAGE);

  useEffect(() => {
    getAllBulletins().catch(() => {
      toast.error("Failed to load bulletins");
    });
  }, [getAllBulletins]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-neutral-50 min-h-screen pb-12">
      <main>
        <div className="text-center px-4 py-20 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4 text-neutral-900">
            Explore the Latest Science & Tech Bulletins
          </h1>
          <p className="text-lg text-neutral-700">
            Dive into our curated selection of current bulletins presenting
            groundbreaking research, discoveries, and innovations.
          </p>
        </div>
      </main>

      {authUser?.role === "admin" && (
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex justify-center -mt-13">
          <button
            onClick={() => navigate("/create-bulletin")}
            className="px-6 py-3 bg-[var(--color-radical-red-600)] text-white font-semibold rounded-md hover:bg-[var(--color-radical-red-700)] transition-colors"
          >
            + Add New Bulletin
          </button>
        </div>
      )}

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="text-center text-neutral-600">Loading bulletins...</p>
        ) : pagedBulletins.length === 0 ? (
          <p className="text-center text-neutral-600">
            No bulletins available currently.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pagedBulletins.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={b.imageUrl}
                    alt={b.heading}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2 text-neutral-900">
                    {b.heading}
                  </h2>
                  <p className="text-neutral-700 flex-grow">
                    {b.subHeading
                      ? b.subHeading
                      : b.content.length > 120
                      ? b.content.substring(0, 120) + "…"
                      : b.content}
                  </p>
                  <div className="flex justify-between items-center mt-5">
                    <span className="mt-4 text-sm text-neutral-500">
                      {new Date(b.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => {
                        if (b.blog?._id) navigate(`/blog/${b.blog._id}`);
                        else toast("No blog linked for this bulletin.");
                      }}
                      className="mt-4 px-4 py-2 bg-[var(--color-radical-red-600)] text-white rounded-md hover:bg-[var(--color-radical-red-700)] transition-colors self-start"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border ${
                currentPage === 1
                  ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
                  : "border-[var(--color-radical-red-600)] text-[var(--color-radical-red-600)] hover:bg-[var(--color-radical-red-50)]"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md border ${
                  page === currentPage
                    ? "bg-[var(--color-radical-red-600)] text-white border-[var(--color-radical-red-600)]"
                    : "border-neutral-300 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border ${
                currentPage === totalPages
                  ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
                  : "border-[var(--color-radical-red-600)] text-[var(--color-radical-red-600)] hover:bg-[var(--color-radical-red-50)]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BulletinsPage;
