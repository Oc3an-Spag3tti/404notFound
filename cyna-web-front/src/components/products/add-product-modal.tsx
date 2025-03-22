"use client";

import { FormEvent, useState } from "react";
import "../../app/globals.css";

export default function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickAdd = () => {
    setIsOpen(true);
  };

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>();

  async function callCreateProduct() {
    setIsLoading(true); // on désactive le formulaire;

    const dataToSend = {
      name,
      description,
      price,
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      setIsOpen(false); // fermer le modal
      console.log("created product, response:", response);
    } catch (error) {
      console.error(error);
      window.alert("Création de produit. Erreur serveur !");
    }

    setIsLoading(false);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting form");
    console.log(name);
    callCreateProduct();
  };

  return (
    <div>
      <button className="btn-add" onClick={onClickAdd}>
        Add
      </button>

      <div
        className={`fixed relative z-10 inset-0 z-10 ${isOpen ? "" : "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="modal-title"
                    >
                      Add product
                    </h3>

                    <form action="" method="post" onSubmit={onSubmit}>
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Name
                          </label>
                        </div>
                        <div className="md:w-2/3">
                          <input
                            disabled={isLoading}
                            required
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            className="name bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Description
                          </label>
                        </div>
                        <div className="md:w-2/3">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
                            disabled={isLoading}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Price
                          </label>
                        </div>
                        <div className="md:w-2/3">
                          <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="number"
                            disabled={isLoading}
                            onChange={(e) => setPrice(Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <button type="submit" disabled={isLoading}>
                        Save
                      </button>
                    </form>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Enter product details below
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
