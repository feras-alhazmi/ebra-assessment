"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const linksToRender = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Product", href: "/product" },
  { label: "Contact us", href: "/contact" },
];

const SmallNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white md:hidden  border-gray-200 px-4 ">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-gray-900 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-1/2 mt-2 bg-white shadow-lg z-50">
          <div className="space-y-1">
            {linksToRender.map((link, index) => (
              <Link key={index} href={link.href}>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SmallNavbar;
