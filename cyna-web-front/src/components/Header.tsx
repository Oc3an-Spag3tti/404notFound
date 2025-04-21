"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

type ProductItem = {
  _id: string;
  name: string;
  price: number;
};

const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
            setShowSuggestions(true); // Affiche suggestions
          })
          .catch((err) => {
            console.error(err);
          });
      }, 50);

      return () => clearTimeout(delayDebounce);
    } else {
      setProductsList([]);
    }
  }, [searchText]);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Si le clic est en dehors de la zone (champ de recherche ou suggestions)
      if (searchBoxRef.current && !searchBoxRef.current.contains(target)) {
        setShowSuggestions(false); // Ferme les suggestions
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); // L'effet s'exécute une seule fois au montage du composant

  return (
    <header className="bg-[#2E1F80] p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            <img
              src="https://cyna-it.fr/wp-content/themes/theme-cyna-it/images/logo-cyna-white.svg"
              alt=""
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="md:hidden focus:outline-none text-white absolute right-0"
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
              d={
                isOpenMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
          <h1></h1>
        </button>

        {/* Search Bar  mr-5*/}
        <form
          className="max-w-md flex-grow"
          onSubmit={onSubmitSearch}
          onClick={() => setShowSuggestions(true)} // Affiche suggestions lorsque l'utilisateur clique dans le champ
        >
          <div className="relative">
            <div ref={searchBoxRef}>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Search products..."
                required
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              {showSuggestions && (
                <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1">
                  {productsList.map((product) => (
                    <Link
                      href={`/products/${product._id}`}
                      key={product._id}
                      className="block px-4 py-2 hover:bg-purple-100"
                    >
                      {product.name}
                    </Link>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="submit"
              className="text-white absolute right-0 bottom-0 h-full end-2.5 bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <ul className="hidden lg:flex flex-col text-white lg:flex-row">
          <li>Home</li>
          <li>Categories</li>
          <li>Contact</li>
        </ul>

        <div className="flex items-center">
          {/* Navigation */}
          <div className="text-white flex items-center">
            <Link href="/cart">
              <FaShoppingCart className="w-6 h-6 hover:text-gray-300" />
            </Link>
            <Link href="/login" target="_blank" rel="noopener noreferrer">
              <span className="text-gray-200 hover:text-white">Login</span>
            </Link>
            <Link href="/register" target="_blank" rel="noopener noreferrer">
              <span className="text-gray-200 hover:text-white">Register</span>
            </Link>
          </div>

          <nav
            className={`${
              isOpenMenu ? "block" : "hidden"
            } absolute top-16 left-0 w-2/3 h-screen bg-[#2E1F80] flex md:bg-transparent`}
          >
            <Link href="/login" target="_blank" rel="noopener noreferrer">
              <span className="text-gray-200 hover:text-white">Login</span>
            </Link>
            <Link href="/register" target="_blank" rel="noopener noreferrer">
              <span className="text-gray-200 hover:text-white">Register</span>
            </Link>
            {/* Cart Icon */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
