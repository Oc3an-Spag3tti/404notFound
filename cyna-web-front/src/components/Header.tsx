"use client";
import { useRouter } from "next/navigation";
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
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for the token cookie on the client side
    const hasToken = document.cookie.includes("token");
    setIsLoggedIn(hasToken);
  }, []);

  const handleLogout = () => {
    // Remove the token cookie by setting its expiration date to the past
    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    setIsLoggedIn(false);
    router.push("/"); // Redirect to the login page
  };

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchText.trim() !== "") {
      router.push(`/search?product_name=${encodeURIComponent(searchText)}`);
    }
    console.log("Recherche envoyée :", searchText);
    setShowSuggestions(false);
    setShowSearchMobile(false); // Ferme overlay mobile
  }

  // close suggestion if click on 1 suggestion
  const handleSuggestionClick = () => {
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (searchText.trim() !== "") {
      const delayDebounce = setTimeout(() => {
        fetch(
          `http://localhost:3001/products/search?product_name=${searchText}`
        )
          .then((response) => response.json())
          .then((data) => {
            setProductsList(data.products);
            setShowSuggestions(true);
          })
          .catch((err) => console.error(err));
      }, 100);

      return () => clearTimeout(delayDebounce);
    } else {
      setProductsList([]);
      setShowSuggestions(false);
    }
  }, [searchText]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchBoxRef.current && !searchBoxRef.current.contains(target)) {
        setShowSuggestions(false);
        setShowSearchMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative fixed w-full bg-[#2E1F80] p-4 shadow-lg z-50">
      <div className="container flex items-center justify-between gap-5 px-2">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            <img
              src="https://cyna-it.fr/wp-content/themes/theme-cyna-it/images/logo-cyna-white.svg"
              alt="Logo"
              className="w-32"
            />
          </Link>
        </div>

        {/* Icône mobile */}
        <div className="flex">
          <button
            onClick={() => {
              setShowSearchMobile(true); // Ouvre l'overlay
              if (searchText.trim() !== "") {
                setShowSuggestions(true); // Montre les suggestions si texte non vide
              }
            }}
            className="block sm:hidden text-white mr-2"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>

          <Link href="/cart" className="text-white sm:hidden">
            <FaShoppingCart className="w-6 h-6 hover:text-gray-300" />
          </Link>
        </div>

        {/* Desktop search bar */}
        <form
          className="hidden sm:block max-w-80 flex-grow mx-6"
          onSubmit={onSubmitSearch}
        >
          <div className="relative" ref={searchBoxRef}>
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search products..."
              required
              onChange={(e) => setSearchText(e.target.value)}
              onClick={
                showSuggestions
                  ? () => setShowSuggestions(false)
                  : () => setShowSuggestions(true)
              }
            />
            {showSuggestions && (
              <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50">
                {productsList.map((product) => (
                  <Link
                    href={`/products/${product._id}`}
                    key={product._id}
                    className="block px-4 py-2 hover:bg-purple-100"
                    onClick={() => handleSuggestionClick()}
                  >
                    {product.name}
                  </Link>
                ))}
              </ul>
            )}

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

        <div className="flex items-center gap-[100px] order-first sm:order-last ">
          {/* Desktop nav */}
          <ul className="hidden lg:flex text-white gap-[50px] text-sm font-medium items-center">
            <li>
              <Link
                href="/categories"
                className="hover:text-purple-200 cursor-pointer"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-purple-200 cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {/* Cart icon always visible on mobile and desktop */}

            {/* Menu burger (mobile only) */}
            <button
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="lg:hidden focus:outline-none text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpenMenu
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Desktop nav icons */}
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <span className="text-gray-200 hover:text-white">
                    Dashboard
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-200 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" target="_blank" rel="noopener noreferrer">
                  <span className="text-gray-200 hover:text-white">Login</span>
                </Link>
                <Link
                  href="/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-gray-200 hover:text-white">
                    Register
                  </span>
                </Link>{" "}
              </>
            )}
          </div>

          {/* Overlay Search Mobile */}
          {showSearchMobile && (
            <div className="absolute top-0 left-0 w-full h-screen bg-white/90 backdrop-blur-sm p-4 z-50 flex items-start justify-center">
              <form onSubmit={onSubmitSearch} className="w-full max-w-md">
                <div className="relative" ref={searchBoxRef}>
                  <input
                    type="search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Search products..."
                    required
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {showSuggestions && (
                    <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50">
                      {productsList.map((product) => (
                        <Link
                          href={`/products/${product._id}`}
                          key={product._id}
                          className="block px-4 py-2 hover:bg-purple-100"
                          onClick={() => {
                            setShowSuggestions(false);
                            setShowSearchMobile(false);
                          }}
                        >
                          {product.name}
                        </Link>
                      ))}
                    </ul>
                  )}

                  {/* Close overlay */}
                  <button
                    type="button"
                    onClick={() => setShowSearchMobile(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                  >
                    ✕
                  </button>

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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
