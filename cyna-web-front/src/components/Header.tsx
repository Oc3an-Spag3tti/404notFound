"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type ProductItem = {
  _id: string;
  name: string;
  price: number;
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [productsList, setProductsList] = useState<ProductItem[]>([]);

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    console.log("onSubmitSearch");
    e.preventDefault();
  }

  useEffect(() => {
    if (searchText.trim() !== "") {
      const delayDebounce = setTimeout(() => {
        fetch(
          `http://localhost:3001/products/search?product_name=${searchText}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("productsList: ", data.products);
            setProductsList(data.products);
          })
          .catch((err) => {
            console.error(err);
          });
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      setProductsList([]); // Réinitialiser la liste si la recherche est vide
    }
  }, [searchText]);

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
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

        <form className="max-w-md mx-auto" onSubmit={onSubmitSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />

            <ul className="absolute w-full bg-white border shadow-lg rounded-lg">
              {Array.isArray(productsList) && productsList.length > 0 ? (
                productsList.map((product) => (
                  <li key={product._id} className="hover:bg-gray-100">
                    {product.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Aucun produit trouvé</li>
              )}
            </ul>

            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

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
