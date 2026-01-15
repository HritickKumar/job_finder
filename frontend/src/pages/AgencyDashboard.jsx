import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function AgencyDashboard() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        api.get("/agency/job-seekers").then((res) => setRequests(res.data));
    }, []);

    return (
        <div className="list">
            <h2>Job Seekers</h2>
            {requests.map((r) => (
                <div key={r._id} className="card">
                    <p>{r.jobSeeker.firstName}</p>
                    <p>Status: {r.status}</p>
                    <button onClick={() => api.post(`/agency/approve/${r._id}`)}>Approve</button>
                    <button onClick={() => api.post(`/agency/decline/${r._id}`)}>Decline</button>
                    {r.status === "Approved" && <Link to={`/chat/${r.jobSeeker._id}`}>Chat</Link>}
                </div>
            ))}
        </div>
    );
}
