'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b border-gray-400 shadow-md relative z-50">
      <div className="max-w-10xl mx-auto px-2 sm:px-4 lg:px-3"> {/* Reduced padding */}
        <div className="relative h-16 flex items-center justify-center">
          {/* Hamburger Menu - TOP LEFT */}
          <div className="absolute left-0 flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-yellow-500 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Logo Centered */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="images/pfw_logo.jpg" // Replace with the actual path to your logo image
              alt="Purdue University Fort Wayne Logo"
              className="h-16 max-h-20 object-contain" // Enlarged logo
            />
          </Link>

          {/* Desktop Links - RIGHT */}
          <div className="hidden md:flex md:items-center md:space-x-6 absolute right-0">
            <Link href="https://www.pfw.edu/admissions-financial-aid" className="text-gray-700 hover:text-yellow-500">Admissions</Link>
            <Link href="https://www.pfw.edu/academics-research" className="text-gray-700 hover:text-yellow-500">Academics</Link>
            <Link href="https://www.pfw.edu/about-pfw" className="text-gray-700 hover:text-yellow-500">About</Link>
            <Link href="https://www.pfw.edu/admissions-financial-aid/admissions/undergraduate-application" className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Apply</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - below hamburger */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 bg-white border border-gray-300 shadow-lg z-40 rounded-lg w-64 p-4">
          <div className="flex flex-col space-y-4">
            <Link href="https://www.pfw.edu/admissions-financial-aid" className="text-gray-700 hover:text-yellow-500">Admissions</Link>
            <Link href="https://www.pfw.edu/academics-research" className="text-gray-700 hover:text-yellow-500">Academics</Link>
            <Link href="https://www.pfw.edu/about-pfw" className="text-gray-700 hover:text-yellow-500">About</Link>
            <Link href="https://www.pfw.edu/admissions-financial-aid/admissions/undergraduate-application" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Apply</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
