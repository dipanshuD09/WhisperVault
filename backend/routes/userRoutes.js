import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  recoverPassword,
  resetPassword
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").put(protect, updateUserProfile);
router.post("/forgotpass", recoverPassword);
router.put("/resetpass", resetPassword)

export default router;
