import type { CVData } from "./CVBuilder";

export const SAMPLE_CV: CVData = {
  fullName: "Amina Hassan",
  email: "amina.hassan@email.com",
  phone: "+255 712 345 678",
  location: "Dar es Salaam, Tanzania",
  summary:
    "Motivated Software Engineer with 3+ years building web applications for fintech and telecom. Skilled in React, Python, and cloud deployment. Passionate about solving local problems with technology.",
  education: [
    {
      school: "University of Dar es Salaam",
      degree: "BSc Computer Science",
      year: "2020 – 2023",
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Vodacom Tanzania",
      dates: "Sep 2023 – Present",
      bullets:
        "Built internal dashboard used by 200+ staff, saving 15 hours/week of manual reporting\nReduced API response time by 40% through query optimization\nLed migration of legacy services to Docker + Kubernetes",
    },
    {
      role: "Software Intern",
      company: "NMB Bank",
      dates: "Jun 2022 – Aug 2022",
      bullets:
        "Developed mobile onboarding flow used by 5,000+ new customers\nWrote automated tests increasing coverage from 45% to 82%\nCollaborated with 6-person team on fraud detection module",
    },
  ],
  skills:
    "React, Next.js, TypeScript, Python, FastAPI, PostgreSQL, Docker, AWS, Git",
  languages: "Swahili (native), English (fluent)",
};