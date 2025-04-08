import React from "react";
import Link from "next/link";


export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Register
        </h1>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
