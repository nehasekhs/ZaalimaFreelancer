import React, { useState } from "react";
import { motion } from "framer-motion";

// Mock freelancer data (replace with API later)
const mockFreelancer = {
  id: "fr_001",
  name: "Alex Johnson",
  title: "Senior Full-Stack Developer",
  location: "Remote • Berlin, DE",
  rating: 4.9,
  reviewsCount: 128,
  hourlyRate: 75,
  availability: "20-30 hrs/week",
  experienceYears: 7,
  photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400",
  bio: "I build reliable, well-tested web apps with React, Node.js, and TypeScript. I care about performance, DX, and maintainability.",
  skills: [
    "React", "Next.js", "Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL", "GraphQL", "Docker", "CI/CD"
  ],
  portfolio: [
    { id: "p1", title: "E‑commerce Platform", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600" },
    { id: "p2", title: "Fintech Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" },
    { id: "p3", title: "SaaS Analytics", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600" },
  ],
  reviews: [
    { id: "r1", author: "Acme Inc.", rating: 5, text: "Excellent delivery and communication!" },
    { id: "r2", author: "Nova Labs", rating: 5, text: "Solid architecture and testing discipline." },
    { id: "r3", author: "GreenTech", rating: 4.5, text: "Great performance optimizations." },
  ]
};

// Subcomponents
function FreelancerProfile({ freelancer, onHire }) {
  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
      <img src={freelancer.photo} alt={freelancer.name} className="w-28 h-28 rounded-xl object-cover border border-gray-700" />
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{freelancer.name}</h1>
            <p className="text-pink-300 font-medium">{freelancer.title}</p>
            <p className="text-gray-400 text-sm mt-1">{freelancer.location}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-300">
              <span>★ {freelancer.rating} ({freelancer.reviewsCount})</span>
              <span>•</span>
              <span>${freelancer.hourlyRate}/hr</span>
              <span>•</span>
              <span>{freelancer.availability}</span>
              <span>•</span>
              <span>{freelancer.experienceYears}+ yrs</span>
            </div>
          </div>
          <button onClick={onHire} className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold">
            Hire Freelancer
          </button>
        </div>
      </div>
    </div>
  );
}

function Tabs({ active, onChange }) {
  const items = ["Overview", "Skills & Expertise", "Portfolio", "Reviews & Ratings"];
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`px-4 py-2 rounded-lg text-sm ${active === item ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function OverviewTab({ freelancer }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 text-gray-300 leading-relaxed">
      {freelancer.bio}
    </div>
  );
}

function SkillsTab({ freelancer }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 flex flex-wrap gap-2">
      {freelancer.skills.map((s) => (
        <span key={s} className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 border border-gray-700">{s}</span>
      ))}
    </div>
  );
}

function PortfolioTab({ freelancer }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {freelancer.portfolio.map((p) => (
        <div key={p.id} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
          <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
          <div className="p-4 text-white font-medium">{p.title}</div>
        </div>
      ))}
    </div>
  );
}

function ReviewsTab({ freelancer }) {
  return (
    <div className="space-y-3">
      {freelancer.reviews.map((r) => (
        <div key={r.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">{r.author}</div>
            <div className="text-yellow-400">★ {r.rating}</div>
          </div>
          <p className="text-gray-300 text-sm mt-1">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

// Hire Flow Steps
function ProjectForm({ value, onChange, onNext }) {
  const handle = (e) => onChange({ ...value, [e.target.name]: e.target.value });
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 space-y-4">
      <div>
        <label className="block text-sm text-pink-300 mb-2">Project Name</label>
        <input name="name" value={value.name} onChange={handle} className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" placeholder="e.g. Marketing site revamp" />
      </div>
      <div>
        <label className="block text-sm text-pink-300 mb-2">Description</label>
        <textarea name="description" value={value.description} onChange={handle} rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" placeholder="Describe scope, deliverables, expectations" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-pink-300 mb-2">Budget ($)</label>
          <input name="budget" type="number" value={value.budget} onChange={handle} className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" placeholder="e.g. 2000" />
        </div>
        <div>
          <label className="block text-sm text-pink-300 mb-2">Timeline</label>
          <input name="timeline" value={value.timeline} onChange={handle} className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white" placeholder="e.g. 4 weeks" />
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={onNext} className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold">Continue</button>
      </div>
    </div>
  );
}

function ContractSummary({ project, freelancer, onBack, onNext }) {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 space-y-4 text-gray-200">
      <h3 className="text-white text-xl font-semibold">Confirm Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Project</div>
          <div className="font-semibold text-white">{project.name || 'Untitled Project'}</div>
          <div className="text-sm mt-1">Budget: ${project.budget || '—'}</div>
          <div className="text-sm">Timeline: {project.timeline || '—'}</div>
          <div className="text-sm mt-2 text-gray-300">{project.description || 'No description provided.'}</div>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Freelancer</div>
          <div className="font-semibold text-white">{freelancer.name}</div>
          <div className="text-sm">{freelancer.title}</div>
          <div className="text-sm mt-1">Rate: ${freelancer.hourlyRate}/hr</div>
          <div className="text-sm">Availability: {freelancer.availability}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">Back</button>
        <button onClick={onNext} className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold">Confirm</button>
      </div>
    </div>
  );
}

function PaymentPlaceholder({ onBack, onNext }) {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 text-gray-200">
      <h3 className="text-white text-xl font-semibold mb-2">Payment</h3>
      <p className="text-gray-300 mb-6">This is a mock payment step. Click below to proceed.</p>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">Back</button>
        <button onClick={onNext} className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold">Proceed to Payment</button>
      </div>
    </div>
  );
}

function SuccessMessage({ freelancer, onReset }) {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-8 text-center text-gray-200">
      <div className="text-5xl mb-4">🎉</div>
      <h3 className="text-white text-2xl font-bold mb-2">You have successfully hired {freelancer.name} for your project!</h3>
      <p className="text-gray-300 mb-6">We’ll notify the freelancer and open a Project Room for collaboration.</p>
      <button onClick={onReset} className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold">Back to profile</button>
    </div>
  );
}

export default function HireFreelancer() {
  const [freelancer] = useState(mockFreelancer);
  const [activeTab, setActiveTab] = useState("Overview");
  const [step, setStep] = useState(0); // 0 = profile, 1..4 = steps
  const [project, setProject] = useState({ name: "", description: "", budget: "", timeline: "" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FreelancerProfile freelancer={freelancer} onHire={() => setStep(1)} />
        </motion.div>

        {step === 0 && (
          <>
            <Tabs active={activeTab} onChange={setActiveTab} />
            <div className="mt-4">
              {activeTab === "Overview" && <OverviewTab freelancer={freelancer} />}
              {activeTab === "Skills & Expertise" && <SkillsTab freelancer={freelancer} />}
              {activeTab === "Portfolio" && <PortfolioTab freelancer={freelancer} />}
              {activeTab === "Reviews & Ratings" && <ReviewsTab freelancer={freelancer} />}
            </div>
          </>
        )}

        {step === 1 && (
          <ProjectForm value={project} onChange={setProject} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <ContractSummary project={project} freelancer={freelancer} onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 3 && (
          <PaymentPlaceholder onBack={() => setStep(2)} onNext={() => setStep(4)} />
        )}
        {step === 4 && (
          <SuccessMessage freelancer={freelancer} onReset={() => { setStep(0); setProject({ name: "", description: "", budget: "", timeline: "" }); }} />
        )}
      </div>
    </div>
  );
}
