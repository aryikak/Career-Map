import { JobRole, InterviewQuestion } from '@/lib/types';

export function extractSkillsFallback(resumeText: string, role: JobRole): string[] {
  const text = resumeText.toLowerCase();

  return role.requiredSkills
    .filter((skill) => text.includes(skill.name.toLowerCase()))
    .map((skill) => skill.name);
}

export function calculateReadiness(role: JobRole, identifiedSkills: string[]) {
  return Math.round((identifiedSkills.length / role.requiredSkills.length) * 100);
}

export function getRecommendedNextStep(role: JobRole, identifiedSkills: string[]) {
  const nextSkill = role.requiredSkills.find(
    (skill) => !identifiedSkills.includes(skill.name)
  );

  if (!nextSkill) {
    return "You match the main role requirements. Focus on projects and interview preparation.";
  }

  return `Start with ${nextSkill.name} because it is one of the next missing skills for this role.`;
}

export function generateInterviewQuestions(identifiedSkills: string[]): InterviewQuestion[] {
  const bank: Record<string, string> = {
    React: "How would you explain the difference between props and state?",
    TypeScript: "Why would a team choose TypeScript over plain JavaScript?",
    JavaScript: "What is the difference between synchronous and asynchronous code?",
    Python: "Why is Python commonly used in backend and machine learning work?",
    APIs: "How would you design a simple API for creating and fetching users?",
    SQL: "What is a JOIN and when would you use one?",
    Pandas: "How would you handle missing values in a dataset?",
    "Scikit-learn": "How would you train and evaluate a simple classification model?",
    AWS: "What AWS services might you use to deploy a small web application?",
    Docker: "Why do teams use Docker in development and deployment?",
    Linux: "What Linux skills are helpful when debugging deployed systems?",
    "CI/CD": "What does a CI/CD pipeline automate and why is it useful?",
    Networking: "What happens at a high level when a request travels from browser to server?"
  };

  return identifiedSkills.slice(0, 3).map((skill) => ({
    skill,
    question: bank[skill] || `Explain a project where you used ${skill}.`
  }));
}

export function buildRoadmap(
  role: JobRole,
  identifiedSkills: string[]
) {
  const learningGaps = role.requiredSkills.filter(
    (skill) => !identifiedSkills.includes(skill.name)
  );

  return learningGaps.map((skill) => {
    let certifications: string[] = [];
    let projectIdea = `Build a small project that demonstrates ${skill.name}.`;

    if (skill.name === "AWS") {
      certifications = ["AWS Certified Cloud Practitioner"];
      projectIdea = "Deploy a static website or small service using core AWS services.";
    } else if (skill.name === "Docker") {
      certifications = ["Docker Foundations Professional Certificate"];
      projectIdea = "Containerize a small API and run it locally with Docker.";
    } else if (skill.name === "Linux") {
      certifications = [];
      projectIdea = "Practice navigating a Linux VM and scripting basic tasks.";
    } else if (skill.name === "CI/CD") {
      certifications = [];
      projectIdea = "Set up a GitHub Actions workflow that runs tests automatically.";
    } else if (skill.name === "Networking") {
      certifications = [];
      projectIdea = "Diagram a small VPC and explain traffic flow between components.";
    } else if (skill.name === "React") {
      certifications = [];
      projectIdea = "Build a dashboard with reusable components and API-driven state.";
    } else if (skill.name === "TypeScript") {
      certifications = [];
      projectIdea = "Convert a JavaScript project to TypeScript and type API responses.";
    } else if (skill.name === "JavaScript") {
      certifications = [];
      projectIdea = "Build an interactive frontend project with form handling and async requests.";
    } else if (skill.name === "CSS") {
      certifications = [];
      projectIdea = "Recreate a polished landing page from a design reference.";
    } else if (skill.name === "Testing") {
      certifications = [];
      projectIdea = "Add unit tests for components or backend routes.";
    } else if (skill.name === "Python") {
      certifications = [];
      projectIdea = "Build a simple backend service or data-processing script in Python.";
    } else if (skill.name === "APIs") {
      certifications = [];
      projectIdea = "Create a CRUD API with validation and error handling.";
    } else if (skill.name === "SQL") {
      certifications = [];
      projectIdea = "Design a relational schema and write queries for common app flows.";
    } else if (skill.name === "Databases") {
      certifications = [];
      projectIdea = "Model a database for a small product and explain the design choices.";
    } else if (skill.name === "Authentication") {
      certifications = [];
      projectIdea = "Add login and protected routes to a backend project.";
    } else if (skill.name === "Pandas") {
      certifications = [];
      projectIdea = "Analyze a dataset and summarize trends with Pandas.";
    } else if (skill.name === "Scikit-learn") {
      certifications = [];
      projectIdea = "Train and evaluate a basic classifier using Scikit-learn.";
    } else if (skill.name === "Model Evaluation") {
      certifications = [];
      projectIdea = "Compare precision, recall, and F1 across two small models.";
    } else if (skill.name === "Deployment") {
      certifications = [];
      projectIdea = "Deploy a small service and document the steps needed to run it.";
    }

    return {
      skill: skill.name,
      priority: skill.priority,
      resources: role.resources[skill.name] || [],
      certifications,
      projectIdea
    };
  });
}