"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";


type CatalogSkill = { 
  id: string; 
  name: string;
  category: string;
}; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function SkillSetup() {
  const router = useRouter();

   const [category, setCategory] = useState("");
  const [skillId, setSkillId] = useState(""); 

  const [months, setMonths] = useState("");
  const [weeks, setWeeks] = useState("0");

  const [skillCatalog, setSkillCatalog] = useState<CatalogSkill[]>([]);
  const [catalogError, setCatalogError] = useState(""); 
  
 useEffect(() => {
    const fetchSkillCatalog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/userApi/skills`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/welcomePage");
          return;
        }

        if (!res.ok) throw new Error(`Failed to load skills: ${res.status}`);

        const data = await res.json();
        setSkillCatalog(data.skills || []);
      } catch (err) {
        console.error("Error fetching skill catalog:", err);
        setCatalogError("Couldn't load the skill list. Try refreshing.");
      }
    };

    fetchSkillCatalog();
  }, [router]);

  const categories = useMemo(
    () => Array.from(new Set(skillCatalog.map((s) => s.category).filter(Boolean))),
    [skillCatalog]
  );

   const availableSkills = useMemo(() => {
    if (!category) return [];
    return skillCatalog.filter((s) => s.category === category);
  }, [category, skillCatalog]);

   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    setSkillId("");
  };

  const isFormValid = category !== "" && skillId !== "" && months !== "";

  const handleGetRoadmap = async () => {
    if (!isFormValid) return;

    try {
      const res = await fetch(`${API_BASE_URL}/userApi/user/skills`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId }), 
      });

      if (res.status === 401) {
        router.push("/welcomePage");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Failed to create skill: ${res.status}`);
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Error creating skill:", err);
      setCatalogError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
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
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
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
                  value={skillId}
                  onChange={(e) => setSkillId(e.target.value)}
                  disabled={!category}
                  className="w-full rounded-2xl border border-[#D8CEBB] bg-[#FBF7EF] px-4 py-4 text-sm text-[#45482F] outline-none transition focus:border-[#4B5130] focus:ring-2 focus:ring-[#4B5130]/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{category ? "Choose a skill" : "Choose a field first"}</option>
                  {availableSkills.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>

                {catalogError && (
                  <p className="mt-3 text-sm text-red-600">{catalogError}</p>
                )}
              </div>

            </div>

            {/* Divider */}
            <div className="my-9 h-px bg-[#D8CEBB]" />

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