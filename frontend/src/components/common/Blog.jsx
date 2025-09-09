import React from "react";

const Blog = ({ heading, content, references = [], createdAt }) => {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 my-12">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-neutral-900 mb-2">
          {heading}
        </h1>
        <time
          dateTime={new Date(createdAt).toISOString()}
          className="text-sm text-neutral-500"
        >
          Published on{" "}
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <section className="prose prose-neutral max-w-full mb-8">
        {/* Assuming content comes as sanitized HTML or markdown converted to HTML */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      {references.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            References
          </h2>
          <ul className="list-disc list-inside space-y-1 text-neutral-700">
            {references.map((ref, index) => (
              <li key={index}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-radical-red-500)] hover:underline"
                >
                  {ref.title || ref.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

export default Blog;
