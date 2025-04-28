"use client";

import { useRouter } from "next/navigation";
import EditProductModal from "@/components/products/edit-product-modal";
import AddProductModal from "@/components/products/add-product-modal";

type ProductItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type ProductTableProps = {
  products: ProductItem[];
};

export default function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();

  async function deleteProduct(_id: string) {
    const dataToSend = { _id };

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const response = await fetch("http://localhost:3001/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("response after deletion ->", response);
      router.refresh(); // Refresh the page to reflect changes
    } catch (err) {
      console.error("Cannot delete product:", err);
    }
  }

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
                <EditProductModal
                  product={product}
                  onProductUpdated={(updatedProduct) => {
                    router.refresh(); // Refresh the page after editing
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddProductModal />
    </>
  );
}
