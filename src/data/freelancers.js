// Centralized freelancers data and helpers

const baseData = {
  "Development & IT": [
    { id: 5, name: "John Doe", role: "Full Stack Dev", img: "https://randomuser.me/api/portraits/men/11.jpg", rating: 4.9, price: 60, skill: "React" },
    { id: 6, name: "Ali Khan", role: "Backend Dev", img: "https://randomuser.me/api/portraits/men/13.jpg", rating: 4.7, price: 65, skill: "Node.js" },
    { name: "Emily White", role: "Mobile Dev", img: "https://randomuser.me/api/portraits/women/14.jpg", rating: 4.9, price: 70, skill: "Flutter" },
    { name: "Robert Lee", role: "DevOps Engineer", img: "https://randomuser.me/api/portraits/men/15.jpg", rating: 4.6, price: 80, skill: "AWS" },
    { name: "Sophia Brown", role: "Cloud Engineer", img: "https://randomuser.me/api/portraits/women/16.jpg", rating: 5.0, price: 90, skill: "Azure" },
  ],
  "Design & Creative": [
    { id: 3, name: "Anna Grey", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/21.jpg", rating: 4.8, price: 55, skill: "Figma" },
    { id: 4, name: "Mark Evans", role: "Graphic Designer", img: "https://randomuser.me/api/portraits/men/22.jpg", rating: 4.9, price: 45, skill: "Photoshop" },
    { name: "Nina Patel", role: "Illustrator", img: "https://randomuser.me/api/portraits/women/23.jpg", rating: 4.7, price: 50, skill: "Illustrator" },
    { name: "Chris Adams", role: "Motion Designer", img: "https://randomuser.me/api/portraits/men/24.jpg", rating: 4.6, price: 60, skill: "After Effects" },
    { name: "Olivia Green", role: "Brand Designer", img: "https://randomuser.me/api/portraits/women/25.jpg", rating: 4.9, price: 70, skill: "Branding" },
  ],
  "Writing & Translation": [
    { name: "Liam Brown", role: "Content Writer", img: "https://randomuser.me/api/portraits/men/31.jpg", rating: 4.9, price: 40, skill: "Blog Writing" },
    { name: "Sophia Lee", role: "Copywriter", img: "https://randomuser.me/api/portraits/women/32.jpg", rating: 4.8, price: 45, skill: "SEO Writing" },
    { name: "Daniel Kim", role: "Translator", img: "https://randomuser.me/api/portraits/men/33.jpg", rating: 4.7, price: 50, skill: "Spanish-English" },
    { name: "Ava Johnson", role: "Proofreader", img: "https://randomuser.me/api/portraits/women/34.jpg", rating: 4.9, price: 35, skill: "Editing" },
    { name: "Noah Wilson", role: "Technical Writer", img: "https://randomuser.me/api/portraits/men/35.jpg", rating: 4.8, price: 55, skill: "Docs" },
  ],
  "Sales & Marketing": [
    { name: "James Carter", role: "Digital Marketer", img: "https://randomuser.me/api/portraits/men/41.jpg", rating: 4.9, price: 65, skill: "Google Ads" },
    { name: "Emily Clark", role: "Social Media Manager", img: "https://randomuser.me/api/portraits/women/42.jpg", rating: 4.8, price: 55, skill: "Instagram" },
    { name: "William Harris", role: "SEO Specialist", img: "https://randomuser.me/api/portraits/men/43.jpg", rating: 4.7, price: 70, skill: "SEO" },
    { name: "Olivia Lewis", role: "Content Marketer", img: "https://randomuser.me/api/portraits/women/44.jpg", rating: 4.8, price: 60, skill: "Content Strategy" },
    { name: "Henry Walker", role: "Email Marketer", img: "https://randomuser.me/api/portraits/men/45.jpg", rating: 4.9, price: 50, skill: "Mailchimp" },
  ],
  "Admin & Support": [
    { name: "Lucas Young", role: "Virtual Assistant", img: "https://randomuser.me/api/portraits/men/51.jpg", rating: 4.8, price: 30, skill: "Data Entry" },
    { name: "Ella King", role: "Customer Support", img: "https://randomuser.me/api/portraits/women/52.jpg", rating: 4.7, price: 35, skill: "Zendesk" },
    { name: "Mason Wright", role: "Project Coordinator", img: "https://randomuser.me/api/portraits/men/53.jpg", rating: 4.6, price: 45, skill: "Asana" },
    { name: "Charlotte Scott", role: "Executive Assistant", img: "https://randomuser.me/api/portraits/women/54.jpg", rating: 4.9, price: 50, skill: "Scheduling" },
    { name: "Benjamin Turner", role: "Operations Assistant", img: "https://randomuser.me/api/portraits/men/55.jpg", rating: 4.8, price: 40, skill: "MS Office" },
  ],
  "Engineering & Architecture": [
    { name: "Matthew Flores", role: "Civil Engineer", img: "https://randomuser.me/api/portraits/men/81.jpg", rating: 4.7, price: 90, skill: "AutoCAD" },
    { name: "Victoria Sanders", role: "Architect", img: "https://randomuser.me/api/portraits/women/82.jpg", rating: 4.9, price: 120, skill: "Revit" },
    { name: "Joseph Powell", role: "Mechanical Engineer", img: "https://randomuser.me/api/portraits/men/83.jpg", rating: 4.8, price: 100, skill: "SolidWorks" },
    { name: "Grace Morris", role: "Interior Designer", img: "https://randomuser.me/api/portraits/women/84.jpg", rating: 4.9, price: 85, skill: "SketchUp" },
    { name: "Samuel Reed", role: "Electrical Engineer", img: "https://randomuser.me/api/portraits/men/85.jpg", rating: 4.6, price: 95, skill: "MATLAB" },
  ],
  "Legal": [
    { name: "Ryan Foster", role: "Corporate Lawyer", img: "https://randomuser.me/api/portraits/men/91.jpg", rating: 4.9, price: 150, skill: "Contracts" },
    { name: "Ella Gray", role: "Paralegal", img: "https://randomuser.me/api/portraits/women/92.jpg", rating: 4.7, price: 80, skill: "Legal Research" },
    { name: "Mason Brooks", role: "IP Lawyer", img: "https://randomuser.me/api/portraits/men/93.jpg", rating: 4.8, price: 140, skill: "Patents" },
    { name: "Aria Hughes", role: "Immigration Consultant", img: "https://randomuser.me/api/portraits/women/94.jpg", rating: 4.6, price: 100, skill: "Visas" },
    { name: "Carter Jenkins", role: "Criminal Lawyer", img: "https://randomuser.me/api/portraits/men/95.jpg", rating: 4.9, price: 160, skill: "Defense" },
  ],
  "Data Science & Analytics": [
    { name: "David Kelly", role: "Data Scientist", img: "https://randomuser.me/api/portraits/men/101.jpg", rating: 4.9, price: 120, skill: "Python" },
    { name: "Layla Edwards", role: "Data Analyst", img: "https://randomuser.me/api/portraits/women/102.jpg", rating: 4.8, price: 90, skill: "SQL" },
    { name: "Wyatt Collins", role: "ML Engineer", img: "https://randomuser.me/api/portraits/men/103.jpg", rating: 4.7, price: 130, skill: "TensorFlow" },
    { name: "Lila Stewart", role: "BI Specialist", img: "https://randomuser.me/api/portraits/women/104.jpg", rating: 4.8, price: 85, skill: "PowerBI" },
    { name: "Julian Price", role: "Statistician", img: "https://randomuser.me/api/portraits/men/105.jpg", rating: 4.6, price: 100, skill: "R" },
  ],
  "Education & Training": [
    { name: "Leo Morgan", role: "Online Tutor", img: "https://randomuser.me/api/portraits/men/111.jpg", rating: 4.8, price: 40, skill: "Math" },
    { name: "Aurora Bell", role: "Language Teacher", img: "https://randomuser.me/api/portraits/women/112.jpg", rating: 4.9, price: 50, skill: "French" },
    { name: "Hudson Rivera", role: "Corporate Trainer", img: "https://randomuser.me/api/portraits/men/113.jpg", rating: 4.7, price: 60, skill: "Leadership" },
    { name: "Paisley Cooper", role: "Curriculum Developer", img: "https://randomuser.me/api/portraits/women/114.jpg", rating: 4.6, price: 55, skill: "E-Learning" },
    { name: "Ian Perez", role: "Test Prep Coach", img: "https://randomuser.me/api/portraits/men/115.jpg", rating: 4.8, price: 45, skill: "SAT" },
  ],
};

const profileExtras = {
  "Development & IT": {
    5: { title: "Full Stack Developer", location: "London, UK", verified: true, successRate: "95% Job Success", topRated: "Top Rated Plus", skills: ["React", "Node.js", "MongoDB"], portfolio: "https://johndoe.dev", bio: "Experienced Full Stack Developer delivering scalable web apps.", jobs: 120, hours: 2500, languages: ["English: Native"], education: "Computer Science, UCL (2015-2019)", history: [{ title: "E-commerce Platform", rating: 5.0, status: "Completed" }, { title: "Chat App Development", rating: 4.9, status: "Completed" }] },
    6: { title: "Backend Developer", location: "Karachi, Pakistan", verified: true, successRate: "92% Job Success", topRated: "Top Rated", skills: ["Node.js", "Express", "MongoDB"], portfolio: "https://alikhan.dev", bio: "Backend developer specializing in REST APIs and databases.", jobs: 85, hours: 1800, languages: ["English: Native"], education: "Software Engineering, NED University (2014-2018)", history: [{ title: "API Development", rating: 4.8, status: "Completed" }, { title: "Database Optimization", rating: 4.7, status: "Completed" }] },
  },
  "Design & Creative": {
    3: { title: "UI/UX Designer", location: "New York, USA", verified: true, successRate: "98% Job Success", topRated: "Top Rated", skills: ["Figma", "UX Research", "Wireframes"], portfolio: "https://annagrey.design", bio: "Creative UI/UX designer with experience in web and mobile apps.", jobs: 90, hours: 1200, languages: ["English: Native"], education: "Design, NYU (2016-2020)", history: [{ title: "Mobile App UX", rating: 4.8, status: "Completed" }, { title: "Website Redesign", rating: 4.9, status: "Completed" }] },
  },
  "AI Services": {
    8: { title: "AI Researcher", location: "Berlin, Germany", verified: true, successRate: "100% Job Success", topRated: "Top Rated Plus", skills: ["Deep Learning", "Python", "TensorFlow"], portfolio: "https://noramitchell.ai", bio: "AI researcher creating cutting-edge ML models.", jobs: 50, hours: 1800, languages: ["English: Native", "German: Bilingual"], education: "AI & Robotics, TU Berlin (2016-2020)", history: [{ title: "ML Model for Finance", rating: 5.0, status: "Completed" }, { title: "AI Chatbot", rating: 4.9, status: "Completed" }] },
  },
};

function slugToTitle(slugOrTitle) {
  const decoded = decodeURIComponent(slugOrTitle);
  const map = {
    "web-development": "Development & IT",
    "development-it": "Development & IT",
    "ai-services": "AI Services",
    "design": "Design & Creative",
    "design-creative": "Design & Creative",
    "writing": "Writing & Translation",
    "writing-translation": "Writing & Translation",
    "sales-marketing": "Sales & Marketing",
    "admin-support": "Admin & Support",
    "engineering-architecture": "Engineering & Architecture",
    "legal": "Legal",
    "data-science-analytics": "Data Science & Analytics",
    "education-training": "Education & Training",
  };
  return baseData[decoded] ? decoded : map[decoded.toLowerCase()] || decoded;
}

function computeDeterministicId(category, index) {
  const base = Array.from(category).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return Number(`${base}${index + 1}`);
}

export function getFreelancersByCategory(inputCategory) {
  const title = slugToTitle(inputCategory);
  const list = baseData[title] || [];
  return list.map((p, idx) => ({
    id: p.id != null ? p.id : computeDeterministicId(title, idx),
    name: p.name,
    role: p.role,
    img: p.img,
    rating: p.rating,
    price: p.price,
    skill: p.skill,
    __category: title,
  }));
}

export function getFreelancerProfile(categoryInput, id) {
  const title = slugToTitle(categoryInput);
  const list = getFreelancersByCategory(title);
  const person = list.find(p => p.id === Number(id));
  if (!person) return null;
  const extras = (profileExtras[title] && profileExtras[title][person.id]) || {};
  return { ...person, ...extras };
}

export function getCategoryTitle(input) {
  return slugToTitle(input);
}


