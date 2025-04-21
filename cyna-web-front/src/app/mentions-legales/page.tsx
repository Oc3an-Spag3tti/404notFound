import React from "react";

export default function LegalMentions() {
  return (
    <div className="min-h-screen bg-purple-800 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Legal Mentions
        </h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Website Information</h2>
            <p>Website name: MyCompany</p>
            <p>Website URL: https://mycompany.com</p>
            <p>Company name: MyCompany Inc.</p>
            <p>Legal form: Corporation</p>
            <p>Registered office: 123 Example Street, City</p>
            <p>Registration number: 123456789</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Contact Information</h2>
            <p>Email: contact@mycompany.com</p>
            <p>Phone: +1 234 567 890</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Hosting Information</h2>
            <p>Hosting provider: Vercel</p>
            <p>Address: 340 S Lemon Ave #4133, Walnut, CA 91789</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Intellectual Property</h2>
            <p>All content on this website, including but not limited to text, graphics, logos, and images, is the property of MyCompany and is protected by intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Privacy Policy</h2>
            <p>We are committed to protecting your privacy. Our privacy policy explains how we collect, use, and protect your personal information.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 