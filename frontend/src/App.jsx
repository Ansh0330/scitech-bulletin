import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import BlogPage from "./pages/BlogPage";
import BulletinPage from "./pages/BulletinPage";
import AboutPage from "./pages/AboutPage";
import { AdminRoute } from "./components/common/AdminRoute";
import CreateBulletinPage from "./pages/CreateBulletinPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogsPage from "./pages/BlogsPage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="w-screen min-h-screen bg-neutral-50 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/bulletins" element={<BulletinPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/create-bulletin"
          element={
            <AdminRoute>
              <CreateBulletinPage />
            </AdminRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <AdminRoute>
              <CreateBlogPage />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
