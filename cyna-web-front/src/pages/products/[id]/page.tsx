import React from "react";

type Props = {
  params: { productId: string };
};

const ProductPage = async ({ params }: Props) => {
  const res = await fetch(
    `http://localhost:3001/products/${params.productId}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl mt-4">Prix : {product.price} €</p>
    </div>
  );
};

export default ProductPage;
