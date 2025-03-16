import { useState, FormEvent } from "react";

export default function EditProductModal() {
  const [name, setName] = useState<string>(""); // Nom du produit
  const [description, setDescription] = useState<string>(""); // Nouvelle description
  const [price, setPrice] = useState<number>(0); // Nouveau prix

  const [isOpen, setIsOpen] = useState(false);
  const onClickEdit = () => {
    setIsOpen(true);
  };

  async function callEditProduct() {
    if (!name || !description || price === 0) {
      console.error("All fields are required");
      return;
    }

    const dataToSend = {
      name, // Nom du produit à modifier
      description, // Nouvelle description
      price, // Nouveau prix
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Product updated successfully");
        setIsOpen(false); // Fermer la modal après mise à jour
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    callEditProduct();
  };

  return (
    <div>
      <button className="btn-edit" onClick={onClickEdit}>
        Edit
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
                      Edit product
                    </h3>
                    <form onSubmit={onSubmit}>
                      <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Product Name
                          </label>
                        </div>
                        <div className="md:w-2/3">
                          <input
                            required
                            onChange={(e) => setName(e.target.value)}
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
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            className="name bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
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
                            required
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="name bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="number"
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary">
                        Edit Product
                      </button>
                    </form>
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
