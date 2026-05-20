type SkillEntry = {
  label: string;
  value: number;
};

type SkillCategory = {
  title: string;
  skillInfo: SkillEntry[];
};

type UserReport = {
  name: string;
  role: string;
  goal: string;
  about: string[];
  skills: string[];
  aiReport: string;
  detailedSkills: SkillCategory[];
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
    "Her assessment behaviour reflects a structured, detailed-oriented approach to complex problem decomposition",
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
        { label: "Skill Proficiency", value: 70 },
        { label: "Workplace Readiness", value: 82 },
        { label: "Practical Application", value: 82 },
      ],
    },
    {
      title: "Working Style",
      skillInfo: [
        { label: "Skill Proficiency", value: 70 },
        { label: "Workplace Readiness", value: 82 },
        { label: "Practical Application", value: 82 },
      ],
    },
    {
      title: "Strengths",
      skillInfo: [
        { label: "Skill Proficiency", value: 70 },
        { label: "Workplace Readiness", value: 82 },
        { label: "Practical Application", value: 82 },
      ],
    },
    {
      title: "Weaknesses",
      skillInfo: [
        { label: "Skill Proficiency", value: 70 },
        { label: "Workplace Readiness", value: 82 },
        { label: "Practical Application", value: 82 },
      ],
    },
  ],
};

export type { UserReport, SkillCategory, SkillEntry };
export { userReport };
