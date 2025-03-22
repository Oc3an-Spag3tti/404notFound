"use client";

import { useEffect, useState } from "react";

type Category = { name: string; _id: string };

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data is:", data);
        setCategories(data);
      })
      .catch((error) => {
        setCategories([]);
        console.log("Allo on a un soucis:", error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Categories</h1>
        <ul></ul>
      </div>
      <div className="items-center justify-center">
        {categories.map((category) => (
          <div
            key={category._id}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 max-w-full"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category.name}
            </h5>
          </div>
        ))}
      </div>
    </>
  );
};
export default CategoriesSection;
