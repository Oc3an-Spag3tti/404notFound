import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-purple-800 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          About Us
        </h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Our Story</h2>
            <p className="text-lg">
              Founded in 2024, MyCompany has been at the forefront of innovation in our industry. 
              We started with a simple mission: to provide high-quality products and exceptional 
              service to our customers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Our Mission</h2>
            <p className="text-lg">
              Our mission is to deliver outstanding value to our customers through innovative 
              solutions, superior quality products, and exceptional customer service. We strive 
              to create lasting relationships with our clients and contribute positively to our 
              community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customer Satisfaction: We put our customers first in everything we do</li>
              <li>Innovation: We continuously seek new and better ways to serve our customers</li>
              <li>Quality: We maintain the highest standards in our products and services</li>
              <li>Integrity: We conduct business with honesty and transparency</li>
              <li>Sustainability: We are committed to environmentally responsible practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Our Team</h2>
            <p className="text-lg">
              Our team consists of passionate professionals dedicated to excellence. 
              We believe in collaboration, continuous learning, and maintaining a 
              positive work environment that fosters creativity and growth.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-purple-600 mb-4">Contact Us</h2>
            <p className="text-lg">
              We'd love to hear from you! Whether you have questions about our products, 
              need support, or want to explore partnership opportunities, our team is here 
              to help.
            </p>
            <div className="mt-4">
              <a 
                href="/contact" 
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Get in Touch
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
