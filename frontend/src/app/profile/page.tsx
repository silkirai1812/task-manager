"use client";
import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setUser(res.data);
      setLoading(false);
    } catch {
      setMessage("Error fetching profile");
    }
  };

  const updateProfile = async () => {
    try {
      await API.put("/users/profile", {
        name: user.name,
        email: user.email,
      });

      setMessage("Profile updated successfully");
    } catch {
      setMessage("Update failed");
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="card p-4 shadow-lg" style={{ width: "450px" }}>

          <div className="text-center mb-3">
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#0d6efd",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                margin: "auto",
              }}
            >
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>

            <h5 className="mt-2 mb-0">{user.name}</h5>
            <small className="text-muted">{user.email}</small>
          </div>

          {message && (
            <div className="alert alert-info py-2 text-center">
              {message}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={user.name || ""}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={user.email || ""}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              className="form-control bg-light"
              value={user.role || ""}
              disabled
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={updateProfile}
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
}