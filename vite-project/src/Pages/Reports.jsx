import "./Reports.css";

export default function Reports() {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <p>See analytics of your earnings and performance.</p>
      <div className="report-card">
        <h2>Earnings This Month: $450</h2>
        <p>Jobs Completed: 3</p>
        <p>New Clients: 2</p>
      </div>
    </div>
  );
}