"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Users,
  User,
  Mail,
  Lock,
  Shield,
  ChevronLeft,
  Check,
  Loader2,
  AtSign,
} from "lucide-react";

const ROLES = [
  {
    value: "Administrator",
    desc: "Full access to all settings",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  {
    value: "Editor",
    desc: "Can manage all content",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  {
    value: "Author",
    desc: "Can publish own posts",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    dot: "bg-violet-500",
  },
  {
    value: "Subscriber",
    desc: "Read-only access",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
];

const inputCls =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 " +
  "placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white transition-all";

export default function UpdateUserFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // Assumes route is dashboard/users/[id]

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Subscriber");

  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Fetch data if in Edit Mode
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        setFetching(true);
        try {
          const res = await fetch(`/api/users/${id}`);
          const result = await res.json();
          if (result.success) {
            setUsername(result.data.username);
            setName(result.data.name);
            setEmail(result.data.email);
            setRole(result.data.role);
            // We usually don't set the password for security/UX reasons
          } else {
            toast.error("User not found");
          }
        } catch (err) {
          toast.error("Error loading user data");
        } finally {
          setFetching(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const selectedRole = ROLES.find((r) => r.value === role) || ROLES[3];
  const initials = (name || username || "?")[0]?.toUpperCase() ?? "?";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // If editing, password might be optional. If adding, it's required.
    const payload = {
      username,
      name,
      email,
      role,
      ...(password && { password }),
    };

    try {
      const method = id ? "PATCH" : "POST";
      const url = id ? `/api/users/${id}` : "/api/users";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`User ${id ? "updated" : "added"} successfully!`);
        router.push("/dashboard/users");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to process request");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
        <p className="text-sm text-gray-400">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5  mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/users"
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center
                     text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              {id ? "Update User" : "Add New User"}
            </h1>
            <p className="text-xs text-gray-400">
              {id
                ? `Editing profile for ${username}`
                : "Create a new account with a specific role"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ── Identity card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Identity
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <AtSign className="w-3.5 h-3.5 text-violet-400" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. john_doe"
                required
                className={inputCls}
              />
            </div>
            <div className="px-6 py-5">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <User className="w-3.5 h-3.5 text-violet-400" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                required
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* ── Credentials card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Credentials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 py-5 border-b md:border-b-0 md:border-r border-gray-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className={inputCls}
              />
            </div>
            <div className="px-6 py-5">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <Lock className="w-3.5 h-3.5 text-violet-400" />
                Password{" "}
                {id && (
                  <span className="text-[10px] lowercase text-gray-400 font-normal">
                    (Leave blank to keep current)
                  </span>
                )}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={id ? "••••••••" : "Min. 6 characters"}
                required={!id}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* ── Role card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              User Role
            </h2>
          </div>
          <div className="px-6 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ROLES.map((r) => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border-2 text-left transition-all duration-150
                    ${role === r.value ? `${r.bg} ${r.border} ${r.color}` : "bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200"}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`w-2 h-2 rounded-full ${r.dot}`} />
                    {role === r.value && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-xs font-semibold">{r.value}</span>
                  <span className="text-[10px] leading-tight opacity-70">
                    {r.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Preview strip ── */}
        {(username || name || email) && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm ${selectedRole.bg} ${selectedRole.border} ${selectedRole.color}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {name || username || "—"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {email || "no email yet"}
                  </p>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${selectedRole.bg} ${selectedRole.border} ${selectedRole.color}`}
              >
                {selectedRole.value}
              </span>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="flex items-center justify-between py-2">
          <Link
            href="/dashboard/users"
            className="text-xs text-gray-400 hover:text-gray-700 font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
              ${loading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-200"}`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : id ? (
              "Update User"
            ) : (
              "Save User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
