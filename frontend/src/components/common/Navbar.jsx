import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useAuthStore } from "../../store/useAuthStore.js"; // adjust path as needed

const Navbar = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full">
      {/* Logo and Name  */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mt-8">
        <div className="flex items-center">
          {/* <Link to={"/"}>
            <img
              src={logo}
              alt="SciTech Bulletins Logo"
              className="h-25 w-25 rounded-full"
            />
          </Link> */}
          <Link to={"/"}>
            <h1 className="text-3xl font-bold tracking-tighter  ml-3">
              Sci<span className=" bg-clip-text text-transparent bg-gradient-to-b from-radical-red-400 to-radical-red-950">Tech</span> Bulletins
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <Link
            to={"/"}
            className="text-slate-700 font-semibold hover:font-bold hover:text-slate-900 hover:border-b-2 transition-all duration-200"
          >
            Home
          </Link>
          <Link
            to={"/bulletins"}
            className="text-slate-700 font-semibold hover:font-bold hover:text-slate-900 hover:border-b-2 transition-all duration-200"
          >
            Bulletins
          </Link>
          <Link
            to={"/blogs"}
            className="text-slate-700 font-semibold hover:font-bold hover:text-slate-900 hover:border-b-2 transition-all duration-200"
          >
            Blogs
          </Link>
          <Link
            to={"/about"}
            className="text-slate-700 font-semibold hover:font-bold hover:text-slate-900 hover:border-b-2 transition-all duration-200"
          >
            About us
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            <FaFacebook className="h-8 w-8 hover:scale-125 text-[#1877F2] transition-all duration-200" />
          </Link>
          <Link
            to={"https://wa.me/+918447823161"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="h-8 w-8 hover:scale-125 text-[#25D366] transition-all duration-200" />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/diksha-varma/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-8 w-8 hover:scale-125 text-[#0A66C2] transition-all duration-200" />
          </Link>
          <Link>
            <MdMail className="h-9 w-9 hover:scale-125 text-[#EA4335] transition-all duration-200" />
          </Link>

          {/* Conditional Login/Logout Button */}
          {authUser ? (
            <button
              onClick={handleLogout}
              className="ml-6 px-4 py-2 bg-[var(--color-radical-red-600)] text-white rounded-lg font-semibold hover:bg-[var(--color-radical-red-700)] transition duration-200"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/log-in")}
              className="ml-6 px-4 py-2 bg-[var(--color-radical-red-600)] text-white rounded-lg font-semibold hover:bg-[var(--color-radical-red-700)] transition duration-200"
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
