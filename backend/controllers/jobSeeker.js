import User from "../models/User.js";

export const getAgency = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("selectedAgency");

        if (!user || !user.selectedAgency) {
            return res.status(404).json({ message: "No agency selected" });
        }

        res.json(user.selectedAgency);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};