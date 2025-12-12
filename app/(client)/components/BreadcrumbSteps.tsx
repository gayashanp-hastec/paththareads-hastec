"use client";

interface BreadcrumbStepsProps {
  steps: string[];
  currentStep: number;
}

export default function BreadcrumbSteps({
  steps,
  currentStep,
}: BreadcrumbStepsProps) {
  return (
    <div className="w-full flex justify-center mt-4 md:mt-8">
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div key={index} className="flex items-center">
              <div
                className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary-accent text-white shadow-md"
                      : isCompleted
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {index + 1}. {step}
              </div>

              {/* Divider Arrow */}
              {index < steps.length - 1 && (
                <span className="mx-2 text-gray-400 font-semibold text-lg select-none">
                  ›
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
