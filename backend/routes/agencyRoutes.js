import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
    getJobSeekers,
    approve,
    decline,
} from "../controllers/agencyController.js";


const router = Router();

router.get("/job-seekers", authMiddleware, roleMiddleware("Agency"), getJobSeekers);
router.post("/approve/:id", authMiddleware, roleMiddleware("Agency"), approve);
router.post("/decline/:id", authMiddleware, roleMiddleware("Agency"), decline);

export default router;
