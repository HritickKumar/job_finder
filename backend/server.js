import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/auth", (await import('./routes/authRoutes.js')).default);
app.use("/api/jobseeker", (await import('./routes/jobseekerRoutes.js')).default);
app.use("/api/agency", (await import('./routes/agencyRoutes.js')).default);
app.use("/api/chat", (await import("./routes/chatRoutes.js")).default);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});