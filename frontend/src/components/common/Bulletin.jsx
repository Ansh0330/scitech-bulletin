import React from "react";

const Bulletin = ({
  imageUrl,
  heading,
  subHeading = "",
  content = "",
  date,
  onReadMore,
}) => {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-4xl w-full mb-6">
      {/* Image */}
      <div
        className="sm:w-1/3 w-full h-48 sm:h-auto overflow-hidden flex-shrink-0"
        style={{ width: "300px", height: "200px" }}
      >
        <img
          src={imageUrl}
          alt={heading}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="sm:w-2/3 w-full p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">{heading}</h2>

          {subHeading ? (
            <p className="text-neutral-700 mb-4 line-clamp-3">{subHeading}</p>
          ) : (
            <p className="text-neutral-800 line-clamp-4">
              {content.length > 300 ? content.substring(0, 300) + "…" : content}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-neutral-500 mb-4 sm:mb-0">
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <button
            onClick={onReadMore}
            className="self-start sm:self-auto px-5 py-2 border border-[var(--color-radical-red-500)] text-[var(--color-radical-red-600)] font-semibold rounded-md hover:bg-[var(--color-radical-red-50)] transition-colors"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bulletin;
