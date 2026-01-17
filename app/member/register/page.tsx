/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-[#028237]/30 p-8 md:p-12">
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/CSE_Club_Logo.png"
            alt="BU CSE Club Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#028237]">
            BU CSE Club<span className="text-[#ff6900]"> Membership Form</span>
          </h2>
        </div>

        <div className="text-center mb-8">
          <p className="mt-2 text-gray-600">
            Fill out the form below to become a member of our tech community.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
            />
          </div>

          {/* Batch & Session */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch
              </label>
              <input
                type="text"
                placeholder="e.g. 5th"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session
              </label>
              <input
                type="text"
                placeholder="e.g. Spring-2022"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none">
              <option value="">Select Department</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="GDS">Governance & Development Studies</option>
              <option value="ENG">Bachelor of Arts in English</option>
              <option value="BBA">Business Administration</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Why Join */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why do you want to join?
            </label>
            <textarea
              rows={4}
              placeholder="Tell us why you want to join the club..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
            ></textarea>
          </div>
          {/* Treasurer Info */}
          <div className="mb-6 text-sm text-gray-700">
            <p>
              <span className="font-semibold text-[#028237]">
                Financial Sectary:
              </span>{" "}
              Hasan Imam Uddin Mehedi
            </p>
            <p>
              <span className="font-semibold text-[#028237]">Number:</span>{" "}
              01703666771 (Bkash / Nagad)
            </p>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bkash */}
              <div className="border rounded-lg p-4 bg-[#028237]/5">
                <p className="text-sm font-semibold text-[#028237]">Bkash</p>
                <p className="text-sm text-gray-700">01XXXXXXX</p>
                <p className="text-xs text-gray-500">
                  {" "}
                  Hasan Imam Uddin Mehedi (Financial Sectary)
                </p>
              </div>

              {/* Nagad */}
              <div className="border rounded-lg p-4 bg-[#028237]/5">
                <p className="text-sm font-semibold text-[#028237]">Nagad</p>
                <p className="text-sm text-gray-700">01XXXXXXXX</p>
                <p className="text-xs text-gray-500">
                  {" "}
                  Hasan Imam Uddin Mehedi (Financial Sectary)
                </p>
              </div>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your transaction ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              You'll receive a transaction ID after completing the payment.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full  px-6 py-3 rounded-full bg-[#028237] text-white font-semibold hover:bg-[#02662c] transition"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
