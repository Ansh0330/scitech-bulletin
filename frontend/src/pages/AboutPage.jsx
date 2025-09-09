import React from "react";
import founderImage from "../assets/IMG_0663.jpg";
const AboutUsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-20 bg-[var(--color-radical-red-50)] rounded-3xl shadow-xl">
      {/* Founders & Leaders Section on top */}
      <section className="mb-20">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-[var(--color-radical-red-700)]">
          Founders & Leaders
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:gap-16 max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">
          {/* Text Left */}
          <div className="md:w-1/2 order-1 md:order-1">
            <h3 className="text-4xl font-bold mb-6 text-[var(--color-radical-red-800)]">
              Ansh Bhardwaj
            </h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              Ansh is the visionary founder of SciTech Bulletins, combining a
              passion for technology with a strong commitment to making science
              accessible. With years of experience in tech journalism and
              content creation, Ansh leads our team to deliver content that
              educates, informs, and inspires. Outside work, Ansh loves hiking
              and exploring new innovations in AI.
            </p>
          </div>
          {/* Image Right */}
          <div className="md:w-1/2 order-2 md:order-2 flex justify-center">
            <img
              src={founderImage}
              alt="Founder Portrait"
              className="rounded-3xl shadow-2xl object-cover w-72 h-96"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Vision & Passion Section */}
      <section className="max-w-4xl mx-auto text-[var(--color-radical-red-900)] space-y-8 text-xl leading-relaxed font-medium">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[var(--color-radical-red-600)]">
          About SciTech Bulletins
        </h1>
        <p>
          <strong>Our Vision:</strong> At SciTech Bulletins, we aim to empower
          curious minds with the latest scientific and technological
          discoveries. Our vision is to create a platform where innovation meets
          clarity, inspiring enthusiasts and professionals alike.
        </p>
        <p>
          <strong>Our Passion:</strong> Driven by a passion for spreading
          knowledge, we curate and deliver insightful bulletins and blogs that
          break down complex topics into easily digestible content. We believe
          that everyone should have access to cutting-edge science and
          technology updates without jargon or barriers.
        </p>
        <p>
          Whether you’re an industry expert, a student, or simply someone
          curious about the future, SciTech Bulletins strives to be your trusted
          companion in the journey of discovery.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
