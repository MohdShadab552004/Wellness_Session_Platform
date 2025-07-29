import express from "express";
import {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveDraft,
  publishSession,
} from "../controllers/sessionController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const sessionRoute = express.Router();

// Public
sessionRoute.get("/", getPublicSessions);

// Protected
sessionRoute.get("/my-sessions", authenticate, getMySessions);
sessionRoute.get("/my-sessions/:id", authenticate, getSingleSession);
sessionRoute.post("/my-sessions/save-draft", authenticate, saveDraft);
sessionRoute.post("/my-sessions/publish", authenticate, publishSession);

export default sessionRoute;
