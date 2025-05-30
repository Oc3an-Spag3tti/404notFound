"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

type Category = {
  _id: string;
  name: string;
};

export default function Search({
  searchParams,
}: {
  searchParams: { product_name: string };
}) {
  const [results, setResults] = useState<Product[]>([]);
  const [isChecked, setIsChecked] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceSort, setPriceSort] = useState<
    "init" | "croissant" | "decroissant"
  >("init");

  const product_name = searchParams?.product_name;

  const handleTogglePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSort(e.target.value as "init" | "croissant" | "decroissant");
  };

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    if (isChecked.includes(value)) {
      setIsChecked(isChecked.filter((item) => item !== value));
    } else {
      setIsChecked([...isChecked, value]);
    }
  }

  useEffect(() => {
    let url = "http://localhost:3001/products";
    if (product_name) {
      const query = isChecked.join(",");
      url += `/search?product_name=${product_name}&sortby=${priceSort}&categories=${encodeURIComponent(
        query
      )}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.products);
        })
        .catch((err) => console.error(err));
    }
  }, [product_name, isChecked, priceSort]);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="flex">
      <div>
        <div className="relative flex flex-col space-x-4">
          <select
            name="Sort"
            id=""
            onChange={handleTogglePrice}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priceSort}
          >
            <option value="init" hidden>
              Tri
            </option>
            <option value="croissant">Prix croissant</option>
            <option value="decroissant">Prix Decroissant</option>
          </select>
        </div>
        <div className="hidden sm:block min-w-80">
          <h2>Filter</h2>
          <ul>
            {categories.map((categorie) => (
              <li key={categorie._id}>
                <input
                  id="filter-mobile-color-4"
                  name="color"
                  value={categorie.name}
                  type="checkbox"
                  onChange={handleCheck}
                />
                <label
                  htmlFor="filter-mobile-color-1"
                  className="min-w-0 flex-1 text-gray-500"
                >
                  {categorie.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col lg:gap-8 lg:mx-[150px] my-8  m-2">
        <h1 className="text-2xl">Résultats pour : {product_name}</h1>
        <ul className="flex flex-wrap gap-8 mx-auto">
          {results.length > 0 ? (
            results.map((product) => (
              <li
                key={product._id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 lg:flex" key={product._id}>
                  <Link href={`/products/${product._id}`} className="mx-auto">
                    <div className="w-full max-w-sm aspect-square">
                      <img
                        src="https://pagedone.io/asset/uploads/1701157806.png"
                        alt="cream image"
                        className="lg:w-full lg:h-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="m-5 flex products-center justify-between">
                      <div>
                        <h6 className="font-medium text-xl leading-8 text-black mb-2">
                          {product.name}
                        </h6>
                        <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                          ${product.price}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
