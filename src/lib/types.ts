export interface SkillRequirement {
  name: string;
  priority: "critical" | "important" | "optional";
}

export interface JobRole {
  id: string;
  title: string;
  requiredSkills: SkillRequirement[];
  resources: Record<string, string[]>;
}

export interface InterviewQuestion {
  skill: string;
  question: string;
}

export interface AnalysisResult {
  roleTitle: string;
  identifiedSkills: string[];
  learningGaps: SkillRequirement[];
  roadmap: {
    skill: string;
    priority: "critical" | "important" | "optional";
    resources: string[];
    certifications: string[];
    projectIdea: string;
  }[];
  readinessScore: number;
  recommendedNextStep: string;
  interviewQuestions: InterviewQuestion[];
  isFallback: boolean;
}