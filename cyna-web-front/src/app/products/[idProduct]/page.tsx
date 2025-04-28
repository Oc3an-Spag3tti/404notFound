"use client";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  caracteristics: Record<string, string>;
}

const ProductPage = ({ params }: { params: { idProduct: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isDescOpen, setIsDescOpen] = useState<boolean>(false);
  const [isCaractOpen, setIsCaractOpen] = useState<boolean>(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  // Récupère les informations du produit
  useEffect(() => {
    if (params.idProduct) {
      fetch(`http://localhost:3001/products/${params.idProduct}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) =>
          console.error("Erreur lors de la récupération du produit :", err)
        );
    }
  }, [params.idProduct]);

  useEffect(() => {
    if (product?.category) {
      fetch(`http://localhost:3001/products/details?category=${product.category}`)
        .then((res) => res.json())
        .then((data) => setSimilarProducts(data))
        .catch((err) =>
           console.error("Erreur lors de la récupération des produits similaires :", err)
        );
    }
  })

  return (
    <section className="py-24">

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="slider-box w-full h-full max-lg:mx-auto mx-0">
            <div className="swiper main-slide-carousel swiper-container relative mb-6">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="block">
                    <img
                      src="https://pagedone.io/asset/uploads/1700472379.png"
                      alt="Summer Travel Bag image"
                      className="max-lg:mx-auto rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="text">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2">
                    {product?.name}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                <div className="flex items-center">
                  <h5 className="font-manrope font-semibold text-2xl leading-c9 text-gray-900 ">
                    $ {product?.price}{" "}
                  </h5>
                </div>
              </div>

              <p className="font-medium text-lg text-gray-900 mb-2">Quantité</p>

              <div className="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                <div className=" flex items-center justify-center border border-gray-400 rounded-full">
                  <button
                    className="group py-[14px] px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                  >
                    <svg
                      className="stroke-black group-hover:stroke-black"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 11H5.5"
                        stroke=""
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-indigo-600 outline-0 hover:placeholder:text-indigo-600"
                    placeholder="1"
                  />
                  <button
                    className="group py-[14px] px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                  >
                    <svg
                      className="stroke-black group-hover:stroke-black"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 5.5V16.5M16.5 11H5.5"
                        stroke="#9CA3AF"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <button className="group py-3 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-100">
                  <svg
                    className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-600"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                      stroke=""
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
              <button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300">
                Buy Now
              </button>

              <div className="w-full max-w-md mx-auto mt-7">
                {/* Bloc Shipping and Returns */}
                <div className="border-t border-b border-gray-200 py-4">
                  <div
                    onClick={() => setIsDescOpen(!isDescOpen)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <p className="text-base text-gray-800 dark:text-gray-300">
                      Description
                    </p>
                    <svg
                      className={`transform transition-transform duration-300 text-gray-300 dark:text-white ${
                        isDescOpen ? "rotate-180" : ""
                      }`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1L5 5L1 1"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {isDescOpen && (
                    <div className="pt-4 pr-12 mt-4 text-base text-gray-600 dark:text-gray-300">
                      {product?.description}
                    </div>
                  )}
                </div>

                {/* Bloc Caractéristiques */}
                <div className="border-b border-gray-200 py-4">
                  <div
                    onClick={() => setIsCaractOpen(!isCaractOpen)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <p className="text-base text-gray-800 dark:text-gray-300">
                      Caractéristiques techniques
                    </p>
                    <svg
                      className={`transform transition-transform duration-300 text-gray-300 dark:text-white ${
                        isCaractOpen ? "rotate-180" : ""
                      }`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1L5 5L1 1"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {isCaractOpen && product?.caracteristics && (
                    // <div className="pt-4 pr-12 mt-4 text-base text-gray-600 dark:text-gray-300">
                      <div className="w-full max-w-2xl mx-auto mt-8 border border-gray-200 rounded-md overflow-hidden">
      
                        {Object.entries(product.caracteristics).map(([key, value], index) => (
                          
                          <div
                            key={index}
                            className="flex justify-between items-center px-4 py-3 border-b border-gray-200 last:border-0 bg-white dark:bg-gray-900"
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {key}
                            </span>
                            <span className="text-sm text-gray-900 dark:text-white">
                              {value}
                            </span>
                          </div>
                        ))}
                      
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {similarProducts
  .filter((item) => item.name.toLowerCase() !== product?.name)
  .map((item) => (
    <section className="py-24" key={item._id}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
          Similar products
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <a href="javascript:;" className="max-w-[384px] mx-auto">
            <div className="w-full max-w-sm aspect-square">
              <img
                src="https://pagedone.io/asset/uploads/1701157806.png"
                alt="cream image"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <h6 className="font-medium text-xl leading-8 text-black mb-2">{item.name}</h6>
                <h6 className="font-semibold text-xl leading-8 text-indigo-600">${item.price}</h6>
              </div>
              <button className="p-2 min-[400px]:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50">
                <svg
                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </a>
        </div>
      </div>
    </section>
))}
    </section>
  );
};

export default ProductPage;
