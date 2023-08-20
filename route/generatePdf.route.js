import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  ReUseTemplate,
  getPdf,
  sampleGenerater,
} from "../controllers/generatePdf.controller.js";

const router = express.Router();
router.post("/", verifyToken, sampleGenerater);
router.post("/:id", verifyToken, ReUseTemplate);
router.post("/pdf/:id", verifyToken, getPdf);

export default router;
