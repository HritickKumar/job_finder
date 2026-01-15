import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function JobSeekerDashboard() {
    const [agency, setAgency] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/jobseeker/agency")
            .then((res) => {
                setAgency(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loader">Loading your dashboard...</div>;

    if (!agency) return (
        <div className="box">
            <h2>No Agency Selected</h2>
            <p>Please contact support or update your profile to link an agency.</p>
        </div>
    );

    return (
        <div className="list">
            <h2>Your Agency</h2>
            <div className="card">
                <p><strong>Name:</strong> {agency.firstName} {agency.lastName}</p>
                <p><strong>Email:</strong> {agency.email}</p>
                <p><strong>Phone:</strong> {agency.phone || "N/A"}</p>

                <Link to={`/chat/${agency._id}`} className="btn">
                    Message Agency
                </Link>
            </div>
        </div>
    );
}

export default JobSeekerDashboard; // Add this explicitly at the end