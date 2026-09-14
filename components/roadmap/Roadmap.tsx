
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Resource = {
  _id: string;
  title: string;
  type:
    | "video"
    | "article"
    | "course"
    | "book"
    | "documentation"
    | "other";
  url: string;
  duration?: number;
};

type Topic = {
  _id: string;
  title: string;
  description: string;
  estimatedTime?: number;
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
  levels: Level[];
};

export default function Roadmap() {
  const searchParams = useSearchParams();

  const trackId = searchParams.get("trackId");
  const months = Number(searchParams.get("months") || 0);
  const weeks = Number(searchParams.get("weeks") || 0);

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(
    null
  );

  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!trackId) {
      setError("No track selected.");
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

        const data = await response.json();

        console.log("Roadmap from backend:", data);

        setRoadmap(data.roadmap);
      } catch (error) {
        console.error(error);
        setError("Unable to load roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [API_URL, trackId]);

  const levels = useMemo(() => {
    if (!roadmap) return [];

    return [...roadmap.levels].sort(
      (a, b) => a.order - b.order
    );
  }, [roadmap]);

  const totalTopics = levels.reduce(
    (total, level) => total + level.topics.length,
    0
  );

  const progress =
    totalTopics === 0
      ? 0
      : Math.round(
          (completedTopics.length / totalTopics) * 100
        );

  const selectedLevel = levels.find(
    (level) => level._id === selectedLevelId
  );

  const totalWeeks = months * 4 + weeks;

  /*
   * Frontend-only time distribution.
   *
   * We distribute the available time equally
   * between levels for now.
   *
   * Later we can improve this by using
   * topic complexity or estimated time.
   */
  const levelTime = levels.length
    ? totalWeeks / levels.length
    : 0;

  const toggleTopic = (topicId: string) => {
    setCompletedTopics((current) =>
      current.includes(topicId)
        ? current.filter((id) => id !== topicId)
        : [...current, topicId]
    );
  };

  const completeLevel = (level: Level) => {
    const topicIds = level.topics.map(
      (topic) => topic._id
    );

    setCompletedTopics((current) => [
      ...new Set([...current, ...topicIds]),
    ]);

    setCompletedLevels((current) => [
      ...new Set([...current, level._id]),
    ]);
  };

  const goToNextLevel = () => {
    if (!selectedLevel) return;

    const currentIndex = levels.findIndex(
      (level) => level._id === selectedLevel._id
    );

    const nextLevel = levels[currentIndex + 1];

    if (nextLevel) {
      setSelectedLevelId(nextLevel._id);
    } else {
      setSelectedLevelId(null);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#B85F35]">
        <p className="font-serif text-2xl text-[#F5EBDD]">
          Building your roadmap...
        </p>
      </main>
    );
  }

  if (error || !roadmap) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#B85F35] px-5">

        <div className="rounded-[28px] bg-[#F5EBDD] p-8 text-center">

          <h1 className="font-serif text-3xl text-[#353827]">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm text-[#77745F]">
            {error || "Roadmap not found."}
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#B85F35] px-5 py-10 md:px-10">

      <section className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F5EBDD]/70">
              Your learning journey
            </p>

            <h1 className="font-serif text-5xl text-[#F5EBDD] md:text-6xl">
              {roadmap.title}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#F5EBDD]/75">
              {roadmap.description}
            </p>

          </div>

          {/* Progress */}

          <div className="rounded-3xl bg-[#F5EBDD] px-6 py-5 text-[#353827]">

            <p className="text-xs uppercase tracking-[0.2em] text-[#77745F]">
              Progress
            </p>

            <div className="mt-2 flex items-end gap-2">

              <span className="font-serif text-3xl">
                {progress}%
              </span>

              <span className="mb-1 text-xs text-[#77745F]">
                completed
              </span>

            </div>

            <div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-[#D8CEBB]">

              <div
                className="h-full rounded-full bg-[#4B5130] transition-all"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

        </div>

        {/* =============================== */}
        {/* LEVEL SELECTION */}
        {/* =============================== */}

        {!selectedLevel && (

          <div>

            <div className="mb-8">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F5EBDD]/60">
                Your roadmap
              </p>

              <h2 className="mt-2 font-serif text-4xl text-[#F5EBDD]">
                Choose your level
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#F5EBDD]/70">
                Move through each level at your own pace. You can always
                come back to a level you have already completed.
              </p>

            </div>

            <div className="space-y-5">

              {levels.map((level, index) => {

                const completed =
                  completedLevels.includes(level._id);

                const topicsCount =
                  level.topics.length;

                const estimatedLevelWeeks =
                  levelTime > 0
                    ? Math.max(1, Math.round(levelTime))
                    : 0;

                return (

                  <button
                    key={level._id}
                    onClick={() =>
                      setSelectedLevelId(level._id)
                    }
                    className="group w-full rounded-[30px] bg-[#F5EBDD] p-6 text-left transition hover:-translate-y-1 hover:shadow-xl md:p-8"
                  >

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                      <div className="flex items-start gap-5">

                        {/* Number */}

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            completed
                              ? "bg-[#4B5130] text-[#F5EBDD]"
                              : "bg-[#D8CEBB] text-[#45482F]"
                          }`}
                        >
                          {completed
                            ? "✓"
                            : String(index + 1).padStart(2, "0")}
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77745F]">
                            Level {index + 1}
                          </p>

                          <h3 className="mt-1 font-serif text-3xl text-[#353827]">
                            {level.title}
                          </h3>

                          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77745F]">
                            {level.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#77745F]">

                            <span>
                              {topicsCount}{" "}
                              {topicsCount === 1
                                ? "topic"
                                : "topics"}
                            </span>

                            {estimatedLevelWeeks > 0 && (
                              <span>
                                ~ {estimatedLevelWeeks}{" "}
                                {estimatedLevelWeeks === 1
                                  ? "week"
                                  : "weeks"}
                              </span>
                            )}

                          </div>

                        </div>

                      </div>

                      <span className="shrink-0 rounded-full bg-[#4B5130] px-5 py-3 text-xs font-semibold text-[#F5EBDD] transition group-hover:bg-[#353827]">
                        {completed
                          ? "Review Level →"
                          : "Start Level →"}
                      </span>

                    </div>

                  </button>

                );
              })}

            </div>

          </div>

        )}

        {/* =============================== */}
        {/* SELECTED LEVEL */}
        {/* =============================== */}

        {selectedLevel && (

          <div>

            {/* Back */}

            <button
              onClick={() => setSelectedLevelId(null)}
              className="mb-8 text-sm font-semibold text-[#F5EBDD]/80 transition hover:text-[#F5EBDD]"
            >
              ← Back to levels
            </button>

            {/* Level Header */}

            <div className="mb-8 rounded-[30px] bg-[#F5EBDD] p-7 md:p-9">

              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#77745F]">
                    Level{" "}
                    {levels.findIndex(
                      (level) =>
                        level._id === selectedLevel._id
                    ) + 1}
                  </p>

                  <h2 className="mt-2 font-serif text-4xl text-[#353827]">
                    {selectedLevel.title}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#77745F]">
                    {selectedLevel.description}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#E8E2D3] px-5 py-4">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#77745F]">
                    Topics
                  </p>

                  <p className="mt-1 font-serif text-2xl text-[#353827]">
                    {selectedLevel.topics.length}
                  </p>

                </div>

              </div>

            </div>

            {/* Topics */}

            <div className="space-y-4">

              {[...selectedLevel.topics]
                .sort((a, b) => a.order - b.order)
                .map((topic, topicIndex) => {

                  const completed =
                    completedTopics.includes(topic._id);

                  return (

                    <article
                      key={topic._id}
                      className={`rounded-[28px] border p-6 transition ${
                        completed
                          ? "border-[#4B5130] bg-[#E8E2D3]"
                          : "border-[#D8CEBB] bg-[#F5EBDD]"
                      }`}
                    >

                      <div className="flex gap-4">

                        {/* Checkbox */}

                        <button
                          onClick={() =>
                            toggleTopic(topic._id)
                          }
                          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                            completed
                              ? "border-[#4B5130] bg-[#4B5130] text-[#F5EBDD]"
                              : "border-[#A6A18D] text-transparent hover:border-[#4B5130]"
                          }`}
                        >
                          ✓
                        </button>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">

                            <div>

                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#77745F]">
                                Topic {topicIndex + 1}
                              </p>

                              <h3
                                className={`mt-1 font-serif text-2xl ${
                                  completed
                                    ? "text-[#77745F] line-through"
                                    : "text-[#353827]"
                                }`}
                              >
                                {topic.title}
                              </h3>

                              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77745F]">
                                {topic.description}
                              </p>

                            </div>

                            {topic.estimatedTime !==
                              undefined && (

                              <span className="shrink-0 text-xs font-semibold text-[#77745F]">
                                ⏱ {topic.estimatedTime}
                              </span>

                            )}

                          </div>

                          {/* Resources */}

                          <div className="mt-6 border-t border-[#D8CEBB] pt-5">

                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#77745F]">
                              Learning resources
                            </p>

                            <div className="grid gap-3 md:grid-cols-2">

                              {topic.resources.map(
                                (resource) => (

                                  <a
                                    key={resource._id}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between rounded-2xl bg-[#FBF7EF] px-4 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                                  >

                                    <div>

                                      <p className="text-sm font-semibold text-[#45482F]">
                                        {resource.title}
                                      </p>

                                      <p className="mt-1 text-xs text-[#77745F]">
                                        {resource.type}

                                        {resource.duration !==
                                          undefined &&
                                          ` · ${resource.duration} min`}
                                      </p>

                                    </div>

                                    <span className="text-[#4B5130]">
                                      →
                                    </span>

                                  </a>

                                )
                              )}

                            </div>

                          </div>

                        </div>

                      </div>

                    </article>

                  );
                })}

            </div>

            {/* Level Navigation */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() =>
                  completeLevel(selectedLevel)
                }
                className="flex-1 rounded-full bg-[#4B5130] px-6 py-4 text-sm font-semibold text-[#F5EBDD] transition hover:bg-[#353827]"
              >
                Mark Level Complete ✓
              </button>

              <button
                onClick={goToNextLevel}
                className="flex-1 rounded-full border border-[#F5EBDD]/40 px-6 py-4 text-sm font-semibold text-[#F5EBDD] transition hover:bg-[#F5EBDD]/10"
              >
                {levels.findIndex(
                  (level) =>
                    level._id === selectedLevel._id
                ) === levels.length - 1
                  ? "Back to Levels"
                  : "Continue to Next Level →"}
              </button>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}

