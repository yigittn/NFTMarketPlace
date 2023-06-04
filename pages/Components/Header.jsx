import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome 🎉
            </h1>

            <p className="mt-1.5 text-sm text-white ">
              Hi 👋, welcome to the NFT Marketplace.
            </p>
          </div>

          <nav className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-600 hover:text-gray-700 focus:outline-none focus:ring"
              activeclassname="bg-gray-50 text-gray-700"
            >
              <span className="text-sm text-white font-medium">Home Page</span>
            </Link>

            <Link
              href="/mint"
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              activeclassname="bg-indigo-700"
            >
              Mint
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
