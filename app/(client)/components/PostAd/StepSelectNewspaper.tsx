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
    <div className="flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold text-center mt-5 mb-1">
        Select a newspaper to get started
      </h2>
      <h5 className="text-xl md:text-xl font-bold text-center mb-10">
        (ඔබේ දැන්වීම පළ කිරීම ආරම්භ කිරීමට පුවත්පතක් තෝරන්න)
      </h5>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 my-6">
        <button
          onClick={() => setActiveTab("daily")}
          className={`px-6 py-2 rounded-t-md font-medium transition-all ${
            activeTab === "daily"
              ? "bg-primary-accent text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Daily Newspapers
        </button>
        <button
          onClick={() => setActiveTab("sunday")}
          className={`px-6 py-2 rounded-t-md font-medium transition-all ${
            activeTab === "sunday"
              ? "bg-primary-accent text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sunday Newspapers
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center pt-6">
        {tilesToDisplay.map((tile, idx) => {
          const isSelected =
            selectedNewspaperIndex === idx &&
            activeTab === (formData.selectedNewspaper?.tab ?? activeTab);
          return (
            <div
              key={idx}
              onClick={() => handleSelectNewspaper(idx, tile)}
              className={`w-100 h-50 md:w-48 md:h-24 shadow-md rounded-lg overflow-hidden 
                        flex items-center justify-center cursor-pointer hover:scale-105 transition
                        ${isSelected ? "ring-4 ring-primary-accent" : ""}`}
            >
              <Image
                src={tile}
                alt={`Newspaper ${idx + 1}`}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
