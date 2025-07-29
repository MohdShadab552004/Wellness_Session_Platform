import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = () => {
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err)
    });
}
export default dbConnect;