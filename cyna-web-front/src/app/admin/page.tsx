import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Admin Dashboard</h1>
      <Link href="/admin/products">Products</Link>
      <div>
        <div>
          <p>Ventes de la semaine</p>
        </div>
        <div>
          <p>Nombre de commande par categorie</p>
        </div>
        <div>
          <p>Vente par categorie</p>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
