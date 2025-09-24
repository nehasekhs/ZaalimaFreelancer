import "./Proposals.css";

const proposals = [
  { id: 1, job: "React Landing Page", status: "Pending" },
  { id: 2, job: "API Integration", status: "Accepted" }
];

export default function Proposals() {
  const handleEdit = (id) => alert("Edit proposal " + id);
  const handleDelete = (id) => alert("Delete proposal " + id);

  return (
    <div className="proposals-page">
      <h1>Proposals</h1>
      <p>Manage your job proposals.</p>
      <div className="proposal-list">
        {proposals.map((p) => (
          <div key={p.id} className="proposal-card">
            <h2>{p.job}</h2>
            <span className="status">{p.status}</span>
            <div className="proposal-buttons">
              <button onClick={() => handleEdit(p.id)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}