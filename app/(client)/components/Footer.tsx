"use client";

export default function Header() {
  return (
    <>
      <footer className="w-full py-6 flex justify-center space-x-6 text-gray-500 text-sm mt-8">
        <a href="#">Terms & Conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Cookies</a>
        <a href="/about-us">About</a>
      </footer>
      <div className="w-full py-5 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Paththare Ads | Developed by{" "}
          <a href="https://hastec.co/" target="_blank">
            Hastec Innovations
          </a>
        </p>
      </div>
    </>
  );
}
