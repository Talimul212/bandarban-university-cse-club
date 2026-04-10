"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Search,
  Shield,
  ChevronDown,
  Trash2,
  RefreshCw,
  User,
  Pencil,
} from "lucide-react";

type UserType = {
  _id?: string;
  username: string;
  name: string;
  email: string;
  role: string;
};

const ROLES = ["Administrator", "Editor", "Author", "Subscriber"];

const roleBadge: Record<string, string> = {
  Administrator: "bg-red-50 text-red-600 border-red-100",
  Editor: "bg-sky-50 text-sky-600 border-sky-100",
  Author: "bg-violet-50 text-violet-600 border-violet-100",
  Subscriber: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const roleAvatar: Record<string, string> = {
  Administrator: "bg-red-50 text-red-500 border-red-100",
  Editor: "bg-sky-50 text-sky-500 border-sky-100",
  Author: "bg-violet-50 text-violet-500 border-violet-100",
  Subscriber: "bg-emerald-50 text-emerald-500 border-emerald-100",
};

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-3 bg-gray-100 rounded-full animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function UserPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [bulkAction, setBulkAction] = useState("Bulk actions");
  const [changeRole, setChangeRole] = useState("Change role to…");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();
        if (result.success) setUsers(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const uid = (u: UserType) => u._id ?? u.email;

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        u.username?.toLowerCase().includes(q) ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q);
      const matchRole = !roleFilter || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(uid)));
    }
  };

  const handleApplyBulk = () => {
    if (bulkAction === "Delete") {
      setUsers((prev) => prev.filter((u) => !selected.has(uid(u))));
      setSelected(new Set());
    }
    setBulkAction("Bulk actions");
  };

  const handleChangeRole = () => {
    if (changeRole === "Change role to…") return;
    setUsers((prev) =>
      prev.map((u) => (selected.has(uid(u)) ? { ...u, role: changeRole } : u)),
    );
    setSelected(new Set());
    setChangeRole("Change role to…");
  };

  const handleDeleteRow = (id: string) => {
    setUsers((prev) => prev.filter((u) => uid(u) !== id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  };

  const roleCounts = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach((u) => {
      map[u.role] = (map[u.role] ?? 0) + 1;
    });
    return map;
  }, [users]);

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              Users
            </h1>
            <p className="text-xs text-gray-400">
              {users.length} total members
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/users/add"
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white
                     text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Add User
        </Link>
      </div>

      {/* ── Role tabs ── */}
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={() => setRoleFilter("")}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150
            ${
              !roleFilter
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
        >
          All <span className="ml-1 opacity-50">({users.length})</span>
        </button>
        {ROLES.map((role) =>
          roleCounts[role] ? (
            <button
              key={role}
              onClick={() => setRoleFilter(roleFilter === role ? "" : role)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150
                ${
                  roleFilter === role
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
            >
              {role}{" "}
              <span className="ml-1 opacity-50">({roleCounts[role]})</span>
            </button>
          ) : null,
        )}
      </div>

      {/* ── Main card ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2
                         text-xs text-gray-800 placeholder-gray-400
                         focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
            />
          </div>

          {/* Bulk */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl
                           pl-3 pr-8 py-2 text-xs text-gray-600 focus:outline-none cursor-pointer"
              >
                <option>Bulk actions</option>
                <option>Delete</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
            <button
              onClick={handleApplyBulk}
              disabled={selected.size === 0 || bulkAction === "Bulk actions"}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl
                         bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200
                         disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {bulkAction === "Delete" ? (
                <Trash2 className="w-3 h-3 text-red-500" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              Apply
            </button>
          </div>

          {/* Change role */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={changeRole}
                onChange={(e) => setChangeRole(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl
                           pl-3 pr-8 py-2 text-xs text-gray-600 focus:outline-none cursor-pointer"
              >
                <option>Change role to…</option>
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
            <button
              onClick={handleChangeRole}
              disabled={selected.size === 0 || changeRole === "Change role to…"}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl
                         bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200
                         disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Shield className="w-3 h-3" />
              Change
            </button>
          </div>

          {selected.size > 0 && (
            <span className="text-xs text-violet-500 font-medium ml-auto">
              {selected.size} selected
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selected.size === filtered.length && filtered.length > 0
                    }
                    onChange={toggleAll}
                    className="accent-gray-900 w-3.5 h-3.5 cursor-pointer"
                  />
                </th>
                {["Username", "Name", "Email", "Role", ""].map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-gray-400 font-semibold tracking-wide uppercase text-[10px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <User className="w-8 h-8 opacity-20" />
                      <span>No users found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => {
                  const id = uid(user);
                  const isChecked = selected.has(id);
                  const avatarCls =
                    roleAvatar[user.role] ??
                    "bg-gray-100 text-gray-500 border-gray-200";

                  return (
                    <tr
                      key={id ?? idx}
                      className={`border-b border-gray-50 transition-colors duration-100 group
                        ${isChecked ? "bg-violet-50/40" : "hover:bg-gray-50/60"}`}
                    >
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelect(id)}
                          className="accent-gray-900 w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>

                      {/* Username + hover actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${avatarCls}`}
                          >
                            <span className="text-[10px] font-bold uppercase">
                              {user.username?.[0] ?? "?"}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {user.username}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                              <Link
                                // href={`/dashboard/users/${user._id}/edit`}
                                href={`/dashboard/users`}
                                className="flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-colors"
                              >
                                <Pencil className="w-3 h-3" /> Edit
                              </Link>
                              <span className="text-gray-200">|</span>
                              <button
                                onClick={() => handleDeleteRow(id)}
                                className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-gray-500">{user.name}</td>
                      <td className="px-4 py-3.5 text-gray-500">
                        {user.email}
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[10px] font-semibold
                          ${roleBadge[user.role] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <Link
                          href={`/dashboard/users/add/${user._id}`}
                          // href={`/dashboard/users`}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1.5 rounded-lg
                                     bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs text-gray-400">
              Showing {filtered.length} of {users.length} users
            </span>
            {roleFilter && (
              <button
                onClick={() => setRoleFilter("")}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                Clear filter ×
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
