type OnboardingCardProps = {
  title: string;
  highlight?: string;
  description: string;
  step: number;
  totalSteps: number;
  image: string;
  features: {
    title: string;
    description: string;
  }[];
};

export default function OnboardingCard({
  title,
  highlight,
  description,
  step,
  totalSteps,
  image,
  features,
}: OnboardingCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[#F5EBDD] p-5 shadow-2xl shadow-black/10 md:p-8 lg:p-10">

      {/* Top progress */}
      <div className="mb-7 flex items-center justify-center gap-3">
        <span className="text-sm font-medium text-[#3F4228]">
          {step} / {totalSteps}
        </span>

        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === step - 1
                  ? "w-10 bg-[#4B5130]"
                  : "w-7 bg-[#D8CEBB]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="grid items-center gap-10 md:grid-cols-2">

        {/* Image */}
        <div className="relative flex justify-center">
          <div className="absolute -left-3 top-6 h-32 w-32 rounded-full bg-[#DED0B8] opacity-70" />

          <div className="relative h-[360px] w-full max-w-[400px] overflow-hidden rounded-[45%_45%_35%_35%] bg-[#4B5130]">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Decorative line */}
          <div className="absolute -bottom-3 left-4 h-24 w-24 rounded-full border border-[#C26A3D] opacity-70" />
        </div>

        {/* Text */}
        <div className="flex flex-col">

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#77745F]">
            Your learning journey
          </p>

          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-[#353827] md:text-5xl lg:text-6xl">
            {title}

            {highlight && (
              <>
                <br />
                <span className="text-[#B65F36]">{highlight}</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#656555] md:text-lg">
            {description}
          </p>

          {/* Features */}
          <div className="mt-7 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4B5130] text-[#F5EBDD]">
                  ✓
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#45482F]">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-[#77745F]">
                    {feature.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}