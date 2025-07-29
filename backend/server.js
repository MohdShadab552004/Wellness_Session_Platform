import express from "express";
import dbConnect from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import sessionRoute from "./routes/sessionRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/sessions", sessionRoute);


const PORT = process.env.PORT || 5000;
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});