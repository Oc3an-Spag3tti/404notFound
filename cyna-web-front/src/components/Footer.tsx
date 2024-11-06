// components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Contact</h2>
          <p>Adresse : 123 Rue Exemple, Ville</p>
          <p>Téléphone : 01 23 45 67 89</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Liens Légaux</h2>
          <ul>
            <li><a href="/mentions-legales" className="text-gray-300 hover:text-white">Mentions Légales</a></li>
            <li><a href="/cgu" className="text-gray-300 hover:text-white">Conditions Générales d&aposUtilisation</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
