// src/data/freelancersData.js

const freelancersData = [
  {
    _id: "1",
    name: "John Doe",
    category: "Web Development",
    location: "India, New Delhi",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js"],
    email: "john@example.com",
    phone: "+91 9876543210",
    summary: "Full stack developer with 5 years of experience.",
    rate: "₹2000/hr",
    projects: [
      { title: "E-commerce Website", duration: "3 months" },
      { title: "Portfolio Website", duration: "1 month" },
    ],
  },
  {
    _id: "2",
    name: "Jane Smith",
    category: "UI/UX Design",
    location: "India, Mumbai",
    skills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping"],
    email: "jane@example.com",
    phone: "+91 9123456780",
    summary: "UI/UX designer specializing in web and mobile apps.",
    rate: "₹1800/hr",
    projects: [
      { title: "Mobile App Design", duration: "2 months" },
      { title: "Website Redesign", duration: "1.5 months" },
    ],
  },
  {
    _id: "3",
    name: "Alex Johnson",
    category: "Digital Marketing",
    location: "USA, New York",
    skills: ["SEO", "Google Ads", "Facebook Ads", "Analytics", "Content Marketing"],
    email: "alex@example.com",
    phone: "+1 9988776655",
    summary: "Digital marketer with expertise in SEO and social media campaigns.",
    rate: "₹1500/hr",
    projects: [
      { title: "SEO Campaign", duration: "1 month" },
      { title: "Social Media Marketing", duration: "2 months" },
    ],
  },
  {
    _id: "4",
    name: "Sara Williams",
    category: "Content Writing",
    location: "UK, London",
    skills: ["Content Writing", "Blog Writing", "Copywriting", "Editing", "Proofreading"],
    email: "sara@example.com",
    phone: "+44 7700 900123",
    summary: "Professional content writer with experience in multiple niches.",
    rate: "₹1200/hr",
    projects: [
      { title: "Blog Articles", duration: "1 month" },
      { title: "Website Copywriting", duration: "2 weeks" },
    ],
  },
];

export default freelancersData;
