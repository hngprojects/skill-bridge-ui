type UserReport = {
  name: string;
  role: string;
  goal: string;
  about: string[];
  skills: string[];
  aiReport: string;
  detailedSkills: DetailedSkills[];
};

type DetailedSkills = {
  title: string;
  skillInfo: { label: string; value: number }[];
};

const userReport: UserReport = {
  name: "Alex Smith",
  role: "Frontend Developer",
  goal: "Land my first role",
  about: ["Mid Level", "Open to Work", "Remote", "Hybrid", "5 years exp."],
  skills: [
    "React Fundamentals",
    "Typescript patterns",
    "API Designs",
    "React Native",
  ],
  aiReport:
    "His assessment behaviour reflects a structured, detail-oriented approach to complex problem decomposition",
  detailedSkills: [
    {
      title: "Professional Skills",
      skillInfo: [
        { label: "Skill Proficiency", value: 70 },
        { label: "Workplace Readiness", value: 82 },
        { label: "Practical Application", value: 82 },
      ],
    },
    {
      title: "Soft Skills",
      skillInfo: [
        { label: "Communication", value: 78 },
        { label: "Teamwork", value: 85 },
        { label: "Adaptability", value: 72 },
      ],
    },
    {
      title: "Working Style",
      skillInfo: [
        { label: "Independence", value: 88 },
        { label: "Collaboration", value: 74 },
        { label: "Time Management", value: 69 },
      ],
    },
    {
      title: "Strengths",
      skillInfo: [
        { label: "Problem Solving", value: 90 },
        { label: "Analytical Thinking", value: 84 },
        { label: "Attention to Detail", value: 76 },
      ],
    },
    {
      title: "Weaknesses",
      skillInfo: [
        { label: "Public Speaking", value: 45 },
        { label: "Delegation", value: 52 },
        { label: "Time Estimation", value: 58 },
      ],
    },
  ],
};

export { userReport };
