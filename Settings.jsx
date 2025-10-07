import "./Settings.css";

export default function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p>Manage your account preferences and security.</p>
      <div className="settings-card">
        <label>
          <input type="checkbox" /> Email Notifications
        </label>
        <label>
          <input type="checkbox" /> Two-Factor Authentication
        </label>
        <label>
          Change Password
          <input type="password" placeholder="New Password" />
        </label>
        <button className="save-btn">Save Settings</button>
      </div>
    </div>
  );
}