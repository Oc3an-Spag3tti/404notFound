import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ProductPage = () => {
  const router = useRouter();
  const { idProduct } = router.query;

  const [product, setProduct] = useState<Product | null>(null);

  // recup infos product
  useEffect(() => {
    if (idProduct) {
      fetch(`http://localhost:3001/products/${idProduct}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) =>
          console.error("Erreur lors de la récupération du produit :", err)
        );
    }
  }, [idProduct]);

  return (
    <div>
      <h1>Produit : {product?.name}</h1>
      <p>Description : {product?.description}</p>
      <p>Prix : {product?.price} €</p>
    </div>
  );
};

export default ProductPage;
//   `http://localhost:3001/products/${params.productId}`,
//   {
//     cache: "no-store",
//   }
// );

// const product = await res.json();

// return (
//   <div className="p-8">
//     <h1 className="text-3xl font-bold">{product.name}</h1>
//     <p className="text-gray-600">{product.description}</p>
//     <p className="text-xl mt-4">Prix : {product.price} €</p>
//   </div>
// );
