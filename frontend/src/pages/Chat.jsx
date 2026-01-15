import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Chat() {
    const { id } = useParams();
    const [text, setText] = useState("");

    const send = async () => {
        await api.post("/chat/send", { to: id, text });
        setText("");
    };

    return (
        <div className="container">
            <h2>Chat</h2>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={send}>Send</button>
        </div>
    );
}
