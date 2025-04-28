import ProductTable from "@/components/products/ProductTable";

type ProductItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

// Fetch products on the server side
async function fetchProducts(): Promise<ProductItem[]> {
  const res = await fetch("http://localhost:3001/products", {
    cache: "no-store", // Ensures fresh data on every request
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function ProductPage() {
  const productsData = await fetchProducts();

  return (
    <>
      <h1 className="text-4xl">Products Page</h1>
      <ProductTable products={productsData} />
    </>
  );
}
