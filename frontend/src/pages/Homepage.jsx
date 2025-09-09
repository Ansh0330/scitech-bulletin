import React, { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import Bulletin from "../components/common/Bulletin";
import { useNavigate } from "react-router-dom";
import { useBulletinStore } from "../store/useBulletinStore"; // adjust path as needed

const Homepage = () => {
  const navigate = useNavigate();
  const { latestBulletins, getLatestBulletins, isLoading } = useBulletinStore();

  useEffect(() => {
    getLatestBulletins();
  }, [getLatestBulletins]);

  return (
    <div className="w-full flex flex-col items-center bg-neutral-50 min-h-screen pb-12">
      <HeroSection />

      <main className="max-w-7xl flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        {/* Section heading */}
        <h2 className="text-3xl text-left w-full ml-80 font-extrabold text-neutral-900 mb-6 border-l-4 border-[var(--color-radical-red-500)] pl-4">
          Latest Bulletins
        </h2>

        {/* Bulletins list */}
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
          {isLoading && <p>Loading latest bulletins...</p>}

          {!isLoading && latestBulletins.length === 0 && (
            <p>No bulletins available at the moment.</p>
          )}

          {!isLoading &&
            latestBulletins.map((bulletin) => (
              <Bulletin
                key={bulletin._id}
                imageUrl={bulletin.imageUrl}
                heading={bulletin.heading}
                subHeading={bulletin.subHeading}
                content={bulletin.content}
                date={bulletin.date}
                onReadMore={() => {
                  if (bulletin.blog?._id) {
                    navigate(`/blog/${bulletin.blog._id}`);
                  } else {
                    alert("No blog linked to this bulletin.");
                  }
                }}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
