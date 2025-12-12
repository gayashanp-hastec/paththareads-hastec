"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "How To", href: "/#how-to-section" },
    { name: "Ad Board", href: "/ad-board" },
    { name: "About Us", href: "/about-us" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact Us", href: "/contact-us" },
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
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-[var(--color-primary)] text-[var(--color-primary-accent)] shadow-md",
          isScrolled ? "h-[80px]" : "h-[200px]"
        )}
      >
        <div className="flex flex-col h-full w-full">
          {/* === Top Row: Email === */}
          {!isScrolled && (
            <div className="hidden sm:flex justify-end items-center h-[20px] px-8 text-xs sm:text-sm bg-[var(--color-primary)]">
              <a
                href="mailto:themedialink@gmail.com"
                className="flex items-center gap-2 text-white hover:text-white transition-colors"
              >
                <Mail size={14} />
                themedialink@gmail.com
              </a>
            </div>
          )}

          {/* === Non-Scrolled Layout === */}
          {!isScrolled && (
            <div className="grid grid-rows-[1fr_5fr_2fr] h-full w-full px-4 sm:px-8 pt-4">
              {/* Row 2: Logo + Search + Buttons */}
              <div className="grid grid-cols-[1fr_2fr_1fr] items-center">
                <div className="flex justify-center items-center">
                  <Image
                    src="/sample-logo-1.png"
                    alt="Paththare Ads Logo"
                    width={150}
                    height={60}
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-2/3 px-4 py-2 rounded-full border border-white-800 
                               bg-transparent text-[var(--color-primary-accent)] placeholder-white-800
                               focus:outline-none focus:ring-2 focus:ring-[#4c7c71]
                               transition shadow-sm text-sm sm:text-base"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <div className="flex">
                    <Link
                      href="/post-ad"
                      className="px-4 py-1 text-sm text-primary-dark @apply bg-orange-accent w-auto #{!important} @apply  w-auto #{!important} shoadow:none hover:shadow-none rounded-full transition"
                    >
                      Post Your Ad
                    </Link>
                  </div>

                  <button className="px-4 py-1 text-sm text-white @apply bg-transparent w-auto #{!important} @apply hover:bg-transparent w-auto #{!important} shoadow:none hover:shadow-none transition">
                    Register
                  </button>

                  <button className="specialBtn px-4 py-1 rounded-full text-sm transition-all">
                    Login
                  </button>
                </div>
              </div>

              {/* Row 3: Navigation */}
              <nav className="flex justify-center items-end">
                <ul className="flex justify-center space-x-12 text-xl font-normal">
                  {navLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-white hover:text-[var(--color-text-highlight)] transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* === Scrolled Layout: Logo + Nav Combined === */}
          {isScrolled && (
            <div className="flex items-center justify-center h-full space-x-12 px-4 sm:px-8">
              <div className="flex items-center">
                <Image
                  src="/sample-logo-1.png"
                  alt="Paththare Ads Logo"
                  width={120}
                  height={50}
                  className="object-contain"
                />
              </div>

              <nav className="flex items-center space-x-8">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-[var(--color-text-highlight)] transition-all duration-100 text-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Hamburger */}
              <div className="flex md:hidden justify-end items-center ml-auto">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="focus:outline-none"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[160px] md:hidden w-full bg-[#383A3D] z-40 shadow-md flex flex-col items-center py-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-lg text-[var(--color-primary-accent)] hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Back to top */}
      {/* {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#1E2021] text-[#fdca90] px-3 py-2 rounded-full shadow-lg hover:bg-[#2a2c2d] transition-all"
        >
          ↑ Top
        </button>
      )} */}
    </>
  );
}
