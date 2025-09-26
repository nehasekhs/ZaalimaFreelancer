import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function MyAccount() {
  const { user, token, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  // Update profile
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/me",
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser(res.data); // 👈 context update
      alert("✅ Profile updated!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
    }
  };

  if (!profile) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>

      <input
        className="p-2 text-black rounded mb-4 block"
        type="text"
        value={profile.name || ""}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />

      <button
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}
