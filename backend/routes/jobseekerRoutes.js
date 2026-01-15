import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import { getAgency } from '../controllers/jobSeeker.js';

const router = Router();

router.get("/agency", authMiddleware, roleMiddleware("JobSeeker"), getAgency);

export default router;