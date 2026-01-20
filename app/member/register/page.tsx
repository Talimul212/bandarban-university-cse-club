"use client";
import { useState } from "react";
import Image from "next/image";
/*
Steps of to enable new Membership email
npm install
.local.env
**env variables

SMTP_HOST=smtp.gmail.com
SMTP_USER=uhaimong.me@gmail.com <replace sender/ owner email>
SMTP_PASS=xxx kkkk dddd ttt <Replace sender / owner app password>

How to create app password?
1. Go to manage your google account
2. Security & Sign-in
3. 2-Step Verification
3. App passwords -> add/create password
4. Keep unique app name ->  create
5. copy password then paste environment variable
*/
export default function Membership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    session: "",
    department: "",
    reason: "",
    transactionId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log(formData);

    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage(
          "Registration successful! Check your email for confirmation.",
        );
        alert(`${message}`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          batch: "",
          session: "",
          department: "",
          reason: "",
          transactionId: "",
        });
      } else {
        setMessage("Something went wrong. Please try again.");
        alert(`${message}`);
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      alert(`${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-[#028237]/30 p-8 md:p-12">
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

        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to become a member of our tech community.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
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
                name="batch"
                value={formData.batch}
                onChange={handleChange}
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
                name="session"
                value={formData.session}
                onChange={handleChange}
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
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#028237] focus:outline-none"
            >
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
              name="reason"
              value={formData.reason}
              onChange={handleChange}
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
            <div>
              <span className="font-semibold text-[#028237]">Number:</span>{" "}
              <span className="font-bold text-xl">01703666771</span> (Bkash /
              Nagad)
            </div>
          </div>

          {/* Payment Method */}
          {/* <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-[#028237]/5">
                <p className="text-sm font-semibold text-[#028237]">Bkash</p>
                <p className="text-sm text-gray-700">01XXXXXXX</p>
                <p className="text-xs text-gray-500">
                  {" "}
                  Hasan Imam Uddin Mehedi (Financial Sectary)
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-[#028237]/5">
                <p className="text-sm font-semibold text-[#028237]">Nagad</p>
                <p className="text-sm text-gray-700">01XXXXXXXX</p>
                <p className="text-xs text-gray-500">
                  {" "}
                  Hasan Imam Uddin Mehedi (Financial Sectary)
                </p>
              </div>
            </div>
          </div> */}

          {/* Transaction ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
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
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-[#028237] text-white font-semibold hover:bg-[#02662c] transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Register Now"}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
