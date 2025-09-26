import { useState, useEffect } from "react";

export default function UpdateProfile() {
  const [form, setForm] = useState({
    _id: "",
    profilePic: "",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    city: "",
    country: "",
    upi: "",
    bankAccount: "",
  });

  const [previewPic, setPreviewPic] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      alert("You must be logged in to update profile.");
      setLoading(false);
      return;
    }

    // Fetch user details
    fetch("http://localhost:5000/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          _id: data._id,
          profilePic: data.profilePic || "",
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          dob: data.dob || "",
          city: data.city || "",
          country: data.country || "",
          upi: data.upi || "",
          bankAccount: data.bankAccount || "",
        });
        setPreviewPic(data.profilePic || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load user details");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profilePic: reader.result });
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setForm({ ...form, profilePic: "" });
    setPreviewPic("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Profile updated successfully!");
        // Optionally update localStorage
        localStorage.setItem("user", JSON.stringify({ ...data, token }));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile.");
      });
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="bg-gray-950 min-h-screen p-6 flex justify-center">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-3xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-indigo-400 text-center">Update Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-2">
          {previewPic ? (
            <img
              src={previewPic}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-2xl border-4 border-indigo-500">
              {form.name ? form.name[0] : "U"}
            </div>
          )}
          <div className="flex gap-2">
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-gray-200" />
            {previewPic && (
              <button
                type="button"
                onClick={removeProfilePic}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="space-y-4">
            <input type="text" name="upi" value={form.upi} onChange={handleChange} placeholder="UPI ID" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" name="bankAccount" value={form.bankAccount} onChange={handleChange} placeholder="Bank Account Number" className="w-full px-4 py-2 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
