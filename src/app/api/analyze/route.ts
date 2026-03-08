import { NextResponse } from "next/server";
import { JOB_ROLES } from "@/lib/mockData";
import {
  extractSkillsFallback,
  calculateReadiness,
  getRecommendedNextStep,
  generateInterviewQuestions,
  buildRoadmap
} from "@/lib/helpers";

export async function POST(req: Request) {
  try {
    const { resumeText, targetId } = await req.json();

    if (!resumeText || !resumeText.trim()) {
      return NextResponse.json(
        { error: "Please paste or upload resume text." },
        { status: 400 }
      );
    }

    const role = JOB_ROLES.find((r) => r.id === targetId);

    if (!role) {
      return NextResponse.json(
        { error: "Selected role does not exist." },
        { status: 400 }
      );
    }

    let identifiedSkills: string[] = [];
    let isFallback = false;

    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("AI unavailable");
      }

      throw new Error("AI not implemented yet");
    } catch {
      isFallback = true;
      identifiedSkills = extractSkillsFallback(resumeText, role);
    }

    const learningGaps = role.requiredSkills.filter(
      (skill) => !identifiedSkills.includes(skill.name)
    );

    const roadmap = buildRoadmap(role, identifiedSkills);
    const readinessScore = calculateReadiness(role, identifiedSkills);
    const recommendedNextStep = getRecommendedNextStep(role, identifiedSkills);
    const interviewQuestions = generateInterviewQuestions(identifiedSkills);

    return NextResponse.json({
      roleTitle: role.title,
      identifiedSkills,
      learningGaps,
      roadmap,
      readinessScore,
      recommendedNextStep,
      interviewQuestions,
      isFallback
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze profile." },
      { status: 500 }
    );
  }
}