// components/LegalPagesLinks.tsx
const LegalPagesLinks: React.FC = () => {
  return (
    <section className="container mx-auto p-6 text-center">
      <h2 className="text-lg font-bold mb-2">Liens Légaux</h2>
      <ul className="flex justify-center space-x-4">
        <li>
          <a href="/mentions-legales" className="text-blue-500 hover:underline">
            Mentions Légales
          </a>
        </li>
        <li>
          <a href="/cgu" className="text-blue-500 hover:underline">
            Conditions Générales d&apos;Utilisation
          </a>
        </li>
      </ul>
    </section>
  );
};

export default LegalPagesLinks;
