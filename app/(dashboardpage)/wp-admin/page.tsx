/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Redirection after login
  useEffect(() => {
    if (session?.user) {
      const userType = (session.user as any)?.role; // Changed to 'role' to match typical naming
      if (userType === "Administrator") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Keep this false to handle logic manually
      });

      if (result?.error) {
        toast.error("Invalid email or password");
        setLoading(false);
      } else {
        toast.success("Logged in successfully!");

        // Instead of waiting for useEffect, trigger a refresh to get the new session
        // then redirect immediately.
        router.refresh();

        // Note: If you want to check the role here, you'd usually
        // need to fetch the session manually or just redirect to
        // a "loading" route that handles the logic.
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-auto flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-8">
        <div className="text-center mb-6">
          <h1 className="md:text-2xl text-xl font-bold text-gray-800">
            Quick Carpentry Singapore
          </h1>
          <p className="text-gray-500 text-sm">Welcome back! Please login.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            {/* <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300" />
              Remember Me
            </label> */}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white w-full px-6 py-2 rounded transition font-medium`}
            >
              {loading ? "Processing..." : "Log In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center space-y-2">
          <a href="#" className="text-sm text-blue-600 hover:underline block">
            Lost your password?
          </a>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:underline block"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
