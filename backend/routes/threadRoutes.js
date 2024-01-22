import express from "express";
import {
  getThreadById,
  getThreads,
  CreateThread,
  DeleteThread,
  UpdateThread,
  getAllThreads,
} from "../controllers/threadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/user").get(protect, getThreads).post(protect, CreateThread);
router.route("/").get(getAllThreads);
router
  .route("/:id")
  .get(getThreadById)
  .delete(protect, DeleteThread)
  .put(protect, UpdateThread);

export default router;
