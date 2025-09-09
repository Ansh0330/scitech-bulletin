import express from "express";
import {
  getMe,
  login,
  logOut,
  registerUser,
  verifyUser,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/me", isLoggedIn, getMe);
router.get("/logout", isLoggedIn, logOut);
router.get("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword)

export default router;
