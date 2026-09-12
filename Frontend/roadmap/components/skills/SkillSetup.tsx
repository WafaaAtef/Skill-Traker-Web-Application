"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const skillOptions = {
  Frontend: [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Next.js",
  ],

  Backend: [
    "Node.js",
    "Express.js",
    "Databases",
    "APIs",
  ],

  "AI & Machine Learning": [
    "Python for AI",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
  ],

  "Cyber Security": [
    "Networking",
    "Web Security",
    "Cryptography",
    "Ethical Hacking",
  ],

  English: [
    "Reading",
    "Writing",
    "Listening",
    "Speaking",
  ],
};

type SkillCategory = keyof typeof skillOptions;

export default function SkillSetup() {
  const router = useRouter();

  const [category, setCategory] = useState<SkillCategory | "">("");
  const [skill, setSkill] = useState("");

  // Months are required
  const [months, setMonths] = useState("");

  // Weeks are optional
  const [weeks, setWeeks] = useState("0");

  const availableSkills = useMemo(() => {
    if (!category) return [];

    return skillOptions[category];
  }, [category]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value as SkillCategory;

    setCategory(value);
    setSkill("");
  };

  const isFormValid =
    category !== "" &&
    skill !== "" &&
    months !== "";

  const handleGetRoadmap = () => {
    if (!isFormValid) return;

    const learningPlan = {
      category,
      skill,
      duration: {
        months: Number(months),
        weeks: Number(weeks),
      },
    };

    console.log("Learning Plan:", learningPlan);

    // Temporary navigation.
    // Later the backend API will be called here.
    router.push("/roadmap");
  };

  return (
    <main className="min-h-screen bg-[#B85F35] px-5 py-8 md:px-10">

      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between">

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

      {/* Main */}
      <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-6xl items-center justify-center py-10">

        <div className="w-full max-w-4xl">

          {/* Intro */}
          <div className="mb-8 text-center">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F5EBDD]/75">
              Your learning journey
            </p>

            <h1 className="font-serif text-5xl leading-tight text-[#F5EBDD] md:text-6xl">
              Build a skill.
              <br />

              <span className="text-[#E5C7A7]">
                We’ll map the way.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#F5EBDD]/75 md:text-base">
              Choose what you want to learn and tell us how much time
              you have. We’ll turn your goal into a clear learning roadmap.
            </p>

          </div>

          {/* Setup Card */}
          <div className="rounded-[32px] bg-[#F5EBDD] p-6 shadow-2xl shadow-black/15 md:p-10">

            {/* Step */}
            <div className="mb-8 flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77745F]">
                  Step 01
                </p>

                <h2 className="mt-1 font-serif text-2xl text-[#353827]">
                  Define your goal
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4B5130] text-[#F5EBDD]">
                ✦
              </div>

            </div>

            {/* Fields */}
            <div className="grid gap-6 md:grid-cols-2">

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-[#45482F]"
                >
                  What do you want to learn?
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full rounded-2xl border border-[#D8CEBB] bg-[#FBF7EF] px-4 py-4 text-sm text-[#45482F] outline-none transition focus:border-[#4B5130] focus:ring-2 focus:ring-[#4B5130]/10"
                >
                  <option value="">Choose a field</option>

                  <option value="Frontend">
                    Frontend Development
                  </option>

                  <option value="Backend">
                    Backend Development
                  </option>

                  <option value="AI & Machine Learning">
                    AI & Machine Learning
                  </option>

                  <option value="Cyber Security">
                    Cyber Security
                  </option>

                  <option value="English">
                    English
                  </option>
                </select>
              </div>

              {/* Skill */}
              <div>
                <label
                  htmlFor="skill"
                  className="mb-2 block text-sm font-semibold text-[#45482F]"
                >
                  Choose your focus
                </label>

                <select
                  id="skill"
                  value={skill}
                  onChange={(event) => setSkill(event.target.value)}
                  disabled={!category}
                  className="w-full rounded-2xl border border-[#D8CEBB] bg-[#FBF7EF] px-4 py-4 text-sm text-[#45482F] outline-none transition focus:border-[#4B5130] focus:ring-2 focus:ring-[#4B5130]/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {category
                      ? "Choose a skill"
                      : "Choose a field first"}
                  </option>

                  {availableSkills.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Divider */}
            <div className="my-9 h-px bg-[#D8CEBB]" />

            {/* Duration */}
            <div>

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77745F]">
                  Learning pace
                </p>

                <h2 className="mt-1 font-serif text-2xl text-[#353827]">
                  How much time do you have?
                </h2>

                <p className="mt-2 text-sm text-[#77745F]">
                  Set your timeline and we’ll structure your roadmap around it.
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* Months */}
                <DurationSelect
                  label="Months"
                  value={months}
                  onChange={setMonths}
                  min={1}
                  max={6}
                />

                {/* Weeks */}
                <DurationSelect
                  label="Weeks"
                  value={weeks}
                  onChange={setWeeks}
                  min={0}
                  max={4}
                />

              </div>

            </div>

            {/* Plan Preview */}
            {months && (
              <div className="mt-6 rounded-2xl bg-[#4B5130] p-5 text-[#F5EBDD]">

                <p className="text-xs uppercase tracking-[0.2em] opacity-70">
                  Your learning plan
                </p>

                <div className="mt-2 font-serif text-xl">
                  {months}{" "}
                  {Number(months) === 1 ? "month" : "months"}

                  {Number(weeks) > 0 && (
                    <>
                      {" · "}
                      {weeks}{" "}
                      {Number(weeks) === 1 ? "week" : "weeks"}
                    </>
                  )}
                </div>

              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleGetRoadmap}
              disabled={!isFormValid}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#4B5130] px-6 py-4 text-sm font-semibold text-[#F5EBDD] transition hover:bg-[#3D4227] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Get My Roadmap
              <span className="text-lg">→</span>
            </button>

          </div>

          <p className="mt-6 text-center font-serif text-lg italic text-[#F5EBDD]/80">
            One skill. One roadmap. No distractions.
          </p>

        </div>

      </section>

    </main>
  );
}


/* -------------------------------- */
/* Duration Select Component        */
/* -------------------------------- */

type DurationSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
};

function DurationSelect({
  label,
  value,
  onChange,
  min,
  max,
}: DurationSelectProps) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#77745F]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#D8CEBB] bg-[#FBF7EF] px-4 py-4 text-sm text-[#45482F] outline-none transition focus:border-[#4B5130] focus:ring-2 focus:ring-[#4B5130]/10"
      >

        {min === 0 && <option value="0">0</option>}

        {Array.from(
          { length: max - min + 1 },
          (_, index) => index + min
        ).map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}

      </select>

    </div>
  );
}