import { JobRole } from "./types";

export const JOB_ROLES: JobRole[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    requiredSkills: [
      { name: "JavaScript", priority: "critical" },
      { name: "React", priority: "critical" },
      { name: "TypeScript", priority: "important" },
      { name: "CSS", priority: "critical" },
      { name: "Testing", priority: "optional" }
    ],
    resources: {
      JavaScript: [
        "JavaScript.info",
        "Build an interactive quiz app"
      ],
      React: [
        "React Docs",
        "Build a dashboard UI"
      ],
      TypeScript: [
        "TypeScript Handbook",
        "Convert a JavaScript project to TypeScript"
      ],
      CSS: [
        "MDN CSS Guide",
        "Recreate a responsive landing page"
      ],
      Testing: [
        "Jest basics",
        "Write tests for a form component"
      ]
    }
  },
  {
    id: "backend",
    title: "Backend Developer",
    requiredSkills: [
      { name: "Python", priority: "critical" },
      { name: "APIs", priority: "critical" },
      { name: "SQL", priority: "critical" },
      { name: "Databases", priority: "important" },
      { name: "Authentication", priority: "optional" }
    ],
    resources: {
      Python: [
        "Python documentation",
        "Build a small Flask or FastAPI service"
      ],
      APIs: [
        "REST API basics",
        "Build a CRUD API"
      ],
      SQL: [
        "SQLBolt",
        "Practice joins and aggregations"
      ],
      Databases: [
        "Database design basics",
        "Model a schema for a small app"
      ],
      Authentication: [
        "JWT intro",
        "Add protected routes to an API"
      ]
    }
  },
  {
    id: "ml",
    title: "ML Engineer",
    requiredSkills: [
      { name: "Python", priority: "critical" },
      { name: "Pandas", priority: "important" },
      { name: "Scikit-learn", priority: "critical" },
      { name: "Model Evaluation", priority: "critical" },
      { name: "Deployment", priority: "optional" }
    ],
    resources: {
      Python: [
        "Python documentation",
        "Practice data processing in Python"
      ],
      Pandas: [
        "Pandas tutorial",
        "Clean and analyze a CSV dataset"
      ],
      "Scikit-learn": [
        "Scikit-learn tutorial",
        "Train a simple classification model"
      ],
      "Model Evaluation": [
        "Precision and Recall guide",
        "Compare evaluation metrics on a small dataset"
      ],
      Deployment: [
        "Deploy a small ML API",
        "Serve model predictions through FastAPI"
      ]
    }
  },
  {
    id: "cloud",
    title: "Cloud Engineer",
    requiredSkills: [
      { name: "AWS", priority: "critical" },
      { name: "Docker", priority: "critical" },
      { name: "Linux", priority: "important" },
      { name: "CI/CD", priority: "important" },
      { name: "Networking", priority: "optional" }
    ],
    resources: {
      AWS: [
        "AWS Skill Builder Cloud Practitioner Essentials",
        "Review EC2, S3, IAM basics"
      ],
      Docker: [
        "Docker getting started guide",
        "Containerize a small app locally"
      ],
      Linux: [
        "Linux Journey",
        "Practice shell commands and permissions"
      ],
      "CI/CD": [
        "GitHub Actions basics",
        "Create a workflow that runs tests on every push"
      ],
      Networking: [
        "Cloud networking fundamentals",
        "Review VPCs, subnets, and security groups"
      ]
    }
  }
];