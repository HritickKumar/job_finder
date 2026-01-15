import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async () => {
        try {
            setError("");
            await api.post("/auth/set-password", data);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="p-10 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Set Password</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="flex flex-col gap-4">
                <input
                    className="border p-2"
                    placeholder="Email"
                    onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                />
                <input
                    className="border p-2"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={submit}
                >
                    Save Password
                </button>
            </div>
        </div>
    );
}