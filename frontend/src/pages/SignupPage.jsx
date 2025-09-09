import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("SIGNUP DATA ---->", data);
      navigate("/log-in");
    } catch (error) {
      console.log("ERROR IN SIGNUP (SignupPage)", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 p-6 sm:p-12">
      <div className="w-full -mt-20 max-w-md space-y-8 bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <h1 className="text-2xl font-semibold text-neutral-900 mt-2">
              Welcome
            </h1>
            <p className="text-neutral-600">Sign Up to your account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-neutral-700">
                Name
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Code className="h-5 w-5" />
              </div>
              <input
                type="text"
                {...register("name")}
                className={`w-full bg-white text-neutral-900 border border-neutral-300 rounded-md px-3 py-2 pl-10 placeholder-neutral-400 transition-colors focus:outline-none focus:border-[var(--color-radical-red-500)] focus:ring-1 focus:ring-[var(--color-radical-red-300)] ${
                  errors.name
                    ? "border-[var(--color-radical-red-600)] placeholder-[var(--color-radical-red-600)] text-[var(--color-radical-red-900)]"
                    : ""
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-[var(--color-radical-red-600)] text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-neutral-700">
                Email
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                {...register("email")}
                className={`w-full bg-white text-neutral-900 border border-neutral-300 rounded-md px-3 py-2 pl-10 placeholder-neutral-400 transition-colors focus:outline-none focus:border-[var(--color-radical-red-500)] focus:ring-1 focus:ring-[var(--color-radical-red-300)] ${
                  errors.email
                    ? "border-[var(--color-radical-red-600)] placeholder-[var(--color-radical-red-600)] text-[var(--color-radical-red-900)]"
                    : ""
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-[var(--color-radical-red-600)] text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-neutral-700">
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full bg-white text-neutral-900 border border-neutral-300 rounded-md px-3 py-2 pl-10 placeholder-neutral-400 transition-colors focus:outline-none focus:border-[var(--color-radical-red-500)] focus:ring-1 focus:ring-[var(--color-radical-red-300)] ${
                  errors.password
                    ? "border-[var(--color-radical-red-600)] placeholder-[var(--color-radical-red-600)] text-[var(--color-radical-red-900)]"
                    : ""
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-[var(--color-radical-red-500)] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[var(--color-radical-red-600)] text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-[var(--color-radical-red-500)] text-white font-semibold py-2 hover:bg-[var(--color-radical-red-600)] transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-neutral-600">
            Already have an account?{" "}
            <Link
              to="/log-in"
              className="text-[var(--color-radical-red-500)] hover:text-[var(--color-radical-red-700)] font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
