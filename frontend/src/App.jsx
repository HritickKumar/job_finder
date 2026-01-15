import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import SetPassword from "./pages/SetPassword";
import Login from "./pages/Login";
import AgencyDashboard from "./pages/AgencyDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/agency"
          element={
            <ProtectedRoute role="Agency">
              <AgencyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobseeker"
          element={
            <ProtectedRoute role="JobSeeker">
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
