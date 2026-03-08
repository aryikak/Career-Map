Career Map is a career navigation tool that analyzes a user’s resume text against a selected job role and generates a personalized learning roadmap. The system identifies matched skills, highlights missing skills, calculates a readiness score, and suggests resources, certifications, project ideas, and interview questions to help the user progress toward their target role. 


Project Structure
app/
  page.tsx                # Main frontend interface and user workflow
  api/analyze/route.ts    # Backend API for resume analysis and roadmap generation

lib/
  mockData.ts             # Synthetic job role data and required skills
  helpers.ts              # Skill extraction, readiness scoring, and roadmap logic
  types.ts                # Shared TypeScript types

## Getting Started
To run the project locally:

npm install
npm run dev

Then open http://localhost:3000 in your browser.
