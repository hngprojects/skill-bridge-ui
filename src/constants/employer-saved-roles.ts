export type SavedRoleSection = {
  heading: string;
  paragraph?: string;
  items?: string[];
};

export type SavedRoleAssessment = {
  title: string;
  description: string;
  estimatedTime: string;
};

export type SavedRole = {
  id: string;
  title: string;
  category: string;
  website: string;
  employmentType: string;
  experience: string;
  education: string;
  salaryRange: string;
  skills: string[];
  location: string;
  acceptsRelocation: boolean;
  sections: SavedRoleSection[];
  assessment: SavedRoleAssessment;
};

const DEFAULT_ASSESSMENT: SavedRoleAssessment = {
  title: "Practical assessment",
  description:
    "To get verified score and become discoverable to top employers.",
  estimatedTime: "30 minutes",
};

export const SAVED_ROLES: SavedRole[] = [
  {
    id: "credlane-app-mobile-development",
    title: "CredLane App mobile development",
    category: "Mobile app development",
    website: "www.credlane.com",
    employmentType: "Full Time",
    experience: "0-3 years",
    education: "Bachelor's degree",
    salaryRange: "$ 25k - 40k",
    skills: ["Node.Js", "API Designs", "React Native"],
    location: "Lagos, Nigeria",
    acceptsRelocation: false,
    sections: [
      {
        heading: "Job Description:",
        paragraph:
          "We are seeking a skilled Mobile App Developer to join our team and help build, maintain, and improve the Credlane mobile application. In this role, you will collaborate closely with designers, product managers, and engineers to deliver high-quality mobile experiences that are intuitive, secure, and scalable.",
      },
      {
        heading: "Key Responsibilities:",
        items: [
          "Develop and maintain mobile application features and functionality.",
          "Collaborate with cross-functional teams to translate requirements into technical solutions.",
          "Optimize application performance, reliability, and usability.",
          "Identify and resolve bugs, technical issues, and performance bottlenecks.",
          "Write clean, maintainable, and well-documented code.",
          "Participate in code reviews and contribute to development best practices.",
        ],
      },
      {
        heading: "Requirements:",
        items: [
          "Experience developing mobile applications for iOS and/or Android.",
          "Proficiency in relevant mobile development frameworks and technologies.",
          "Understanding of mobile UI/UX principles and best practices.",
          "Strong problem-solving and debugging skills.",
          "Ability to work effectively in a collaborative team environment.",
        ],
      },
    ],
    assessment: DEFAULT_ASSESSMENT,
  },
  {
    id: "ecotrack-environmental-monitoring-platform",
    title: "EcoTrack environmental monitoring platform",
    category: "Sustainability tracking software",
    website: "www.ecotrack.io",
    employmentType: "Full Time",
    experience: "2-5 years",
    education: "Bachelor's degree",
    salaryRange: "$ 30k - 50k",
    skills: ["Python", "AWS", "Data Analysis"],
    location: "Nairobi, Kenya",
    acceptsRelocation: true,
    sections: [
      {
        heading: "Job Description:",
        paragraph:
          "We are seeking a skilled Software Developer to join our team and help build, maintain, and improve the EcoTrack environmental monitoring platform. In this role, you will collaborate closely with designers, product managers, and engineers to deliver high-quality experiences that are intuitive, secure, and scalable.",
      },
      {
        heading: "Key Responsibilities:",
        items: [
          "Develop and maintain platform features and functionality.",
          "Collaborate with cross-functional teams to translate requirements into technical solutions.",
          "Optimize application performance, reliability, and usability.",
          "Identify and resolve bugs, technical issues, and performance bottlenecks.",
          "Write clean, maintainable, and well-documented code.",
          "Participate in code reviews and contribute to development best practices.",
        ],
      },
      {
        heading: "Requirements:",
        items: [
          "Experience building data-driven web applications.",
          "Proficiency in relevant frameworks and technologies.",
          "Understanding of UI/UX principles and best practices.",
          "Strong problem-solving and debugging skills.",
          "Ability to work effectively in a collaborative team environment.",
        ],
      },
    ],
    assessment: DEFAULT_ASSESSMENT,
  },
  {
    id: "fitpulse-wearable-health-tracker",
    title: "FitPulse wearable health tracker",
    category: "Fitness and health monitoring",
    website: "www.fitpulsewear.com",
    employmentType: "Full Time",
    experience: "1-3 years",
    education: "Bachelor's degree",
    salaryRange: "$ 25k - 45k",
    skills: ["React Native", "TypeScript", "Mobile Development"],
    location: "Cape Town, South Africa",
    acceptsRelocation: false,
    sections: [
      {
        heading: "Job Description:",
        paragraph:
          "We are seeking a skilled Developer to join our team and help build, maintain, and improve the FitPulse wearable health tracker app. In this role, you will collaborate closely with designers, product managers, and engineers to deliver high-quality experiences that are intuitive, secure, and scalable.",
      },
      {
        heading: "Key Responsibilities:",
        items: [
          "Develop and maintain application features and functionality.",
          "Collaborate with cross-functional teams to translate requirements into technical solutions.",
          "Optimize application performance, reliability, and usability.",
          "Identify and resolve bugs, technical issues, and performance bottlenecks.",
          "Write clean, maintainable, and well-documented code.",
          "Participate in code reviews and contribute to development best practices.",
        ],
      },
      {
        heading: "Requirements:",
        items: [
          "Experience developing consumer-facing applications.",
          "Proficiency in relevant frameworks and technologies.",
          "Understanding of UI/UX principles and best practices.",
          "Strong problem-solving and debugging skills.",
          "Ability to work effectively in a collaborative team environment.",
        ],
      },
    ],
    assessment: DEFAULT_ASSESSMENT,
  },
  {
    id: "eduspark-online-learning-portal-1",
    title: "EduSpark online learning portal",
    category: "E-learning and course management",
    website: "www.eduspark.edu",
    employmentType: "Full Time",
    experience: "2-4 years",
    education: "Bachelor's degree",
    salaryRange: "$ 28k - 45k",
    skills: ["React", "Node.js", "UI/UX Design"],
    location: "Accra, Ghana",
    acceptsRelocation: true,
    sections: [
      {
        heading: "Job Description:",
        paragraph:
          "We are seeking a skilled Developer to join our team and help build, maintain, and improve the EduSpark online learning portal. In this role, you will collaborate closely with designers, product managers, and engineers to deliver high-quality experiences that are intuitive, secure, and scalable.",
      },
      {
        heading: "Key Responsibilities:",
        items: [
          "Develop and maintain platform features and functionality.",
          "Collaborate with cross-functional teams to translate requirements into technical solutions.",
          "Optimize application performance, reliability, and usability.",
          "Identify and resolve bugs, technical issues, and performance bottlenecks.",
          "Write clean, maintainable, and well-documented code.",
          "Participate in code reviews and contribute to development best practices.",
        ],
      },
      {
        heading: "Requirements:",
        items: [
          "Experience building education or content-management platforms.",
          "Proficiency in relevant frameworks and technologies.",
          "Understanding of UI/UX principles and best practices.",
          "Strong problem-solving and debugging skills.",
          "Ability to work effectively in a collaborative team environment.",
        ],
      },
    ],
    assessment: DEFAULT_ASSESSMENT,
  },
  {
    id: "eduspark-online-learning-portal-2",
    title: "EduSpark online learning portal",
    category: "E-learning and course management",
    website: "www.eduspark.edu",
    employmentType: "Part Time",
    experience: "0-2 years",
    education: "Bachelor's degree",
    salaryRange: "$ 18k - 30k",
    skills: ["JavaScript", "Product Management"],
    location: "Remote",
    acceptsRelocation: true,
    sections: [
      {
        heading: "Job Description:",
        paragraph:
          "We are seeking a Junior Developer to join our team and help build, maintain, and improve the EduSpark online learning portal. In this role, you will collaborate closely with designers, product managers, and engineers to deliver high-quality experiences that are intuitive, secure, and scalable.",
      },
      {
        heading: "Key Responsibilities:",
        items: [
          "Support development of platform features and functionality.",
          "Collaborate with cross-functional teams to translate requirements into technical solutions.",
          "Help optimize application performance, reliability, and usability.",
          "Identify and resolve bugs, technical issues, and performance bottlenecks.",
          "Write clean, maintainable, and well-documented code.",
          "Participate in code reviews and contribute to development best practices.",
        ],
      },
      {
        heading: "Requirements:",
        items: [
          "Some experience building web or mobile applications.",
          "Familiarity with relevant frameworks and technologies.",
          "Understanding of UI/UX principles and best practices.",
          "Strong willingness to learn and grow.",
          "Ability to work effectively in a collaborative team environment.",
        ],
      },
    ],
    assessment: DEFAULT_ASSESSMENT,
  },
];

export function getSavedRoleById(id: string): SavedRole | undefined {
  return SAVED_ROLES.find((role) => role.id === id);
}
