import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);

export default authRoute;