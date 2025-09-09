import React from "react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div className=" relative max-w-5xl mt-12 mx-auto p-4 text-center flex flex-col items-center space-y-3">
      <h1 className="mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
        Science &{" "}
        <span className="mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-radical-red-400 to-radical-red-950">
          Tech
        </span>{" "}
        in a snap!
      </h1>
      <p className="mt-4 max-w-2xl leading-normal tracking-wide font-normal text-base md:text-lg text-neutral-800">
        Stay curious, stay informed. Dive into short, engaging bites of
        scientific discovery, innovation, and technology—delivered with clarity
        and speed.
      </p>
      <div className="flex items-center gap-4 mt-3">
        <Link className="px-6 py-3 bg-radical-red-400 hover:bg-radical-red-500 transition-all duration-200  text-white  rounded-xl">
          Read Now
        </Link>
        <Link
          to={"/sign-up"}
          className="px-6 py-2 border-radical-red-500 border-2 text-radical-red-500 rounded-xl hover:bg-radical-red-500 hover:text-white transition-all duration-200"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
