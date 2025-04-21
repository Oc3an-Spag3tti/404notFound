import React from "react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-purple-800 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Terms of Use
        </h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on MyCompany's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">3. User Account</h2>
            <p>To access certain features of the website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">4. Prohibited Uses</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the website in any way that violates any applicable laws or regulations</li>
              <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
              <li>Attempting to interfere with the proper working of the website</li>
              <li>Using the website to distribute unsolicited promotional or commercial content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">5. Limitation of Liability</h2>
            <p>MyCompany shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">6. Changes to Terms</h2>
            <p>MyCompany reserves the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 