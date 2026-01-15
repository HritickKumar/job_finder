import Request from "../models/Request.js";

export const getJobSeekers = async (req, res) => {
    const requests = await Request.find({ agency: req.user.id }).populate(
        "jobSeeker"
    );
    res.json(requests);
};

export const approve = async (req, res) => {
    await Request.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.json({ message: "Approved" });
};

export const decline = async (req, res) => {
    await Request.findByIdAndUpdate(req.params.id, { status: "Declined" });
    res.json({ message: "Declined" });
};
