"use client";
import { useState } from "react";
import API, { setAuthToken } from "@/services/api";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await API.post("/auth/login", { email, password });

      const token = res.data.token;
      const decoded: any = JSON.parse(atob(token.split(".")[1]));

      if (decoded.role !== "admin") {
        setError("Access denied. Admin only");
        return;
      }

      localStorage.setItem("token", token);
      setAuthToken(token);

      router.push("/admin");
    } catch {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "420px" }}>
        <h4 className="fw-bold mb-1">
          Admin{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Access
          </span>
        </h4>

        <p className="text-muted mb-3">
          Only authorized admins can access
        </p>
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-danger w-100 py-2"
          onClick={handleLogin}
        >
          LOGIN AS ADMIN
        </button>

        <p className="mt-3 text-center mb-1">
          Go back to{" "}
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            User Login
          </span>
        </p>

        <p
          className="text-center text-muted small"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          ← Back to Home
        </p>
      </div>
    </div>
  );
}