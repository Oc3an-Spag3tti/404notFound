"use client";

import { useParams } from "next/navigation";

export default function Category() {
  const params = useParams();
  const category = params?.category;
  return (
    <div className="flex flex-col items-center md:w-4xl">
      <div className="md:max-w-xl bg-white md:rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-xs">
        <div className="relative">
          <img
            className="rounded-t-lg"
            src="https://storage.googleapis.com/developers360/blog_images/saas-apps.png"
            alt=""
          />
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {category}
          </h5>
        </div>
        <div className="p-5">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            All the security you need to protect your data.
          </p>
        </div>
      </div>

      <div className="md:flex md:p-20 md:gap-10">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src="https://www.laboiteverte.fr/wp-content/uploads/2014/03/objet-inconfortables-01-800x800.jpg"
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                SOC Managé
              </h5>
            </a>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                99,99€/month
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src="https://www.laboiteverte.fr/wp-content/uploads/2014/03/objet-inconfortables-01-800x800.jpg"
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Security Audit
              </h5>
            </a>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                5000€
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src="https://www.laboiteverte.fr/wp-content/uploads/2014/03/objet-inconfortables-01-800x800.jpg"
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Pentest
              </h5>
            </a>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                999€
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
