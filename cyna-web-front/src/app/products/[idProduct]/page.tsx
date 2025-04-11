"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ProductPage = ({ params }: { params: { idProduct: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);

  // recup infos product
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

  return (
    <div>
      <h1>Produit : {product?.name}</h1>
      <p>Description : {product?.description}</p>
      <p>Prix : {product?.price} €</p>
    </div>
  );
};

export default ProductPage;
