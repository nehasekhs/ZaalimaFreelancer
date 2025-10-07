import express from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";

const router = express.Router();

// Auth
router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
