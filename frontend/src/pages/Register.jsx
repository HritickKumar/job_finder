import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ hobbies: [] });
    const navigate = useNavigate();

    const hobbyList = ["Sports", "Dance", "Reading", "Singing"];

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (e) =>
        setForm({ ...form, [e.target.name]: e.target.files[0] });

    const handleHobbyChange = (hobby) => {
        const updatedHobbies = form.hobbies.includes(hobby)
            ? form.hobbies.filter((h) => h !== hobby)
            : [...form.hobbies, hobby];
        setForm({ ...form, hobbies: updatedHobbies });
    };

    const submit = async () => {
        try {
            const data = new FormData();

            Object.keys(form).forEach((key) => {
                if (key === "hobbies") {
                    form.hobbies.forEach((h) => data.append("hobbies", h));
                } else {
                    data.append(key, form[key]);
                }
            });

            await api.post("/auth/register", data);
            navigate("/verify-otp");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <input name="firstName" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" type="number" placeholder="Phone" onChange={handleChange} />

            <select name="userType" onChange={handleChange}>
                <option value="">Select User Type</option>
                <option value="JobSeeker">Job Seeker</option>
                <option value="Agency">Agency</option>
            </select>

            <div style={{ margin: "10px 0" }}>
                <p>Hobbies:</p>
                {hobbyList.map((h) => (
                    <label key={h} style={{ marginRight: "10px" }}>
                        <input type="checkbox" onChange={() => handleHobbyChange(h)} /> {h}
                    </label>
                ))}
            </div>

            <p>Profile Image:</p>
            <input type="file" name="profileImage" onChange={handleFile} />

            {form.userType === "JobSeeker" && (
                <>
                    <p>Resume:</p>
                    <input type="file" name="resume" onChange={handleFile} />
                    <input name="selectedAgency" placeholder="Agency ID" onChange={handleChange} />
                </>
            )}

            <button onClick={submit} style={{ display: "block", marginTop: "20px" }}>Register</button>
        </div>
    );
}