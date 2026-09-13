"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Track = {
  _id: string;
  skill: string;
  name: string;
  description: string;
};

export default function SkillSetup() {
  const router = useRouter();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState("");

  const [months, setMonths] = useState("");
  const [weeks, setWeeks] = useState("0");

  const [loadingTracks, setLoadingTracks] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoadingTracks(true);
        setError("");

        const response = await fetch(
          `${API_URL}/userApi/GetTracks`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tracks");
        }

        const data = await response.json();

        setTracks(data.tracks);
      } catch (error) {
        console.error(error);
        setError("Unable to load tracks.");
      } finally {
        setLoadingTracks(false);
      }
    };

    fetchTracks();
  }, [API_URL]);

  const isFormValid =
    selectedTrackId !== "" &&
    months !== "";

  const handleGetRoadmap = () => {
    if (!isFormValid) return;

    router.push(`/roadmap?trackId=${selectedTrackId}`);
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

            {/* Track */}
            <div>

              <label
                htmlFor="track"
                className="mb-2 block text-sm font-semibold text-[#45482F]"
              >
                What do you want to learn?
              </label>

              <select
                id="track"
                value={selectedTrackId}
                onChange={(event) =>
                  setSelectedTrackId(event.target.value)
                }
                disabled={loadingTracks}
                className="w-full rounded-2xl border border-[#D8CEBB] bg-[#FBF7EF] px-4 py-4 text-sm text-[#45482F] outline-none transition focus:border-[#4B5130] focus:ring-2 focus:ring-[#4B5130]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <option value="">
                  {loadingTracks
                    ? "Loading tracks..."
                    : "Choose a track"}
                </option>

                {tracks.map((track) => (
                  <option key={track._id} value={track._id}>
                    {track.name}
                  </option>
                ))}

              </select>

              {error && (
                <p className="mt-2 text-sm text-red-700">
                  {error}
                </p>
              )}

              {selectedTrackId && (
                <p className="mt-3 text-sm leading-6 text-[#77745F]">
                  {
                    tracks.find(
                      (track) => track._id === selectedTrackId
                    )?.description
                  }
                </p>
              )}

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

                <DurationSelect
                  label="Months"
                  value={months}
                  onChange={setMonths}
                  min={1}
                  max={6}
                />

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