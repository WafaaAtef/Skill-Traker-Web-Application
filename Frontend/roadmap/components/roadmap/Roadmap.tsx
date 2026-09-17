"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Resource = {
  _id: string;
  title: string;
  type: string;
  url: string;
  duration?: number;
};

type Topic = {
  _id: string;
  title: string;
  description: string;
  estimatedTime: number;
  order: number;
  resources: Resource[];
};

type Level = {
  _id: string;
  title: string;
  description: string;
  order: number;
  topics: Topic[];
};

type Roadmap = {
  _id: string;
  title: string;
  description: string;
  track: string;
  level: {
    _id: string;
    title: string;
    order: number;
  };
  levels: Level[];
};

type Timeline = {
  months: number;
  weeks: number;
  totalWeeks: number;
};

type RoadmapResponse = {
  roadmap: Roadmap;
  timeline: Timeline;
};

export default function RoadmapPage() {
  const searchParams = useSearchParams();

  const trackId = searchParams.get("trackId");

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);

  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!trackId) {
      setError("Track not found.");
      setLoading(false);
      return;
    }

    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/userApi/GetRoadmaps/${trackId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch roadmap");
        }

        const data: RoadmapResponse = await response.json();

        setRoadmap(data.roadmap);
        setTimeline(data.timeline);
      } catch (error) {
        console.error(error);
        setError("Unable to load roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [API_URL, trackId]);

  const handleCompleteTopic = async (topicId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/userApi/completeTopic/${topicId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete topic");
      }

      setCompletedTopics((previous) => [
        ...previous,
        topicId,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#B85F35] px-5 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-[#F5EBDD]/80">
            Loading your roadmap...
          </p>
        </div>
      </main>
    );
  }

  if (error || !roadmap) {
    return (
      <main className="min-h-screen bg-[#B85F35] px-5 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-[#F5EBDD]">
            {error || "Roadmap not found."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#B85F35] px-5 py-10 md:px-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-12">

          <div className="flex items-center gap-3 text-[#F5EBDD]">

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5EBDD]/50 text-lg">
              ✦
            </div>

            <div>
              <h2 className="font-serif text-xl leading-none md:text-2xl">
                SkillRoadmap
              </h2>

              <p className="mt-1 text-[9px] uppercase tracking-[0.3em] opacity-80">
                Learn · Practice · Grow
              </p>
            </div>

          </div>

        </header>

        {/* Intro */}
        <section className="mb-12">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5EBDD]/70">
            Your learning journey
          </p>

          <h1 className="mt-3 font-serif text-5xl leading-tight text-[#F5EBDD] md:text-6xl">
            {roadmap.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#F5EBDD]/75 md:text-base">
            {roadmap.description}
          </p>

          {/* Timeline */}
          {timeline && (
            <div className="mt-6 inline-flex items-center gap-4 rounded-full bg-[#4B5130] px-5 py-3 text-sm text-[#F5EBDD]">

              <span>
                {timeline.months}{" "}
                {timeline.months === 1 ? "month" : "months"}
              </span>

              {timeline.weeks > 0 && (
                <>
                  <span className="opacity-40">·</span>

                  <span>
                    {timeline.weeks}{" "}
                    {timeline.weeks === 1 ? "week" : "weeks"}
                  </span>
                </>
              )}

              <span className="opacity-40">·</span>

              <span>
                {timeline.totalWeeks} total weeks
              </span>

            </div>
          )}

        </section>

        {/* LEVELS */}
        {!selectedLevel ? (

          <section>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5EBDD]/70">
                Choose your focus
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {roadmap.levels
                .sort((a, b) => a.order - b.order)
                .map((level, index) => (

                  <button
                    key={level._id}
                    onClick={() => setSelectedLevel(level)}
                    className="group rounded-[28px] bg-[#F5EBDD] p-7 text-left transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >

                    <div className="flex items-start justify-between">

                      <span className="font-serif text-4xl text-[#B85F35]/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xl text-[#4B5130] transition group-hover:translate-x-1">
                        ↗
                      </span>

                    </div>

                    <h2 className="mt-8 font-serif text-2xl text-[#353827]">
                      {level.title}
                    </h2>

                    <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#77745F]">
                      {level.description}
                    </p>

                    <p className="mt-5 text-sm text-[#77745F]">
                      {level.topics.length}{" "}
                      {level.topics.length === 1
                        ? "topic"
                        : "topics"}
                    </p>

                    <div className="mt-7 text-sm font-semibold text-[#4B5130]">
                      Open Focus →
                    </div>

                  </button>

                ))}

            </div>

          </section>

        ) : (

          /* SELECTED LEVEL */
          <section>

            <button
              onClick={() => setSelectedLevel(null)}
              className="mb-8 text-sm font-semibold text-[#F5EBDD]/80 transition hover:text-[#F5EBDD]"
            >
              ← Back to focuses
            </button>

            <div className="mb-8">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5EBDD]/70">
                Focus {String(selectedLevel.order).padStart(2, "0")}
              </p>

              <h2 className="mt-2 font-serif text-4xl text-[#F5EBDD] md:text-5xl">
                {selectedLevel.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#F5EBDD]/75">
                {selectedLevel.description}
              </p>

            </div>

            <div className="rounded-[32px] bg-[#F5EBDD] p-6 md:p-10">

              <div className="space-y-4">

                {selectedLevel.topics
                  .sort((a, b) => a.order - b.order)
                  .map((topic) => {

                    const isCompleted =
                      completedTopics.includes(topic._id);

                    return (
                      <div
                        key={topic._id}
                        className="rounded-2xl border border-[#D8CEBB] bg-[#FBF7EF] p-5"
                      >

                        <div className="flex items-start gap-4">

                          {/* Complete */}
                          <button
                            onClick={() =>
                              handleCompleteTopic(topic._id)
                            }
                            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                              isCompleted
                                ? "bg-[#4B5130] text-[#F5EBDD]"
                                : "border border-[#B8AF9E] text-[#77745F] hover:border-[#4B5130] hover:text-[#4B5130]"
                            }`}
                          >
                            {isCompleted ? "✓" : "○"}
                          </button>

                          {/* Topic */}
                          <div className="flex-1">

                            <div className="flex flex-col justify-between gap-2 sm:flex-row">

                              <h3
                                className={`font-semibold ${
                                  isCompleted
                                    ? "text-[#77745F] line-through"
                                    : "text-[#353827]"
                                }`}
                              >
                                {topic.title}
                              </h3>

                              <span className="text-xs text-[#77745F]">
                                {topic.estimatedTime} min
                              </span>

                            </div>

                            <p className="mt-2 text-sm leading-6 text-[#77745F]">
                              {topic.description}
                            </p>

                            {/* Resources */}
                            {topic.resources.length > 0 && (
                              <div className="mt-4">

                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#77745F]">
                                  Resources
                                </p>

                                <div className="space-y-2">

                                  {topic.resources.map(
                                    (resource) => (

                                      <a
                                        key={resource._id}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-xl border border-[#D8CEBB] bg-white/40 px-4 py-3 text-sm transition hover:border-[#4B5130]"
                                      >

                                        <div>
                                          <p className="font-medium text-[#45482F]">
                                            {resource.title}
                                          </p>

                                          <p className="mt-1 text-xs uppercase tracking-wide text-[#77745F]">
                                            {resource.type}
                                          </p>
                                        </div>

                                        <span className="text-[#4B5130]">
                                          ↗
                                        </span>

                                      </a>

                                    )
                                  )}

                                </div>

                              </div>
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  })}

              </div>

              {/* Continue */}
              <button
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#4B5130] px-6 py-4 text-sm font-semibold text-[#F5EBDD] transition hover:bg-[#3D4227]"
              >
                Continue
                <span className="text-lg">
                  →
                </span>
              </button>

            </div>

          </section>

        )}

      </div>

    </main>
  );
}