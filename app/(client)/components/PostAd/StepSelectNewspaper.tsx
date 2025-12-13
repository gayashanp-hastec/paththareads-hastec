// app/components/PostAd/StepSelectNewspaper.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface StepSelectNewspaperProps {
  formData: any; // parent formData
  updateFormData: (data: any) => void; // function to update formData
  nextStep: () => void; // move to next step
  setIsNextEnabled?: (enabled: boolean) => void;
}

export default function StepSelectNewspaper({
  formData,
  updateFormData,
  nextStep,
  setIsNextEnabled,
}: StepSelectNewspaperProps) {
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedNewspaperIndex, setSelectedNewspaperIndex] = useState<
    number | null
  >(formData.selectedNewspaper?.index ?? null);

  const newspaperTiles = ["/np1.png", "/np2.png", "/np3.png", "/np4.png"];

  const newspaperSundayTiles = ["/nps1.png", "/nps2.png"];

  const handleSelectNewspaper = (index: number, tile: string) => {
    const code = `${activeTab}${index}`; // e.g., "daily2" or "sunday1"
    setSelectedNewspaperIndex(index);

    // Update parent formData
    updateFormData({
      selectedNewspaper: {
        index,
        tile,
        tab: activeTab, // "daily" or "sunday"
        code, // combined identifier
      },
    });

    // Move to next step
    // nextStep();
    setIsNextEnabled?.(true);
  };

  useEffect(() => {
    if (formData.selectedNewspaper) {
      setSelectedNewspaperIndex(formData.selectedNewspaper.index);
      setActiveTab(formData.selectedNewspaper.tab);
      setIsNextEnabled?.(true); // enable Next if already selected
    }
  }, [formData.selectedNewspaper, setIsNextEnabled]);

  const tilesToDisplay =
    activeTab === "daily" ? newspaperTiles : newspaperSundayTiles;

  return (
    <section className="flex flex-col gap-6">
      {/* ================= HEADING ================= */}
      <header className="px-4 text-center">
        <h2 className="text-2xl font-bold leading-tight md:text-3xl">
          Select a newspaper to get started
        </h2>
        <p className="mt-1 text-base font-medium text-gray-700 md:text-lg">
          (ඔබේ දැන්වීම පළ කිරීම ආරම්භ කිරීමට පුවත්පතක් තෝරන්න)
        </p>
      </header>

      {/* ================= TABS ================= */}
      <div className="flex justify-center gap-3 px-4 sm:gap-6">
        <button
          onClick={() => setActiveTab("daily")}
          className={`rounded-md px-5 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-accent ${
            activeTab === "daily"
              ? "bg-primary-accent text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Daily Newspapers
        </button>

        <button
          onClick={() => setActiveTab("sunday")}
          className={`rounded-md px-5 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-accent ${
            activeTab === "sunday"
              ? "bg-primary-accent text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sunday Newspapers
        </button>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 gap-4 px-4 pt-4 sm:grid-cols-3 md:grid-cols-4">
        {tilesToDisplay.map((tile, idx) => {
          const isSelected =
            selectedNewspaperIndex === idx &&
            activeTab === (formData.selectedNewspaper?.tab ?? activeTab);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectNewspaper(idx, tile)}
              aria-pressed={isSelected}
              className={`relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm transition
              hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary-accent
              ${isSelected ? "ring-4 ring-primary-accent" : ""}
            `}
            >
              <Image
                src={tile}
                alt={`Newspaper ${idx + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
