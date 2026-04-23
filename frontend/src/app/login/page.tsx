"use client";
import { useState } from "react";
import API, { setAuthToken } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await API.post("/auth/login", form);
      const token = res.data.token;

      localStorage.setItem("token", token);
      setAuthToken(token);

      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "420px" }}>
        
        <h4 className="fw-bold mb-1">
          Welcome{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Back
          </span>
        </h4>

        <p className="text-muted mb-3">
          Please enter your details to log in
        </p>

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            className="form-control"
            placeholder="john@example.com"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Your password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>
        <button
          className="btn btn-primary w-100 py-2"
          onClick={handleLogin}
        >
          LOGIN
        </button>

        <p className="mt-3 text-center mb-1">
          Don’t have an account?{" "}
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/register")}
          >
            Sign Up
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