"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Database,
  Save,
  RefreshCcw,
  Globe,
  Mail,
  Lock,
  Terminal,
} from "lucide-react";

export default function ProperSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: <Settings size={18} /> },
    { id: "profile", label: "Club Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <ShieldCheck size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-100px)] gap-8 p-4">
      {/* 1. Glassmorphism Navigation Sidebar */}
      <div className="w-full lg:w-72 flex flex-col gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
              activeTab === tab.id
                ? "bg-[#1a1d21] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] scale-[1.02]"
                : "text-gray-400 hover:bg-white/50 hover:text-gray-700"
            }`}
          >
            <span
              className={`${activeTab === tab.id ? "text-[#028237]" : "text-gray-400"}`}
            >
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}

        {/* Database Widget (Fixed placement) */}
        <div className="mt-auto p-6 bg-green-50/50 border border-green-100/50 rounded-[2rem] backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 text-[#028237]">
            <Database size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Live Database
            </span>
          </div>
          <div className="space-y-1 font-mono text-[10px] text-gray-400">
            <p>
              Node: <span className="text-gray-600">BU_Cloud_01</span>
            </p>
            <p>
              Status: <span className="text-[#028237]">Connected</span>
            </p>
          </div>
          <button className="mt-4 flex items-center gap-2 text-[10px] font-black text-[#028237] hover:opacity-70 transition-opacity uppercase">
            <RefreshCcw size={12} /> Sync_System
          </button>
        </div>
      </div>

      {/* 2. Main Terminal Panel */}
      <div className="flex-1 bg-white roundedshadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="bg-[#1a1d21] px-8 py-5 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <Terminal size={16} className="text-[#028237]" />
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.3em]">
              CONFIG_MODULE // {activeTab.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-10 lg:p-14 overflow-y-auto">
          {activeTab === "general" && (
            <div className="max-w-3xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Field Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 group-focus-within:text-[#028237] transition-colors">
                    Club Official Name
                  </label>
                  <div className="relative">
                    <Globe
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />
                    <input
                      type="text"
                      defaultValue="BU CSE Club"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] text-sm font-medium focus:bg-white focus:border-[#028237]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="group space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1 group-focus-within:text-[#028237] transition-colors">
                    Support Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                      size={18}
                    />
                    <input
                      type="email"
                      defaultValue="cseclub@bu.ac.bd"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] text-sm font-medium focus:bg-white focus:border-[#028237]/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Maintenance Toggle Card */}
              <div className="p-8 rounded-[2rem] bg-[#028237]/5 border border-[#028237]/10 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">
                    Maintenance Mode
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Take the site offline for updates. Only admins can enter.
                  </p>
                </div>
                <button className="w-14 h-7 bg-gray-200 rounded-full relative p-1 transition-colors hover:bg-gray-300">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-10 flex items-center justify-end gap-6 border-t border-gray-100">
                <button className="text-xs font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest">
                  Discard_Changes
                </button>
                <button className="flex items-center gap-3 px-10 py-4 bg-[#028237] text-white rounded-2xl font-black text-xs shadow-xl shadow-[#028237]/30 hover:shadow-[#028237]/50 hover:-translate-y-0.5 transition-all">
                  <Save size={18} /> COMMIT_CHANGES
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
