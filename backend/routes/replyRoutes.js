import express from "express";
import {
  getThreadReplies,
  getReplyReplies,
  CreateReply,
  DeleteReply,
  UpdateReply,
} from "../controllers/replyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/thread").get(getThreadReplies).post(protect, CreateReply);
router.route("/reply").get(getReplyReplies);
router.route("/reply/:id").delete(protect, DeleteReply).put(protect, UpdateReply);

export default router;
