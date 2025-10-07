import "./FindWork.css";

const jobs = [
  {
    id: 1,
    title: "Build a React Landing Page",
    description: "Need a responsive landing page using React and Tailwind.",
    budget: "$300"
  },
  {
    id: 2,
    title: "API Integration",
    description: "Integrate payment API into existing Node.js backend.",
    budget: "$150"
  }
];

export default function FindWork() {
  return (
    <div className="findwork-page">
      <h1>Find Work</h1>
      <p>Browse and apply for jobs posted by clients.</p>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <span className="budget">{job.budget}</span>
            <button className="apply-btn">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}