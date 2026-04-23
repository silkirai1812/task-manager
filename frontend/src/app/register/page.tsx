"use client";
import { useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setError("");
      setSuccess("");

      await API.post("/auth/register", form);

      setSuccess("Account created successfully");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "420px" }}>

        <h4 className="fw-bold mb-1">
          Create{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Account
          </span>
        </h4>

        <p className="text-muted mb-3">
          Sign up to get started
        </p>

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2 text-center">
            {success}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            placeholder="Your Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

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
          onClick={handleRegister}
        >
          REGISTER
        </button>
        <p className="mt-3 text-center mb-1">
          Already have an account?{" "}
          <span
            className="text-primary fw-medium"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            Login
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