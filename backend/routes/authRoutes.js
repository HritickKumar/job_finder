import { Router } from "express";
import {
    register,
    verifyOtp,
    setPassword,
    login,
} from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();
router.post(
    "/register",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "resume", maxCount: 1 },
    ]),
    register
);

router.post("/verify-otp", verifyOtp);
router.post("/set-password", setPassword);
router.post("/login", login);

export default router;
