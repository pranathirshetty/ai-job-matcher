import express from "express";
const router = express.Router();

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp",
    location: "New York, NY",
    type: "Full Time",
    domain: "Computer Science",
    skills: ["Java", "DSA", "OOP"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "PixelLabs",
    location: "San Francisco, CA",
    type: "Full Time",
    domain: "Computer Science",
    skills: ["React", "HTML", "CSS", "JavaScript"]
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Designify",
    location: "Remote",
    type: "Full Time",
    domain: "Design",
    skills: ["Figma", "UX", "Design"]
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "DataWorks",
    location: "Hyderabad",
    type: "Full Time",
    domain: "Data",
    skills: ["Python", "SQL", "Excel"]
  },
  {
    id: 5,
    title: "AI Engineer",
    company: "BrainTech",
    location: "Remote",
    type: "Full Time",
    domain: "Artificial Intelligence",
    skills: ["Python", "Machine Learning", "AI"]
  },
  {
    id: 6,
    title: "Cloud Engineer",
    company: "SkyNet",
    location: "Bangalore",
    type: "Full Time",
    domain: "Cloud Computing",
    skills: ["AWS", "Docker", "Linux"]
  },
  {
    id: 7,
    title: "Cyber Security Analyst",
    company: "SecureX",
    location: "Delhi",
    type: "Full Time",
    domain: "Cyber Security",
    skills: ["Networking", "Security", "Linux"]
  },
  {
    id: 8,
    title: "Mobile App Developer",
    company: "Appify",
    location: "Remote",
    type: "Full Time",
    domain: "Mobile Development",
    skills: ["Flutter", "Dart", "Firebase"]
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "DeployNow",
    location: "Hyderabad",
    type: "Full Time",
    domain: "DevOps",
    skills: ["CI/CD", "Docker", "AWS"]
  },
  {
    id: 10,
    title: "Product Designer",
    company: "UXHub",
    location: "Remote",
    type: "Full Time",
    domain: "Design",
    skills: ["Figma", "Design Systems", "Wireframing"]
  },
  {
    id: 11,
    title: "Business Analyst",
    company: "BizTech",
    location: "Mumbai",
    type: "Full Time",
    domain: "Management",
    skills: ["Analysis", "Excel", "Communication"]
  },
  {
    id: 12,
    title: "QA Engineer",
    company: "Testify",
    location: "Chennai",
    type: "Full Time",
    domain: "Software Testing",
    skills: ["Testing", "Automation", "Selenium"]
  },
  {
    id: 13,
    title: "Machine Learning Engineer",
    company: "AlgoWorks",
    location: "Bangalore",
    type: "Full Time",
    domain: "Artificial Intelligence",
    skills: ["Python", "ML", "Data Science"]
  },
  {
    id: 14,
    title: "Game Developer",
    company: "PlayForge",
    location: "Pune",
    type: "Full Time",
    domain: "Game Development",
    skills: ["Unity", "C#", "Game Design"]
  },
  {
    id: 15,
    title: "Blockchain Developer",
    company: "ChainLabs",
    location: "Bangalore",
    type: "Full Time",
    domain: "Blockchain",
    skills: ["Solidity", "Ethereum", "Blockchain"]
  },

  {
    id: 16,
    title: "Mechanical Design Engineer",
    company: "MechWorks",
    location: "Pune",
    type: "Full Time",
    domain: "Mechanical",
    skills: ["SolidWorks", "Thermodynamics", "Manufacturing"]
  },
  {
    id: 17,
    title: "Civil Site Engineer",
    company: "BuildWell",
    location: "Bangalore",
    type: "Full Time",
    domain: "Civil",
    skills: ["AutoCAD", "Construction Planning", "Surveying"]
  },
  {
    id: 18,
    title: "Electrical Engineer",
    company: "VoltCorp",
    location: "Chennai",
    type: "Full Time",
    domain: "Electrical",
    skills: ["Power Systems", "PLC", "Circuit Design"]
  },
  {
    id: 19,
    title: "Robotics Engineer",
    company: "RoboTech",
    location: "Hyderabad",
    type: "Full Time",
    domain: "Robotics",
    skills: ["ROS", "Embedded Systems", "Python"]
  }
];

 
router.get("/", (req, res) => {
  const { search = "", domain = "", location = "" } = req.query;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills?.some(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesDomain =
      domain === "" ||
      job.domain.toLowerCase().includes(domain.toLowerCase()) ||
      job.skills?.some(skill =>
        skill.toLowerCase().includes(domain.toLowerCase())
      );

    const matchesLocation =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesDomain && matchesLocation;
  });

  res.json(filteredJobs);
});

export default router;