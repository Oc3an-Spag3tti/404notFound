import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import "../app/globals.css";
import AddProductModal from "../components/products/add-product-modal";
import EditProductModal from "@/components/products/edit-product-modal";

type ProductItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/products");
  const productsData = await res.json();
  return { props: { productsData } };
};

export default function Product({
  productsData,
}: {
  productsData: ProductItem[];
}) {
  const router = useRouter();

  async function deleteProduct(_id: string) {
    const dataToSend = {
      _id,
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      console.log("response after deletion ->", response);
      router.reload();
    } catch (err) {
      // Popup ?
      console.error("Cannot delete product:", err);
    }
  }

  return (
    <>
      <h1 className="text-4xl">Products Page</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product Name
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
          {productsData.map((product) => (
            <tr
              key={product._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{product.name} </td>
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
                    // Update the product in the list
                    const updatedProducts = productsData.map(p => 
                      p._id === updatedProduct._id ? updatedProduct : p
                    );
                    // Force a re-render with the updated data
                    router.replace(router.asPath);
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
