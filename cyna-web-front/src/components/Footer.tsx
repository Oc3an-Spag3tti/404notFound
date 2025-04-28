// components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-700 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Contact Section */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <p className="text-sm">Address: 123 Example Street, City</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
        </div>

        {/* Legal Links Section */}
        <div className="text-center md:text-right">
          <h2 className="text-lg font-bold mb-2">Legal Links</h2>
          <ul className="space-y-1">
            <li>
              <a
                href="/mentions-legales"
                className="text-gray-200 hover:text-white transition-colors"
              >
                Legal Mentions
              </a>
            </li>
            <li>
              <a
                href="/cgu"
                className="text-gray-200 hover:text-white transition-colors"
              >
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} CYNA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
