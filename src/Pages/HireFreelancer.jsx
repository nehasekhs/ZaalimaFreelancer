import React, { useState } from "react";
import { motion } from "framer-motion";
import CollaborationTools from "../components/CollaborationTools";
import { Link } from "react-router-dom";

const mockFreelancer = [
  {
    id: "fr_001",
    name: "Alex Johnson",
    title: "Full Stack Developer & UI/UX Designer",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewsCount: 127,
    hourlyRate: 75,
    availability: "Available",
    experienceYears: 6,
    responseTime: "2 hours",
    projectsCompleted: 89,
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400",
    bio: "Passionate full-stack developer with 6+ years of experience building scalable web applications. I specialize in React, Node.js, and modern web technologies. I love creating beautiful, functional user experiences that solve real problems.",
    skills: ["React.js", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker"],
    portfolio: [
      { id: "p1", title: "E-commerce Platform", subtitle: "React + Node.js full-stack solution", tech: ["React", "Node.js", "Stripe"], client: "TechCorp", date: "2024", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600" },
      { id: "p2", title: "SaaS Dashboard", subtitle: "Data analytics dashboard", tech: ["Vue", "D3.js"], client: "DataInsights", date: "2023", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" }
    ],
    reviews: [
      { id: "r1", author: "Sarah Chen", rating: 5, text: "Excellent and reliable developer!" },
      { id: "r2", author: "Michael Rodriguez", rating: 5, text: "Clean UI and well-structured code!" }
    ],
    languages: [{ name: "English", level: "Native" }, { name: "Spanish", level: "Conversational" }],
    education: [{ degree: "B.Sc. Computer Science", school: "Stanford University", year: "2018" }],
    certifications: ["AWS Developer", "MongoDB Certified Developer"],
    demoSessions: [{ sessionId: "ds_001", title: "Live Project Demo" }]
  },

  {
    id: "fr_002",
    name: "Sophia Martinez",
    title: "Creative Director & Graphic Designer",
    location: "Remote • Madrid, ES",
    rating: 4.8,
    reviewsCount: 98,
    hourlyRate: 65,
    availability: "20-30 hrs/week",
    experienceYears: 8,
    responseTime: "3 hours",
    projectsCompleted: 120,
    photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
    bio: "Award-winning creative designer specializing in branding, UI/UX, and illustration. I help companies visually communicate their brand identity through clean and memorable designs.",
    skills: ["Adobe Photoshop", "Illustrator", "Figma", "After Effects", "UI/UX", "Branding", "Motion Graphics"],
    portfolio: [
      { id: "p1", title: "Brand Identity for CoffeeCo", subtitle: "Logo + packaging", tech: ["Illustrator", "Figma"], client: "CoffeeCo", date: "2023", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600" },
      { id: "p2", title: "Mobile App UI", subtitle: "Fitness app interface", tech: ["Figma"], client: "FitLife", date: "2024", image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600" }
    ],
    reviews: [
      { id: "r1", author: "Designify", rating: 5, text: "Super creative and responsive!" },
      { id: "r2", author: "PixelPro", rating: 4.8, text: "Delivered top-quality visuals!" }
    ],
    languages: [{ name: "English", level: "Fluent" }, { name: "Spanish", level: "Native" }],
    education: [{ degree: "B.A. Graphic Design", school: "Universidad Complutense de Madrid", year: "2016" }],
    certifications: ["Adobe Creative Expert", "Google UX Design"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_003",
    name: "Arjun Mehta",
    title: "AI Engineer & Data Scientist",
    location: "Bengaluru, IN",
    rating: 5.0,
    reviewsCount: 110,
    hourlyRate: 85,
    availability: "Full-time",
    experienceYears: 6,
    responseTime: "1 hour",
    projectsCompleted: 92,
    photo: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400",
    bio: "Machine Learning engineer with deep expertise in NLP, computer vision, and generative AI. Experienced in building scalable AI systems and deploying models in production.",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain", "AWS Sagemaker", "MLOps"],
    portfolio: [
      { id: "p1", title: "AI Chatbot", subtitle: "Custom OpenAI GPT-4 integration", client: "SmartTalk", image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600" },
      { id: "p2", title: "Image Recognition Model", subtitle: "Object detection for retail", client: "RetailVision", image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=600" }
    ],
    reviews: [
      { id: "r1", author: "TechNova", rating: 5, text: "Delivered a top-performing AI model ahead of time!" },
      { id: "r2", author: "AIWorks", rating: 5, text: "Brilliant ML expertise and documentation." }
    ],
    languages: [{ name: "English", level: "Fluent" }, { name: "Hindi", level: "Native" }],
    education: [{ degree: "M.Tech AI & Data Science", school: "IIT Bombay", year: "2019" }],
    certifications: ["TensorFlow Developer", "AWS ML Engineer", "DeepLearning.AI NLP"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_004",
    name: "Liam Carter",
    title: "Digital Marketing Strategist",
    location: "Toronto, CA",
    rating: 4.7,
    reviewsCount: 76,
    hourlyRate: 55,
    availability: "25 hrs/week",
    experienceYears: 5,
    responseTime: "4 hours",
    projectsCompleted: 70,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    bio: "Marketing strategist focused on brand growth, SEO optimization, and social media advertising. I create high-converting campaigns to drive measurable results.",
    skills: ["SEO", "Google Ads", "Content Marketing", "Social Media Strategy", "Analytics"],
    portfolio: [
      { id: "p1", title: "SEO for Startup", subtitle: "Organic growth strategy", client: "BrightTech", image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=600" },
      { id: "p2", title: "Social Media Campaign", subtitle: "Boosted engagement 3x", client: "GreenLeaf", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600" }
    ],
    reviews: [
      { id: "r1", author: "GrowCorp", rating: 4.8, text: "ROI improved drastically!" },
      { id: "r2", author: "Brandify", rating: 5, text: "Strategic and creative marketer!" }
    ],
    languages: [{ name: "English", level: "Native" }],
    education: [{ degree: "MBA Marketing", school: "University of Toronto", year: "2019" }],
    certifications: ["Google Ads Certified", "HubSpot Inbound Marketing"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_005",
    name: "Emma Brooks",
    title: "Copywriter & Content Strategist",
    location: "London, UK",
    rating: 4.9,
    reviewsCount: 95,
    hourlyRate: 50,
    availability: "Part-time",
    experienceYears: 7,
    responseTime: "5 hours",
    projectsCompleted: 150,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    bio: "Creative copywriter with 7 years of experience crafting brand stories and SEO-friendly content. I’ve written for SaaS, lifestyle, and B2B companies globally.",
    skills: ["Copywriting", "Content Strategy", "SEO", "Storytelling", "Editing"],
    portfolio: [
      { id: "p1", title: "Tech Blog Writing", subtitle: "SEO-optimized blog series", client: "SoftCore", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600" }
    ],
    reviews: [{ id: "r1", author: "Inspire Media", rating: 5, text: "Superb writing quality and voice!" }],
    languages: [{ name: "English", level: "Native" }],
    education: [{ degree: "B.A. English Literature", school: "University of Oxford", year: "2017" }],
    certifications: ["Content Marketing Certified", "SEO Specialist"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_006",
    name: "Noah Kim",
    title: "Virtual Assistant & Operations Coordinator",
    location: "Seoul, KR",
    rating: 4.8,
    reviewsCount: 80,
    hourlyRate: 30,
    availability: "Full-time",
    experienceYears: 4,
    responseTime: "1 hour",
    projectsCompleted: 100,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    bio: "Efficient and tech-savvy virtual assistant helping startups and entrepreneurs streamline their workflow, schedule, and documentation.",
    skills: ["Data Entry", "Scheduling", "Customer Support", "CRM Management", "Google Workspace"],
    portfolio: [],
    reviews: [{ id: "r1", author: "BizEase", rating: 4.9, text: "Reliable and organized!" }],
    languages: [{ name: "English", level: "Fluent" }, { name: "Korean", level: "Native" }],
    education: [{ degree: "B.B.A. Management", school: "Yonsei University", year: "2019" }],
    certifications: ["MS Office Expert", "Google Workspace Certified"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_007",
    name: "Olivia Patel",
    title: "Financial Analyst & Consultant",
    location: "Mumbai, IN",
    rating: 4.9,
    reviewsCount: 60,
    hourlyRate: 70,
    availability: "25 hrs/week",
    experienceYears: 6,
    responseTime: "3 hours",
    projectsCompleted: 65,
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    bio: "Finance professional with deep expertise in data-driven investment analysis, forecasting, and valuation models.",
    skills: ["Excel", "Power BI", "SQL", "Financial Modeling", "Valuation", "Budgeting"],
    portfolio: [],
    reviews: [{ id: "r1", author: "WealthMax", rating: 5, text: "Excellent financial insights!" }],
    languages: [{ name: "English", level: "Fluent" }, { name: "Hindi", level: "Native" }],
    education: [{ degree: "MBA Finance", school: "IIM Ahmedabad", year: "2019" }],
    certifications: ["CFA Level 2", "Financial Modeling Certified"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_008",
    name: "Daniel Green",
    title: "Corporate Lawyer & Legal Advisor",
    location: "New York, USA",
    rating: 4.8,
    reviewsCount: 77,
    hourlyRate: 120,
    availability: "On-demand",
    experienceYears: 9,
    responseTime: "5 hours",
    projectsCompleted: 55,
    photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400",
    bio: "Corporate attorney specializing in contracts, IP law, and startup compliance with over 9 years of experience.",
    skills: ["Corporate Law", "IP Law", "Contract Drafting", "Due Diligence"],
    portfolio: [],
    reviews: [{ id: "r1", author: "LawLink", rating: 4.9, text: "Professional and trustworthy legal support." }],
    languages: [{ name: "English", level: "Native" }],
    education: [{ degree: "Juris Doctor (JD)", school: "Harvard Law School", year: "2015" }],
    certifications: ["Member of NY State Bar", "Corporate Legal Practice"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_009",
    name: "Hannah Lee",
    title: "HR Consultant & Recruiter",
    location: "Singapore",
    rating: 4.7,
    reviewsCount: 88,
    hourlyRate: 55,
    availability: "Full-time",
    experienceYears: 7,
    responseTime: "2 hours",
    projectsCompleted: 80,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    bio: "Human Resources professional focused on hiring strategy, employee engagement, and leadership development.",
    skills: ["Recruitment", "Training", "Employee Relations", "HR Analytics"],
    portfolio: [],
    reviews: [{ id: "r1", author: "TalentGrow", rating: 4.8, text: "Helped us scale our hiring fast!" }],
    languages: [{ name: "English", level: "Fluent" }, { name: "Mandarin", level: "Conversational" }],
    education: [{ degree: "MBA HR", school: "NUS Business School", year: "2018" }],
    certifications: ["SHRM Certified Professional", "LinkedIn Talent Solutions Expert"],
    demoSessions: [<CollaborationTools />]
  },

  {
    id: "fr_010",
    name: "Ethan Roberts",
    title: "Civil Engineer & Architect",
    location: "Sydney, AU",
    rating: 4.9,
    reviewsCount: 120,
    hourlyRate: 90,
    availability: "Full-time",
    experienceYears: 10,
    responseTime: "2 hours",
    projectsCompleted: 95,
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400",
    bio: "Licensed civil engineer and architect experienced in urban planning, residential design, and sustainable infrastructure.",
    skills: ["AutoCAD", "Revit", "Structural Analysis", "Project Management"],
    portfolio: [],
    reviews: [{ id: "r1", author: "BuildPro", rating: 5, text: "High-quality and efficient design work." }],
    languages: [{ name: "English", level: "Native" }],
    education: [{ degree: "B.Eng Civil Engineering", school: "University of Sydney", year: "2015" }],
    certifications: ["Chartered Engineer (CEng)", "LEED Green Associate"],
    demoSessions: [<CollaborationTools />]
  }

];

// Subcomponents (Card + tabs + sections)

// Single freelancer card (used in list)
function FreelancerCard({ freelancer, onHire, onOverview }) {
  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
      <img src={freelancer.photo} alt={freelancer.name} className="w-28 h-28 rounded-xl object-cover border border-gray-700" />
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{freelancer.name}</h2>
            <p className="text-pink-300 font-medium">{freelancer.title}</p>
            <p className="text-gray-400 text-sm mt-1">{freelancer.location}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-300">
              <span>★ {freelancer.rating ?? "—"} ({freelancer.reviewsCount ?? 0})</span>
              <span>•</span>
              <span>${freelancer.hourlyRate ?? "—"}/hr</span>
              <span>•</span>
              <span>{freelancer.availability ?? "—"}</span>
              <span>•</span>
              <span>{freelancer.experienceYears ?? 0}+ yrs</span>
            </div>
            <p className="text-gray-300 mt-3 max-w-2xl">{freelancer.bio}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {freelancer.skills?.slice(0, 6).map((s) => (
                <span key={s} className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 border border-gray-700">{s}</span>
              ))}
              {freelancer.moreSkillsCount ? <span className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 border border-gray-700">+{freelancer.moreSkillsCount} more</span> : null}
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-3 mt-4 md:mt-0">
         <Link
  to="/payment"
  state={{ freelancer }}
>
  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-lg">
    Hire Freelancer {freelancer.price}
  </button>
</Link>
            <button onClick={() => onOverview(freelancer)} className="px-5 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700">Overview</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tabs for details page
function DetailTabs({ active, onChange }) {
  const items = ["Overview", "Portfolio", "Reviews", "Languages", "Education", "Certifications","Demo Sessions"];
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((it) => (
        <button
          key={it}
          onClick={() => onChange(it)}
          className={`px-4 py-2 rounded-lg text-sm ${active === it ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

// Details sections
function DetailOverview({ f }) {
  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 text-gray-300 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-white">About</h3>
          <p className="mt-2">{f.bio}</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">Rate</div>
              <div className="text-white font-semibold">${f.hourlyRate}/hr</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">Availability</div>
              <div className="text-white font-semibold">{f.availability}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">Response time</div>
              <div className="text-white font-semibold">{f.responseTime ?? "—"}</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-gray-400 text-sm">Projects completed</div>
              <div className="text-white font-semibold">{f.projectsCompleted ?? "—"}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="text-gray-400 text-sm">Location</div>
            <div className="text-white font-semibold">{f.location}</div>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
            <div className="text-gray-400 text-sm">Rating</div>
            <div className="text-white font-semibold">★ {f.rating} ({f.reviewsCount})</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg text-white font-semibold">Top skills</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {f.skills?.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 border border-gray-700">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
function DetailDemoSessions({ f }) {
  if (!f.demoSessions?.length) return <div className="text-gray-300">No demo sessions available.</div>;
  return (
    <div className="space-y-4">
      {f.demoSessions.map((session) => (
        <div key={session.sessionId} className="bg-gray-900/60 p-4 rounded-xl border border-gray-800">
          <h4 className="text-white font-semibold">{session.title}</h4>
          {/* Render the actual CollaborationTools component */}
          <CollaborationTools sessionId={session.sessionId} freelancerId={f.id} />
        </div>
      ))}
    </div>
  );
}

function DetailPortfolio({ f }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {f.portfolio?.length ? f.portfolio.map((p) => (
        <div key={p.id} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
          <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
          <div className="p-4 text-white">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-300 mt-1">{p.subtitle}</div>
            <div className="text-xs text-gray-400 mt-2">{p.client} • {p.date}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech?.map((t) => <span key={t} className="text-xs px-2 py-1 bg-gray-800 rounded-full border border-gray-700">{t}</span>)}
            </div>
          </div>
        </div>
      )) : <div className="text-gray-300">No portfolio items.</div>}
    </div>
  );
}

function DetailReviews({ f }) {
  return (
    <div className="space-y-4">
      {f.reviews?.length ? f.reviews.map((r) => (
        <div key={r.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">{r.author}</div>
              <div className="text-xs text-gray-400">{r.date}</div>
            </div>
            <div className="text-yellow-400 font-semibold">★ {r.rating}</div>
          </div>
          <p className="text-gray-300 mt-2">{r.text}</p>
        </div>
      )) : <div className="text-gray-300">No reviews yet.</div>}
    </div>
  );
}

function DetailLanguages({ f }) {
  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 text-gray-300">
      <div className="flex flex-wrap gap-3">
        {f.languages?.map((l) => (
          <div key={l.name} className="bg-gray-800 px-3 py-2 rounded-lg">
            <div className="text-white font-semibold">{l.name}</div>
            <div className="text-xs text-gray-400">{l.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailEducation({ f }) {
  return (
    <div className="space-y-3">
      {f.education?.length ? f.education.map((e, idx) => (
        <div key={idx} className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 text-gray-300">
          <div className="font-semibold text-white">{e.degree}</div>
          <div className="text-sm text-gray-400">{e.school} • {e.year}</div>
        </div>
      )) : <div className="text-gray-300">No education listed.</div>}
    </div>
  );
}

function DetailCertifications({ f }) {
  return (
    <div className="space-y-2">
      {f.certifications?.length ? f.certifications.map((c, idx) => (
        <div key={idx} className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 text-gray-300">
          {c}
        </div>
      )) : <div className="text-gray-300">No certifications listed.</div>}
    </div>
  );
}

// Hire Flow Steps (ProjectForm, ContractSummary, Payment, Success)
function ProjectForm({ value, onChange, onNext, onBack }) {
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
      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">Back</button>
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

// Main component
 function HireFreelancer() {
  // list | details | hire
  const [viewMode, setViewMode] = useState("list");
  const [selectedFreelancer, setSelectedFreelancer] = useState(mockFreelancer[0]);
  const [detailTab, setDetailTab] = useState("Overview");

  // hire flow state
  const [step, setStep] = useState(0); // 0 = project form, 1 = contract, 2 = payment, 3 = success
  const [project, setProject] = useState({ name: "", description: "", budget: "", timeline: "" });

  // When user clicks Hire on card, open hire flow for that freelancer
  function handleHireClick(freelancer) {
    setSelectedFreelancer(freelancer);
    setViewMode("hire");
    setStep(0);
  }

  // When user clicks Overview on card, open details (full page)
  function handleOverviewClick(freelancer) {
    setSelectedFreelancer(freelancer);
    setDetailTab("Overview");
    setViewMode("details");
  }

  // Reset to list view
  function backToList() {
    setViewMode("list");
    setSelectedFreelancer(mockFreelancer[0]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ------------------------
            LIST VIEW: show all cards
           ------------------------ */}
        {viewMode === "list" && (
          <>
            {mockFreelancer.map((f) => (
              <motion.div key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <FreelancerCard freelancer={f} onHire={handleHireClick} onOverview={handleOverviewClick} />
              </motion.div>
            ))}

            {/* small note area about selecting someone */}
            <div className="text-gray-400 text-sm mt-4">Click "Overview" for full profile page, or "Hire Freelancer" to start the hire flow.</div>
          </>
        )}

        {/* ------------------------
            DETAILS VIEW: full-page for selected freelancer
           ------------------------ */}
        {viewMode === "details" && selectedFreelancer && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Header */}
            <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
              <img src={selectedFreelancer.photo} alt={selectedFreelancer.name} className="w-36 h-36 rounded-xl object-cover border border-gray-700" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white">{selectedFreelancer.name}</h1>
                    <p className="text-pink-300 font-medium">{selectedFreelancer.title}</p>
                    <p className="text-gray-400 mt-2">{selectedFreelancer.location}</p>
                    <div className="flex gap-3 items-center mt-3 text-sm text-gray-300">
                      <span>★ {selectedFreelancer.rating} ({selectedFreelancer.reviewsCount})</span>
                      <span>•</span>
                      <span>${selectedFreelancer.hourlyRate}/hr</span>
                      <span>•</span>
                      <span>{selectedFreelancer.availability}</span>
                      <span>•</span>
                      <span>Response time: {selectedFreelancer.responseTime ?? "—"}</span>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => handleHireClick(selectedFreelancer)} className="px-5 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold">Hire Now</button>
                      <button onClick={backToList} className="px-5 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700">Back to list</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <DetailTabs active={detailTab} onChange={setDetailTab} />

            {/* Tab content */}
            <div className="mt-4">
              {detailTab === "Overview" && <DetailOverview f={selectedFreelancer} />}
              {detailTab === "Portfolio" && <DetailPortfolio f={selectedFreelancer} />}
              {detailTab === "Reviews" && <DetailReviews f={selectedFreelancer} />}
              {detailTab === "Languages" && <DetailLanguages f={selectedFreelancer} />}
              {detailTab === "Education" && <DetailEducation f={selectedFreelancer} />}
              {detailTab === "Certifications" && <DetailCertifications f={selectedFreelancer} />}
              {detailTab === "Demo Sessions" && <DetailDemoSessions f={selectedFreelancer} />}
            </div>
          </motion.div>
        )}

        {/* ------------------------
            HIRE FLOW VIEW
           ------------------------ */}
        {viewMode === "hire" && selectedFreelancer && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-white font-semibold">Hiring — {selectedFreelancer.name}</h2>
              <div className="flex gap-2">
                <button onClick={() => { setViewMode("list"); setStep(0); }} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700">Cancel</button>
              </div>
            </div>

            {step === 0 && <ProjectForm value={project} onChange={setProject} onNext={() => setStep(1)} onBack={() => setViewMode("list")} />}
            {step === 1 && <ContractSummary project={project} freelancer={selectedFreelancer} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
            {step === 2 && <PaymentPlaceholder onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <SuccessMessage freelancer={selectedFreelancer} onReset={() => { setViewMode("list"); setStep(0); setProject({ name: "", description: "", budget: "", timeline: "" }); }} />}
          </div>
        )}

      </div>
    </div>
  );
}
export default HireFreelancer;