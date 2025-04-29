"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function Search({
  searchParams,
}: {
  searchParams: { product_name: string };
}) {
  const [results, setResults] = useState<Product[]>([]);

  // Bonne pratique : extraire dans le composant (au bon moment)
  const product_name = searchParams?.product_name;

  useEffect(() => {
    if (product_name) {
      fetch(
        `http://localhost:3001/products/search?product_name=${product_name}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.products);
        })
        .catch((err) => console.error(err));
    }
  }, [product_name]);

  return (
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
                <h6 className="font-medium text-xl leading-8 text-black mb-2">{product.name}</h6>
                <h6 className="font-semibold text-xl leading-8 text-indigo-600">${product.price}</h6>
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
  );
}
