/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowLeft } from "lucide-react";

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
      const userType = (session.user as any)?.role;
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
    console.log(email);
    console.log(password);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
        setLoading(false);
      } else {
        toast.success("Welcome back to BU CSE Club!");
        router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("A technical error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#028237]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#ff6900]/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white shadow-2xl shadow-gray-200/50 rounded-3xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#028237]/10 rounded-2xl mb-4">
              <ShieldCheck className="w-8 h-8 text-[#028237]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#028237] tracking-tight">
              BU CSE <span className="text-[#ff6900]">CLUB</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              Member Portal Authentication
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#028237] focus:border-transparent outline-none transition-all bg-gray-50/50"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#028237] focus:border-transparent outline-none transition-all bg-gray-50/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`relative overflow-hidden group w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-[#028237]/20 ${
                loading ? "bg-gray-400" : "bg-[#028237] hover:bg-[#026b2d]"
              }`}
            >
              <span className="relative z-10">
                {loading ? "AUTHENTICATING..." : "LOG IN TO PORTAL"}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              )}
            </button>
          </form>

          <div className=" pt-6 border-t border-gray-100 text-center space-y-3">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-[#ff6900] transition-colors font-medium block"
            >
              Forgot your credentials?
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#028237] hover:gap-3 transition-all font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Club Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
