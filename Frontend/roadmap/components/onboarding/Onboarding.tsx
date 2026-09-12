"use client";

import { useState } from "react";
import OnboardingCard from "./OnboardingCard";
import { useRouter } from "next/navigation";

const onboardingSteps = [
  {
    title: "Choose Your",
    highlight: "Skill",
    description:
      "عندك مهارة نفسك تبدأها؟ اختارها. وإحنا نساعدك تكملها للآخر — من غير تشتت ولا ضياع بين المصادر.",
    image: "/onboarding/1.jpeg",

    features: [
      {
        title: "Your Path, Your Choice",
        description: "اختار المهارة اللي فعلًا نفسك تطورها.",
      },
      {
        title: "Stay Focused",
        description: "خطة واضحة تساعدك تتعلم من غير تشتت.",
      },
      {
        title: "Keep Moving",
        description: "خطوات منظمة تخليك تكمل رحلتك للآخر.",
      },
    ],
  },

  {
    title: "Set Your Goal.",
    highlight: "We’ll Map the Way.",
    description:
      "حدد الوقت اللي عايز تكتسب فيه المهارة، وإحنا نحول هدفك لـ رود ماب واضحة بمواضيع ووقت محدد لكل خطوة.",

    image: "/onboarding/2.jpeg",

    features: [
      {
        title: "Set Your Pace",
        description: "حدد المدة المناسبة ليك ولوقتك.",
      },
      {
        title: "Clear Roadmap",
        description: "كل Topic له مكان واضح في رحلتك.",
      },
      {
        title: "No Random Learning",
        description: "تعلم بالترتيب بدل ما تتنقل بين مصادر عشوائية.",
      },
    ],
  },

  {
    title: "Learn.",
    highlight: "Then Build.",
    description:
      "لكل توبيك تاسك و مصادر وفيديوهات موثوقة تساعدك تتعلم صح، وبعدها  يحول اللي اتعلمته لمهارة عملية.",

    image: "/onboarding/3.jpeg",

    features: [
      {
        title: "Curated Resources",
        description: "مصادر وفيديوهات مختارة لكل Topic.",
      },
      {
        title: "Learn by Doing",
        description: "حوّل المعرفة إلى تطبيق عملي.",
      },
      {
        title: "Build Real Skills",
        description: "مشاهدة المحتوى وحدها مش كفاية.",
      },
    ],
  },

  {
    title: "Test.",
    highlight: "Unlock. Level Up.",
    description:
      "اختبر فهمك بعد كل Level. اثبت إنك جاهز، افتح المستوى الجديد، وكمل رحلتك خطوة بخطوة.",

    image: "/onboarding/4.jpeg",

    features: [
      {
        title: "Test Your Knowledge",
        description: "اختبر المعلومات اللي اتعلمتها.",
      },
      {
        title: "Unlock The Next Level",
        description: "اجتز الاختبار وانتقل للمرحلة التالية.",
      },
      {
        title: "Grow Step by Step",
        description: "ابني مهارتك Level بعد Level.",
      },
    ],
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const currentCard = onboardingSteps[currentStep];

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/skills");
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    router.push("/skills");
  };

  return (
    <main className="min-h-screen bg-[#B85F35] px-5 py-6 md:px-10 md:py-8">

      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
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

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="rounded-full border border-[#F5EBDD]/60 px-5 py-2.5 text-sm font-medium text-[#F5EBDD] transition hover:bg-[#F5EBDD] hover:text-[#4B5130]"
        >
          Skip →
        </button>

      </header>

      {/* Card */}
      <section className="mx-auto mt-8 max-w-6xl md:mt-12">

        <OnboardingCard
          title={currentCard.title}
          highlight={currentCard.highlight}
          description={currentCard.description}
          image={currentCard.image}
          features={currentCard.features}
          step={currentStep + 1}
          totalSteps={onboardingSteps.length}
        />

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between">

          {/* Back */}
          <button
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="rounded-full border border-[#F5EBDD]/50 px-6 py-3 text-sm font-medium text-[#F5EBDD] transition hover:bg-[#F5EBDD] hover:text-[#4B5130] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Back
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                aria-label={`Go to step ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-7 bg-[#F5EBDD]"
                    : "w-2.5 bg-[#F5EBDD]/40"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={handleNext}
            className="rounded-full bg-[#4B5130] px-7 py-3 text-sm font-semibold text-[#F5EBDD] shadow-lg transition hover:bg-[#3D4227]"
          >
            {isLastStep ? "Start Learning →" : "Next →"}
          </button>

        </div>

      </section>

    </main>
  );
}