"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">MonLogo</Link>
        </div>

        {/* Menu Burger pour mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-4 items-center`}
        >
          <Link href="/">
            <span className="text-gray-300 hover:text-white">Accueil</span>
          </Link>
          <Link href="/products">
            <span className="text-gray-300 hover:text-white">Products</span>
          </Link>

          {/* Produits avec sous-menu utilisant @headlessui/react */}
          <Menu as="div" className="relative">
            <MenuButton className="text-gray-300 hover:text-white focus:outline-none">
              Produits
            </MenuButton>
            <MenuItems className="absolute top-full mt-2 bg-gray-700 rounded-md shadow-lg w-48 z-10">
              <MenuItem>
                {({ focus }) => (
                  <Link href="/products/category1">
                    <span
                      className={`block px-4 py-2 ${
                        focus ? "bg-gray-600 text-white" : "text-gray-300"
                      }`}
                    >
                      Catégorie 1
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/products/category2">
                    <span
                      className={`block px-4 py-2 ${
                        focus ? "bg-gray-600 text-white" : "text-gray-300"
                      }`}
                    >
                      Catégorie 2
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/products/category3">
                    <span
                      className={`block px-4 py-2 ${
                        focus ? "bg-gray-600 text-white" : "text-gray-300"
                      }`}
                    >
                      Catégorie 3
                    </span>
                  </Link>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>

          <Link href="/about">
            <span className="text-gray-300 hover:text-white">À propos</span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-300 hover:text-white">Contact</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
