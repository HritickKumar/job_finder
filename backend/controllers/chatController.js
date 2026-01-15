import Chat from "../models/Chat.js";
import Request from "../models/Request.js";

export const sendMessage = async (req, res) => {
    const { to, text } = req.body;

    const approved = await Request.findOne({
        $or: [
            { jobSeeker: req.user.id, agency: to, status: "Approved" },
            { agency: req.user.id, jobSeeker: to, status: "Approved" },
        ],
    });

    if (!approved)
        return res.status(403).json({ message: "Chat not allowed" });

    let chat = await Chat.findOne({
        participants: { $all: [req.user.id, to] },
    });

    if (!chat) {
        chat = await Chat.create({
            participants: [req.user.id, to],
            messages: [],
        });
    }

    chat.messages.push({ sender: req.user.id, text });
    await chat.save();

    res.json(chat);
};
