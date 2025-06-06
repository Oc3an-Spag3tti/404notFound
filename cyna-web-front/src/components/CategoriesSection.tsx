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
    <div>
      <h1 className="text-[25px] lg:text-[40px] text-center p-8">Catégories</h1>
      <div className="flex flex-wrap m-8 justify-center lg:gap-10 lg:w-full lg:max-w-5xl">
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
    </div>
  );
};
export default CategoriesSection;
