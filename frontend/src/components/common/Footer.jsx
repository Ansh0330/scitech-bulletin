import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#fff0f1] text-neutral-800 py-10 md:py-12 mt-28">
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-12">
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <Link
            to="/"
            className="font-serif italic font-bold text-3xl sm:text-4xl text-[var(--color-radical-red-400)] tracking-wide"
          >
            SciTech Bulletins
          </Link>
          <p className="font-sans text-neutral-900 text-sm md:text-base leading-relaxed mt-2 max-w-xs">
            Where curiosity meets clarity.
          </p>
          <p className="font-sans text-neutral-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} SciTech Bulletins. All rights
            reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-4">
          <h3 className="font-sans text-lg font-semibold text-neutral-700 mb-2">
            Quick Links
          </h3>
          <Link
            to="/"
            className="font-sans text-neutral-600 hover:text-[var(--color-radical-red-500)] transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="font-sans text-neutral-600 hover:text-[var(--color-radical-red-500)] transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="font-sans text-neutral-600 hover:text-[var(--color-radical-red-500)] transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="font-sans text-neutral-600 hover:text-[var(--color-radical-red-500)] transition-colors duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Social Connect */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-4">
          <h3 className="font-sans text-lg font-semibold text-neutral-700 mb-2">
            Connect
          </h3>
          <div className="flex gap-4 items-center">
            <Link to="/" aria-label="Facebook">
              <FaFacebook className="h-8 w-8 text-[#1877F2] hover:scale-125 transition-transform duration-200" />
            </Link>
            <Link
              to="https://wa.me/+918287123927"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-8 w-8 text-[#25D366] hover:scale-125 transition-transform duration-200" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/ansh-kotnala3003/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-8 w-8 text-[#0A66C2] hover:scale-125 transition-transform duration-200" />
            </Link>
            <Link to="mailto:someone@example.com" aria-label="Email">
              <MdMail className="h-8 w-8 text-[var(--color-radical-red-500)] hover:scale-125 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-neutral-200 text-center">
        <p className="font-sans text-neutral-600 flex items-center justify-center gap-1">
          Made with ❤️ By{" "}
          <Link
            to="https://twitter.com/Anshdotdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-radical-red-500)] hover:text-[var(--color-radical-red-700)] font-semibold transition-colors duration-200 flex items-center gap-1"
          >
            Ansh <FaXTwitter className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
