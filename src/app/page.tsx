"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import { JOB_ROLES } from "@/lib/mockData";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [targetId, setTargetId] = useState("frontend");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "critical" | "important" | "optional">("all");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resumeText, targetId })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        setResult(null);
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to analyze profile.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setError("");

  if (file.name.endsWith(".txt")) {
    const text = await file.text();
    setResumeText(text);
    return;
  }

  setError("Please upload a .txt file.");
};

  const getPriorityStyle = (priority: "critical" | "important" | "optional") => {
    if (priority === "critical") return "border-red-500/30 bg-red-500/10 text-red-200";
    if (priority === "important") return "border-amber-500/30 bg-amber-500/10 text-amber-200";
    return "border-blue-500/30 bg-blue-500/10 text-blue-200";
  };

  const filteredGaps =
    result?.learningGaps.filter((gap) => filter === "all" || gap.priority === filter) || [];

  const filteredRoadmap =
    result?.roadmap.filter((item) => filter === "all" || item.priority === filter) || [];

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Career Navigation Platform
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Build a clearer path into your next role
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Paste a resume or upload a text or PDF file, compare your current skills against a target role, and get a focused career map.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 md:px-8">
        <div className="rounded-[28px] border border-white/10 bg-[#111114] p-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-zinc-500">
                Target Role
              </label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#18181b] px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {JOB_ROLES.map((role) => (
                  <option key={role.id} value={role.id} className="bg-[#18181b]">
                    {role.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-6">
              <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-zinc-500">
                Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste resume text, project experience, or a list of skills..."
                className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-[#18181b] px-4 py-3 text-sm placeholder:text-zinc-500 outline-none focus:border-blue-500"
              />
            </div>

            <div className="lg:col-span-3 flex flex-col gap-3">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Upload Resume
                </label>
                <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-[#18181b] px-4 py-3 text-sm text-zinc-200 hover:border-white/20">
                  Upload .txt or .pdf
                  <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || !resumeText.trim()}
                className="mt-auto rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-700"
              >
                {loading ? "Analyzing..." : "Generate Career Map"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-4 md:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Career Map</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {result ? result.roleTitle : "Your roadmap will appear here"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            {result
              ? "This view shows your matched skills, missing skills, roadmap suggestions, certifications, and interview prompts."
              : "Run an analysis to see your readiness score, skill gaps, roadmap, and interview questions."}
          </p>
        </div>

        {!result && !loading && (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-[#111114] px-6 py-16 text-center">
            <p className="text-lg text-zinc-300">No analysis yet</p>
            <p className="mt-2 text-sm text-zinc-500">
              Paste or upload resume text above, select a role, and generate your career map.
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-[28px] border border-blue-500/20 bg-[#111114] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Readiness Score</p>
                <p className="mt-3 text-5xl font-semibold">{result.readinessScore}%</p>
                <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${result.readinessScore}%` }}
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#111114] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Recommended Next Step</p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {result.recommendedNextStep}
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#111114] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">System Status</p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {result.isFallback
                    ? "Fallback mode was used. Skills were matched with rule-based extraction."
                    : "AI mode was used for analysis."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-[#111114] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Matched Skills</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.identifiedSkills.length > 0 ? (
                    result.identifiedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">No matching skills were found.</p>
                  )}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#111114] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Learning Gaps</p>
                    <p className="mt-2 text-sm text-zinc-400">Filter missing skills by priority.</p>
                  </div>

                  <select
                    value={filter}
                    onChange={(e) =>
                      setFilter(e.target.value as "all" | "critical" | "important" | "optional")
                    }
                    className="rounded-xl border border-white/10 bg-[#18181b] px-3 py-2 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="all" className="bg-[#18181b]">All</option>
                    <option value="critical" className="bg-[#18181b]">Critical</option>
                    <option value="important" className="bg-[#18181b]">Important</option>
                    <option value="optional" className="bg-[#18181b]">Optional</option>
                  </select>
                </div>

                <div className="mt-4 space-y-3">
                  {filteredGaps.length > 0 ? (
                    filteredGaps.map((gap) => (
                      <div
                        key={gap.name}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#18181b] px-4 py-4"
                      >
                        <span className="text-sm">{gap.name}</span>
                        <span
                          className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-wide ${getPriorityStyle(
                            gap.priority
                          )}`}
                        >
                          {gap.priority}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">No major learning gaps found.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-blue-500/15 bg-[#111114] p-6">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Roadmap</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Suggested resources, certifications, and project ideas for the missing skills in your target role.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredRoadmap.length > 0 ? (
                  filteredRoadmap.map((item) => (
                    <div
                      key={item.skill}
                      className="rounded-[24px] border border-white/10 bg-[#18181b] p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-medium">{item.skill}</h3>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${getPriorityStyle(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Project Idea</p>
                          <p className="mt-2 text-sm leading-6 text-zinc-200">{item.projectIdea}</p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
                            Suggested Resources
                          </p>
                          <div className="space-y-2">
                            {item.resources.length > 0 ? (
                              item.resources.map((resource, index) => (
                                <div
                                  key={index}
                                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-zinc-300"
                                >
                                  {resource}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-zinc-500">No resources added yet.</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
                            Certifications
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.certifications.length > 0 ? (
                              item.certifications.map((cert, index) => (
                                <span
                                  key={index}
                                  className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200"
                                >
                                  {cert}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-zinc-500">No certification suggested.</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">No roadmap items match this filter.</p>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#111114] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Mock Interview Pivot</p>
              <p className="mt-2 text-sm text-zinc-400">
                Questions generated from the skills already detected in the profile.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {result.interviewQuestions.length > 0 ? (
                  result.interviewQuestions.map((item, index) => (
                    <div
                      key={`${item.skill}-${index}`}
                      className="rounded-2xl border border-white/10 bg-[#18181b] p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {item.skill}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-zinc-200">
                        {item.question}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    No interview questions yet because no matching skills were found.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}