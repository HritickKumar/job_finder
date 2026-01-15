import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/mail.js";
import { generateOTP } from "../utils/otp.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email = req.body.email,
            phone,
            gender,
            userType,
            hobbies,
            selectedAgency,
        } = req.body;

        let profileImageUrl = "";
        if (req.files && req.files.profileImage) {
            const result = await uploadToCloudinary(req.files.profileImage[0].buffer, "profiles", "image");
            profileImageUrl = result.secure_url;
        }

        let resumeUrl = "";
        if (req.files && req.files.resume) {
            const result = await uploadToCloudinary(req.files.resume[0].buffer, "resumes", "raw");
            resumeUrl = result.secure_url;
        }

        if (userType === "JobSeeker" && req.files?.resume) {
            const doc = await uploadToCloudinary(
                req.files.resume[0].buffer,
                "resumes",
                "raw"
            );
            resumeUrl = doc.secure_url;
        }

        const otp = generateOTP();

        await User.create({
            firstName,
            lastName,
            email,
            phone,
            gender,
            userType,
            hobbies,
            selectedAgency: userType === "JobSeeker" ? selectedAgency : null,
            profileImage: profileImageUrl,
            resume: resumeUrl,
            otp,
            otpExpiry: Date.now() + 5 * 60 * 1000,
        });

        await transporter.sendMail({
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`,
        });
        console.log(otp);

        res.json({ message: "OTP sent to email" });
    } catch (err) {
        console.error(err); // This prints the error in your terminal/VS Code console
        res.status(500).json({
            message: "Registration failed",
            error: err.message,  // <--- Add this
            stack: err.stack     // <--- Add this
        });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp });

    if (!user || user.otpExpiry < Date.now())
        return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ message: "OTP verified" });
};

export const setPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { password: hash },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Password set successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error setting password" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({ message: "Invalid credentials (password wrong)" });
        }

        const token = jwt.sign(
            { id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, userType: user.userType });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};