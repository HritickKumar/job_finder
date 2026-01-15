import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    userType: { type: String, enum: ["JobSeeker", "Agency"] },
    hobbies: [{ type: String }],
    profileImage: { type: String },
    resume: { type: String },
    selectedAgency: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    otp: { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
    password: { type: String }
});
export default mongoose.model("User", userSchema);