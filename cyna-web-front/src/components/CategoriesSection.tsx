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
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default CategoriesSection;
