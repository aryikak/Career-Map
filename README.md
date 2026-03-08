Candidate Name: Aryika Kumar
Scenario Chosen: Career Navigation Platform 
Estimated Time Spent: 6 hours 
Quick Start:

● Prerequisites: Node.js, NPM
● Run Commands:
npm install 
npm run dev
● Test Commands:
http://localhost:3000
AI Disclosure:
● Did you use an AI assistant (Copilot, ChatGPT, etc.)? (Yes/No) Yes
● How did you verify the suggestions? I reviewed all the code suggestions and made sure I could explain them. I manually tested the application and ensured the logic matched my intended design. 
● Give one example of a suggestion you rejected or changed: I rejected some of the suggestions to overcomplicate the architecture by introducing external APIs because I wanted to follow the MVP implementation. 
Tradeoffs & Prioritization:
● What did you cut to stay within the 4–6 hour limit? I cut some additional features such as AI based resume parsing, advanced UI features, and integration with real APIs. 
● What would you build next if you had more time? If I had more time I would make the roadmap more extensive, integrate real job description datasets, support pdf uploads, and use AI models for skill extraction. 
● Known limitations: Skill extraction uses rule based matching, pdf upload not implemented, job data is synthetic. 

Recording: https://youtu.be/rasEjzTt92o

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
