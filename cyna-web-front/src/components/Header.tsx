"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaShoppingCart } from "react-icons/fa";

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
      }, 50);

      return () => clearTimeout(delayDebounce);
    } else {
      setProductsList([]);
    }
  }, [searchText]);

  return (
    <header className="bg-purple-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Search Bar */}
        <form
          className="max-w-lg mx-auto flex-grow p-4"
          onSubmit={onSubmitSearch}
        >
          <div className="relative">
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

        {/* Cart Icon */}
        <div className="text-white m-5">
          <Link href="/cart">
            <FaShoppingCart className="w-6 h-6 hover:text-gray-300" />
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-4 items-center`}
        >
          <Link href="/login" target="_blank" rel="noopener noreferrer">
            <span className="text-gray-200 hover:text-white">Login</span>
          </Link>
          <Link href="/products">
            <span className="text-gray-200 hover:text-white">Products</span>
          </Link>
          <Menu as="div" className="relative">
            <MenuButton className="text-gray-200 hover:text-white focus:outline-none">
              Categories
            </MenuButton>
            <MenuItems className="absolute top-full mt-2 bg-purple-600 rounded-md shadow-lg w-48 z-10">
              <MenuItem>
                {({ focus }) => (
                  <Link href="/categories/category1">
                    <span
                      className={`block px-4 py-2 ${
                        focus ? "bg-purple-500 text-white" : "text-gray-200"
                      }`}
                    >
                      Category 1
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/categories/category2">
                    <span
                      className={`block px-4 py-2 ${
                        focus ? "bg-purple-500 text-white" : "text-gray-200"
                      }`}
                    >
                      Category 2
                    </span>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <Link href="/categories/category3">
                    <span
                      className={`block px-4 py-2 ${
                        focus ? "bg-purple-500 text-white" : "text-gray-200"
                      }`}
                    >
                      Category 3
                    </span>
                  </Link>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
          <Link href="/about">
            <span className="text-gray-200 hover:text-white">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-200 hover:text-white">Contact</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
