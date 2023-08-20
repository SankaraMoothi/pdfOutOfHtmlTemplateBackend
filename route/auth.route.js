import express from "express";
import {
  login,
  logout,
  register,
  forgotpassword,
  resetpassword,
  generateOTP,
} from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/otp", generateOTP);
router.post("/logout", logout);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
export default router;
