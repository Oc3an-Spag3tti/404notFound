"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation avec Zod
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      // Store the token in a cookie
      document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`;
      toast.success("Login successful!");
      router.push("/productsBackOffice"); // Navigate to products page
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Login
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              disabled={isLoading}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          First time here?{" "}
          <Link href="/register" className="text-purple-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
