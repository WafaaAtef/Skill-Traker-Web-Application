"use client";

import { useState } from "react";

type Resource = {
  id: number;
  title: string;
  type: "Video" | "Article" | "Course";
  duration: string;
};

type Topic = {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  resources: Resource[];
};

type Level = {
  id: number;
  title: string;
  description: string;
  topics: Topic[];
};

const roadmapData: Level[] = [
  {
    id: 1,
    title: "Foundations",
    description: "Build the fundamentals before moving forward.",
    topics: [
      {
        id: 1,
        title: "How the Web Works",
        description:
          "Understand the internet, browsers, servers and how websites communicate.",
        estimatedTime: "3 days",
        resources: [
          {
            id: 1,
            title: "How the Internet Works",
            type: "Video",
            duration: "18 min",
          },
          {
            id: 2,
            title: "HTTP Fundamentals",
            type: "Article",
            duration: "15 min",
          },
        ],
      },

      {
        id: 2,
        title: "HTML Fundamentals",
        description:
          "Learn how web pages are structured and how semantic HTML works.",
        estimatedTime: "5 days",
        resources: [
          {
            id: 3,
            title: "HTML Crash Course",
            type: "Video",
            duration: "32 min",
          },
          {
            id: 4,
            title: "Semantic HTML",
            type: "Article",
            duration: "12 min",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: "Building Interfaces",
    description: "Start turning concepts into real interfaces.",
    topics: [
      {
        id: 3,
        title: "CSS Fundamentals",
        description:
          "Learn styling, layouts, responsive design and modern CSS.",
        estimatedTime: "7 days",
        resources: [
          {
            id: 5,
            title: "CSS Fundamentals",
            type: "Course",
            duration: "1h 20m",
          },
        ],
      },

      {
        id: 4,
        title: "Responsive Design",
        description:
          "Build interfaces that work beautifully across different screens.",
        estimatedTime: "4 days",
        resources: [
          {
            id: 6,
            title: "Responsive Web Design",
            type: "Video",
            duration: "40 min",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "JavaScript",
    description: "Add logic and interaction to your websites.",
    topics: [
      {
        id: 5,
        title: "JavaScript Fundamentals",
        description:
          "Variables, functions, arrays, objects and core programming concepts.",
        estimatedTime: "10 days",
        resources: [
          {
            id: 7,
            title: "JavaScript Fundamentals",
            type: "Course",
            duration: "2h",
          },
        ],
      },
    ],
  },
];

export default function Roadmap() {
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);

  const toggleTopic = (topicId: number) => {
    setCompletedTopics((current) =>
      current.includes(topicId)
        ? current.filter((id) => id !== topicId)
        : [...current, topicId]
    );
  };

  const totalTopics = roadmapData.reduce(
    (total, level) => total + level.topics.length,
    0
  );

  const progress = Math.round(
    (completedTopics.length / totalTopics) * 100
  );

  return (
    <main className="min-h-screen bg-[#B85F35] px-5 py-10 md:px-10">

      {/* Header */}

      <section className="mx-auto max-w-6xl">

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F5EBDD]/70">
              Your learning journey
            </p>

            <h1 className="font-serif text-5xl text-[#F5EBDD] md:text-6xl">
              Frontend
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#F5EBDD]/75">
              Follow your path step by step. Learn, practice and prove
              what you know before moving forward.
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


        {/* Roadmap */}

        <div className="relative">

          {/* Vertical path */}

          <div className="absolute left-[22px] top-0 hidden h-full w-px bg-[#F5EBDD]/30 md:block" />

          <div className="space-y-14">

            {roadmapData.map((level, levelIndex) => (

              <section
                key={level.id}
                className="relative"
              >

                {/* Level marker */}

                <div className="relative z-10 mb-7 flex items-center gap-5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4B5130] text-sm font-bold text-[#F5EBDD] shadow-lg">
                    {String(levelIndex + 1).padStart(2, "0")}
                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F5EBDD]/60">
                      Level {levelIndex + 1}
                    </p>

                    <h2 className="font-serif text-3xl text-[#F5EBDD]">
                      {level.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#F5EBDD]/65">
                      {level.description}
                    </p>

                  </div>

                </div>


                {/* Topics */}

                <div className="ml-0 space-y-4 md:ml-16">

                  {level.topics.map((topic) => {

                    const completed =
                      completedTopics.includes(topic.id);

                    return (

                      <article
                        key={topic.id}
                        className={`rounded-[28px] border p-6 transition ${
                          completed
                            ? "border-[#4B5130] bg-[#E8E2D3]"
                            : "border-[#D8CEBB] bg-[#F5EBDD]"
                        }`}
                      >

                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                          <div className="flex gap-4">

                            <button
                              onClick={() =>
                                toggleTopic(topic.id)
                              }
                              className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                                completed
                                  ? "border-[#4B5130] bg-[#4B5130] text-[#F5EBDD]"
                                  : "border-[#A6A18D] text-transparent hover:border-[#4B5130]"
                              }`}
                            >
                              ✓
                            </button>

                            <div>

                              <h3
                                className={`font-serif text-2xl ${
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

                              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#77745F]">
                                ⏱ {topic.estimatedTime}
                              </div>

                            </div>

                          </div>

                          <button className="rounded-full bg-[#4B5130] px-5 py-3 text-xs font-semibold text-[#F5EBDD] transition hover:bg-[#353827]">
                            Explore →
                          </button>

                        </div>


                        {/* Resources */}

                        <div className="mt-6 border-t border-[#D8CEBB] pt-5">

                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#77745F]">
                            Learning resources
                          </p>

                          <div className="grid gap-3 md:grid-cols-2">

                            {topic.resources.map((resource) => (

                              <button
                                key={resource.id}
                                className="flex items-center justify-between rounded-2xl bg-[#FBF7EF] px-4 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                              >

                                <div>

                                  <p className="text-sm font-semibold text-[#45482F]">
                                    {resource.title}
                                  </p>

                                  <p className="mt-1 text-xs text-[#77745F]">
                                    {resource.type} · {resource.duration}
                                  </p>

                                </div>

                                <span className="text-[#4B5130]">
                                  →
                                </span>

                              </button>

                            ))}

                          </div>

                        </div>

                      </article>

                    );
                  })}

                </div>

              </section>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}