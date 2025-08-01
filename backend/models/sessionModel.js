import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    },
    json_file_url: {
        type: String, 
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Session =  mongoose.model("Session", sessionSchema);
export default Session;