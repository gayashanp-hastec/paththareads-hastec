"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import NP1LankadeepaModal from "./components/modals/NP1LankadeepaModal";
import { ChevronUp } from "lucide-react";

export default function HomePage() {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const newspaperTiles = [
    "/np1.png",
    "/np2.png",
    "/np3.png",
    "/np4.png",
    "/np1.png",
    "/newspaper6.png",
    "/newspaper7.png",
    "/newspaper8.png",
    "/newspaper9.png",
    "/newspaper10.png",
    "/newspaper11.png",
    "/newspaper12.png",
    "/newspaper13.png",
  ];
  const newspaperSundayTiles = [
    "/nps1.png",
    "/nps2.png",
    "/np3.png",
    "/np4.png",
    "/np1.png",
    "/newspaper6.png",
    "/newspaper7.png",
    "/newspaper8.png",
    "/newspaper9.png",
    "/newspaper10.png",
    "/newspaper11.png",
    "/newspaper12.png",
    "/newspaper13.png",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="flex-1 flex flex-col py-8 space-y-12">
      {/* Row 2: Introduction */}

      <section
        className="relative flex flex-col md:px-30 md:flex-row items-center justify-between w-full min-h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner-4-maroon.png')",
        }}
      >
        {/* Overlay for readability */}
        {/* <div className="absolute inset-0 bg-black/10"></div> */}

        {/* Left Side - Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 text-white space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--color-text)]">
            Advertise{" "}
            <span className="text-[var(--color-primary)]">Smarter</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text)] max-w-lg leading-relaxed">
            Create and manage your ads effortlessly with{" "}
            <strong>Paththare Ads</strong>. Your campaign, your control.
          </p>
          <p className="text-lg md:text-xl text-[var(--color-text)] max-w-lg leading-relaxed">
            <strong>Paththare Ads </strong>සමඟින් ඔබේ දැන්වීම් පහසුවෙන් නිර්මාණය
            කර කළමනාකරණය කරන්න
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/post-ad"
              className="px-8 py-3 specialBtn text-lg font-medium rounded-md hover:brightness-110 transition"
            >
              Post Ad
            </Link>
            <Link
              href="/#how-to-section"
              className="px-8 py-3 border border-primary text-primary text-lg font-medium rounded-md hover:bg-primary-accent hover:text-white transition"
            >
              How To
            </Link>
          </div>
        </div>

        {/* Right Side - Empty or Decorative (can add image or shapes later) */}
        <div className="relative z-0 flex-1 h-[50vh] md:h-full"></div>
      </section>

      {/* Row 4: How to Post Your Ad */}
      <section
        id="how-to-section"
        className="flex flex-col items-center px-6 md:px-12 py-12 bg-gray-50 rounded-lg space-y-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          How to Post Your Ad
        </h2>
        <p className="text-gray-700 text-center text-lg max-w-2xl mb-0">
          Follow these simple steps to create, submit, and publish your ad with
          Paththare Ads.
        </p>
        <p className="text-gray-500 text-center text-normal max-w-2xl">
          Paththare Ads සමඟ ඔබේ දැන්වීම නිර්මාණය කිරීමට, ඉදිරිපත් කිරීමට සහ
          ප්‍රකාශයට පත් කිරීමට මෙම සරල පියවර අනුගමනය කරන්න.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div className="text-4xl font-bold text-primary-accent">
                {i + 1}
              </div>
              <h3 className="font-semibold text-xl">
                {
                  [
                    "Select Your Paper",
                    "Select Ad Type",
                    "Create Your Ad",
                    "Ad Approval",
                    "Payment Details",
                    "Ad Publish",
                  ][i]
                }
              </h3>
              <p className="text-gray-600">
                {
                  [
                    "First, select your preferred newspaper from the list.",
                    "Choose your ad type: Classified, Photo Classified, or Casual.",
                    "Enter your ad details and submit any required documents.",
                    "Paththare Ads will notify you via email when your ad is approved.",
                    "Submit your payment via Ezy Cash, MCash, or bank deposit.",
                    "We’ll send your ad details directly to the newspaper once payment is settled.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link
            href="/post-ad"
            className="px-6 py-2 bg-primary text-white rounded-md hover:brightness-110 transition text-center"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Row 3: Newspaper Tiles */}
      <section className="flex flex-col gap-6 mt-10">
        {/* --- Tabs --- */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => setActiveTab("daily")}
            className={`px-6 py-2 rounded-t-md font-medium transition-all ${
              activeTab === "daily"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Daily Newspapers
          </button>
          <button
            onClick={() => setActiveTab("sunday")}
            className={`px-6 py-2 rounded-t-md font-medium transition-all ${
              activeTab === "sunday"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sunday Newspapers
          </button>
        </div>

        {/* --- Tab Content Wrapper --- */}
        <div className=" border-primary-accent pt-6">
          <div className="flex flex-wrap justify-center mt-6">
            {(activeTab === "daily" ? newspaperTiles : newspaperSundayTiles)
              .slice(0, showAll ? undefined : 5)
              .map((tile, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveModal(idx)}
                  className="inline-block w-48 h-24 md:w-72 md:h-36 m-2 shadow-md rounded-lg overflow-hidden 
                    flex items-center justify-center cursor-pointer hover:scale-105 transition"
                >
                  <Image
                    src={tile}
                    alt={`Newspaper ${idx + 1}`}
                    width={200}
                    height={100}
                    className="object-cover"
                  />
                </div>
              ))}
          </div>

          {!showAll && (
            <div className="flex justify-center mt-24">
              <Link
                href="/post-ad"
                className="px-6 py-2 bg-primary text-white rounded-md hover:brightness-110 transition text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <NP1LankadeepaModal
        isOpen={activeModal === 0}
        onClose={() => setActiveModal(null)}
      />

      {/* Back to top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#1E2021] text-[#fdca90] p-3 rounded-full shadow-lg hover:bg-[#2a2c2d] transition-all"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </main>
  );
}
