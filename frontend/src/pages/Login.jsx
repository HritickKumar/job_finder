import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userType", res.data.userType);
            if (res.data.userType === "Agency") {
                navigate("/agency");
            } else if (res.data.userType === "JobSeeker") {
                navigate("/jobseeker");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Please enter your details to sign in.</p>

                <form onSubmit={submit} className="login-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="#">Create one</a>
                </p>
            </div>
        </div>
    );
}