import mongoose from "mongoose";
const requestSchema = new mongoose.Schema(
    {
        jobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        agency: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);
export default mongoose.model("Request", requestSchema);