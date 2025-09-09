import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState("Verifying your email...");

  const handleVerification = async () => {
    try {
      const res = await axiosInstance.get(`/auth/verify/${token}`);

      // Check success flag explicitly (assuming backend sends success: true/false)
      if (res.data.success) {
        setStatus("success");
        setMessage(res.data.message || "Your email has been verified!");
      } else {
        // Handle case where response is 2xx but verification not successful
        setStatus("error");
        setMessage(res.data.message || "Verification failed.");
      }
      setTimeout(() => {
        navigate("/log-in");
      }, 2500);
    } catch (error) {
      // Extract meaningful error message safely
      const errorMessage =
        error?.response?.data?.message ||
        "Verification failed. The token may be invalid or expired.";
      setStatus("error");
      setMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    handleVerification();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
        {status === "verifying" && (
          <div className="w-16 h-16 border-4 border-[var(--color-radical-red-300)] border-t-transparent rounded-full animate-spin mb-6"></div>
        )}
        {status === "success" && (
          <FaCheckCircle className="h-16 w-16 text-green-500 mb-6" />
        )}
        {status === "error" && (
          <FaTimesCircle className="h-16 w-16 text-[var(--color-radical-red-600)] mb-6" />
        )}
        <h1
          className={`text-2xl font-bold text-center mb-2 ${
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-[var(--color-radical-red-700)]"
              : "text-neutral-800"
          }`}
        >
          {status === "verifying"
            ? "Verifying Email..."
            : status === "success"
            ? "Verification Successful!"
            : "Verification Failed"}
        </h1>
        <p className="text-neutral-700 text-center mb-4">{message}</p>
        {status === "success" && (
          <p className="text-sm text-neutral-500 text-center">
            Redirecting you to the login page...
          </p>
        )}
        {status === "error" && (
          <Link
            to={"/sign-up"}
            className="mt-6 inline-block font-medium px-5 py-2 rounded border border-[var(--color-radical-red-400)] text-[var(--color-radical-red-500)] hover:bg-[var(--color-radical-red-50)] transition"
          >
            Go to Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
