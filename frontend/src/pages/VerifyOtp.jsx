import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const submit = async () => {
        await api.post("/auth/verify-otp", data);
        navigate("/set-password");
    };

    return (
        <div className="container">
            <h2>Verify OTP</h2>
            <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
            <input placeholder="OTP" onChange={(e) => setData({ ...data, otp: e.target.value })} />
            <button onClick={submit}>Verify</button>
        </div>
    );
}
