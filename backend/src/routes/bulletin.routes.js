import express from "express";
import {
  getAllBulletins,
  getLatestBulletins,
  createBulletin,
  editBulletin,
  deleteBulletin,
} from "../controllers/bulletin.controller.js";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET all bulletins
router.get("/get-all-bulletins", getAllBulletins);

// GET latest bulletins
router.get("/get-latest-bulletins", getLatestBulletins);

// CREATE a new bulletin (admin only)
router.post("/create-bulletin", isLoggedIn, isAdmin, createBulletin);

// EDIT a bulletin by ID (admin only)
router.put("/edit-bulletin/:id", isLoggedIn, isAdmin, editBulletin);

// DELETE a bulletin by ID (admin only)
router.delete("/delete-bulletin/:id", isLoggedIn, isAdmin, deleteBulletin);

export default router;
