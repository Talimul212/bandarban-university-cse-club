/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState, useMemo } from "react";
import {
  User,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  CreditCard,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  UploadCloud,
  X,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

// Types
interface Education {
  institutionName: string;
  degree: string;
  yearCompleted: string;
}

interface FileState {
  file: File | null;
  preview: string | null;
  error: string | null;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  educationList: Education[];
  educationNotes: string;
  paymentMethod: string;
  paymentReference: string;
  declarationDate: string;
}

interface FormErrors {
  [key: string]: string;
}

// File Upload Box
function FileUploadBox({
  label,
  required,
  accept,
  fileState,
  onChange,
  hint,
}: {
  label: string;
  required?: boolean;
  accept?: string;
  fileState: FileState;
  onChange: (file: File | null, preview: string | null) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return onChange(null, null);

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      onChange(null, null);
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => onChange(file, ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      onChange(file, null);
    }
  };
  // Remove file handler
  const handleRemove = () => {
    onChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {fileState.file ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span className="text-sm text-green-800 font-medium truncate">
              {fileState.file.name}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1 hover:bg-green-100 rounded-full transition shrink-0 ml-2"
          >
            <X size={14} className="text-green-700" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50/50 transition-all group"
        >
          <UploadCloud
            size={22}
            className="text-gray-300 group-hover:text-green-500 transition-colors"
          />
          <div className="text-center">
            <p className="text-xs font-semibold text-gray-500 group-hover:text-green-700 transition-colors">
              Click to upload
            </p>
            {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
          </div>
        </div>
      )}

      {fileState.error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} /> {fileState.error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}

// Form section header
function SectionHeader({
  icon: Icon,
  title,
  color = "text-green-600",
  children,
}: {
  icon: React.ElementType;
  title: string;
  color?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-50 rounded-lg">
          <Icon className={color} size={20} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// Input Field
function InputField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white placeholder:text-gray-300";
const readonlyCls =
  "w-full px-3 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-600 cursor-not-allowed outline-none";

// Main Form component
export default function FormDetails() {
  const searchParams = useSearchParams();

  const enrollData = useMemo(
    () => ({
      courseId: searchParams.get("courseId") || "",
      fee: searchParams.get("fee") || "",
      title: searchParams.get("title") || "",
      type: searchParams.get("type") || "",
    }),
    [searchParams],
  );

  // Form states declaration
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Not Specified",
    email: "",
    phone: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
    educationList: [{ institutionName: "", degree: "", yearCompleted: "" }],
    educationNotes: "",
    paymentMethod: "Bank Transfer",
    paymentReference: "",
    declarationDate: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isAdult, setIsAdult] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Necessary file state declarations
  const [files, setFiles] = useState<{ [key: string]: FileState }>({
    nid: { file: null, preview: null, error: null },
    birthCert: { file: null, preview: null, error: null },
    educationCert: { file: null, preview: null, error: null },
    signature: { file: null, preview: null, error: null },
  });

  // File change handler
  const handleFileChange =
    (key: string) => (file: File | null, preview: string | null) => {
      setFiles((prev) => ({ ...prev, [key]: { file, preview, error: null } }));
    };

  // Input field change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  // Date of Birth change handler with ag calculation
  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const dob = new Date(e.target.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    setIsAdult(age >= 18);
  };

  // Add degree handler
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationList: [
        ...prev.educationList,
        { institutionName: "", degree: "", yearCompleted: "" },
      ],
    }));
  };

  // Remove degree handler
  const removeEducation = (index: number) => {
    if (formData.educationList.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      educationList: prev.educationList.filter((_, i) => i !== index),
    }));
  };
  // Education field change handler
  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev.educationList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, educationList: updated };
    });
  };

  // Custom Form Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!isAdult) {
      if (!formData.guardianName.trim())
        newErrors.guardianName = "Guardian name is required";
      if (!formData.guardianPhone.trim())
        newErrors.guardianPhone = "Guardian contact is required";
    }

    if (!files.nid.file) newErrors.nid = "NID is required";
    if (!files.signature.file) newErrors.signature = "Signature is required";
    if (!formData.paymentReference.trim())
      newErrors.paymentReference = "Payment reference is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstErrorEl = document.querySelector("[data-error='true']");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === "educationList") {
          fd.append(k, JSON.stringify(v));
        } else {
          fd.append(k, v as string);
        }
      });

      Object.entries(enrollData).forEach(([k, v]) => {
        fd.append(k, v);
      });

      if (files.nid.file) fd.append("nid", files.nid.file);
      if (files.birthCert.file) fd.append("birthCert", files.birthCert.file);
      if (files.educationCert.file)
        fd.append("educationCert", files.educationCert.file);
      if (files.signature.file) fd.append("signature", files.signature.file);

      const response = await fetch("/api/enrollments", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setSubmitted(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fullName =
    `${formData.firstName} ${formData.lastName}`.trim() || "[Student Name]";

  // Form submission success message
  if (submitted) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-lg">
            Loading enrollment page...
          </div>
        }
      >
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              Enrollment Submitted!
            </h2>
            <p className="text-gray-500 leading-relaxed mb-2">
              Thank you,{" "}
              <span className="font-bold text-gray-800">{fullName}</span>.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Your enrollment for{" "}
              <span className="font-semibold text-green-700">
                {enrollData.title}
              </span>{" "}
              has been received. We'll contact you at{" "}
              <span className="font-medium text-gray-700">
                {formData.email}
              </span>{" "}
              shortly.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm text-gray-600 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-400">Course</span>
                <span className="font-semibold text-gray-800">
                  {enrollData.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fee</span>
                <span className="font-semibold text-green-700">
                  {enrollData.fee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method</span>
                <span className="font-semibold text-gray-800">
                  {formData.paymentMethod}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-green-600 hover:underline"
            >
              Submit another enrollment
            </button>
          </div>
        </div>
      </Suspense>
    );
  }

  // ==========================
  // Main Form UI IS START FROM HERE
  // ========================
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ── Header Card ── */}

        <div className="bg-linear-to-br from-green-700 via-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-6 shadow-lg shadow-green-200">
          <div className="flex items-start justify-start md:flex-row flex-col gap-4">
            <div className="flex-1">
              {/* Breadcrumb */}
              <Link
                href="/wings"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Wings
              </Link>
              <p className="text-green-200 text-xs font-bold uppercase tracking-widest mb-2">
                Enrollment Application
              </p>
              <h1 className="text-3xl font-black leading-tight">
                Course Enrollment Form
              </h1>
              <p className="mt-2 text-green-100/80 text-sm max-w-lg leading-relaxed">
                Please fill in all required fields thoroughly to ensure
                successful enrollment.
              </p>
            </div>
            {enrollData.title && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-right shrink-0">
                <p className="text-green-200 text-xs font-bold uppercase tracking-wider">
                  Enrolling for
                </p>
                <p className="text-white font-black text-base mt-0.5">
                  {enrollData.title}
                </p>
                <p className="text-green-200 font-bold text-sm mt-0.5">
                  {enrollData.fee}
                </p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            {/* ── Student Information ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <SectionHeader icon={User} title="Student Information">
                <span className="text-xs text-gray-400 font-medium">
                  <span className="text-red-500">*</span> Required fields
                </span>
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="First Name"
                  required
                  error={errors.firstName}
                >
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`${inputCls} ${errors.firstName ? "border-red-300 focus:ring-red-400" : ""}`}
                    data-error={!!errors.firstName}
                  />
                </InputField>

                <InputField label="Last Name" required error={errors.lastName}>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`${inputCls} ${errors.lastName ? "border-red-300 focus:ring-red-400" : ""}`}
                  />
                </InputField>

                <InputField
                  label="Date of Birth"
                  required
                  error={errors.dateOfBirth}
                >
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleDOBChange}
                    className={`${inputCls} ${errors.dateOfBirth ? "border-red-300 focus:ring-red-400" : ""}`}
                  />
                </InputField>

                <InputField label="Gender" required>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputCls}
                    required
                  >
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </InputField>

                <InputField label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={`${inputCls} ${errors.email ? "border-red-300 focus:ring-red-400" : ""}`}
                  />
                </InputField>

                <InputField label="Phone Number" required error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className={`${inputCls} ${errors.phone ? "border-red-300 focus:ring-red-400" : ""}`}
                  />
                </InputField>

                <div className="md:col-span-2">
                  <InputField label="Address" required error={errors.address}>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Street, Thana, District, ZIP"
                      className={`${inputCls} resize-none ${errors.address ? "border-red-300 focus:ring-red-400" : ""}`}
                    />
                  </InputField>
                </div>
              </div>
            </div>

            {/* ── Enrollment Details ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <SectionHeader icon={BookOpen} title="Enrollment Details" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Course Title">
                  <input
                    type="text"
                    defaultValue={enrollData.title}
                    readOnly
                    className={readonlyCls}
                  />
                </InputField>
                <InputField label="Program Type">
                  <input
                    type="text"
                    defaultValue={enrollData.type}
                    readOnly
                    className={readonlyCls}
                  />
                </InputField>
              </div>
            </div>

            {/* ── Guardian (Conditional) ── */}
            {!isAdult && (
              <div className="bg-orange-50 rounded-2xl border border-orange-200 p-8 animate-in fade-in duration-300">
                <SectionHeader
                  icon={ShieldCheck}
                  title="Guardian / Parent Details"
                  color="text-orange-600"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <InputField
                    label="Guardian Name"
                    required
                    error={errors.guardianName}
                  >
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      placeholder="Full name"
                      className={`${inputCls} ${errors.guardianName ? "border-red-300" : "border-orange-200 focus:ring-orange-400"}`}
                    />
                  </InputField>
                  <InputField
                    label="Contact Number"
                    required
                    error={errors.guardianPhone}
                  >
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      placeholder="+880..."
                      className={`${inputCls} ${errors.guardianPhone ? "border-red-300" : "border-orange-200 focus:ring-orange-400"}`}
                    />
                  </InputField>
                  <InputField label="Relationship">
                    <input
                      type="text"
                      name="guardianRelation"
                      value={formData.guardianRelation}
                      onChange={handleChange}
                      placeholder="e.g. Father"
                      className={`${inputCls} border-orange-200 focus:ring-orange-400`}
                    />
                  </InputField>
                </div>
              </div>
            )}

            {/* ── Previous Education ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <SectionHeader icon={GraduationCap} title="Previous Education">
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center gap-1.5 text-sm bg-green-50 text-green-700 px-4 py-1.5 rounded-full hover:bg-green-100 font-semibold transition"
                >
                  <Plus size={15} /> Add More
                </button>
              </SectionHeader>

              <div className="space-y-3">
                {formData.educationList.map((edu, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-gray-50 border border-gray-100 p-4 rounded-xl"
                  >
                    <div className="md:col-span-5 space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-400 tracking-wide">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institutionName}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institutionName",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. Dhaka University"
                        className={inputCls}
                      />
                    </div>
                    <div className="md:col-span-4 space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-400 tracking-wide">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        placeholder="e.g. B.Sc. in CSE"
                        className={inputCls}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold uppercase text-gray-400 tracking-wide">
                        Year
                      </label>
                      <input
                        type="text"
                        value={edu.yearCompleted}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "yearCompleted",
                            e.target.value,
                          )
                        }
                        placeholder="2023"
                        className={inputCls}
                      />
                    </div>
                    <div className="md:col-span-1 flex justify-center pb-1">
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        disabled={formData.educationList.length === 1}
                        className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <InputField label="Additional Notes">
                  <textarea
                    name="educationNotes"
                    value={formData.educationNotes}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                    rows={3}
                    placeholder="Any additional academic information..."
                  />
                </InputField>
              </div>
            </div>

            {/* ── Required Documents ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <SectionHeader icon={FileText} title="Required Documents" />

              {errors.nid && (
                <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  <AlertCircle size={15} /> {errors.nid}
                </div>
              )}
              {errors.signature && (
                <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  <AlertCircle size={15} /> {errors.signature}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <FileUploadBox
                  label="NID"
                  required
                  accept="image/*,.pdf"
                  fileState={files.nid}
                  onChange={handleFileChange("nid")}
                  hint="JPG, PNG or PDF · Max 5MB"
                />
                <FileUploadBox
                  label="Birth Certificate"
                  accept="image/*,.pdf"
                  fileState={files.birthCert}
                  onChange={handleFileChange("birthCert")}
                  hint="Optional · Max 5MB"
                />
                <FileUploadBox
                  label="Education Certificate"
                  accept="image/*,.pdf"
                  fileState={files.educationCert}
                  onChange={handleFileChange("educationCert")}
                  hint="Scanned copy · Max 5MB"
                />
                <FileUploadBox
                  label="Signature"
                  required
                  accept="image/*"
                  fileState={files.signature}
                  onChange={handleFileChange("signature")}
                  hint="100X80px · PNG/JPG"
                />
              </div>
            </div>

            {/* ── Payment Information ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <SectionHeader icon={CreditCard} title="Payment Information" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField label="Tuition Fee">
                  <input
                    type="text"
                    defaultValue={enrollData.fee}
                    readOnly
                    className={readonlyCls}
                  />
                </InputField>

                <InputField label="Payment Method" required>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="" disabled selected>
                      Payment Method
                    </option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Cash">Cash</option>
                  </select>
                </InputField>

                <InputField
                  label="Payment Reference / TxID"
                  required
                  error={errors.paymentReference}
                >
                  <input
                    type="text"
                    name="paymentReference"
                    value={formData.paymentReference}
                    onChange={handleChange}
                    placeholder="e.g. TXN-2024XXXX"
                    className={`${inputCls} ${errors.paymentReference ? "border-red-300 focus:ring-red-400" : ""}`}
                  />
                </InputField>
              </div>
            </div>

            {/* ── Declaration ── */}
            <div className="bg-linear-to-br from-slate-50 to-green-50/30 rounded-2xl border border-gray-100 p-8">
              <h3 className="text-lg font-black text-gray-800 mb-5">
                Declaration
              </h3>

              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
                <p className="text-gray-600 leading-relaxed text-sm italic">
                  "I,{" "}
                  <span className="font-black text-gray-900 not-italic border-b-2 border-green-400 pb-0.5 px-0.5">
                    {fullName}
                  </span>
                  , confirm that the information provided above is true and
                  accurate to the best of my knowledge. I agree to the course
                  enrollment terms and conditions and understand that providing
                  false information may result in disqualification."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
                {/* Signature Preview */}
                <div>
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest block mb-3">
                    Signature
                  </label>
                  <div className="min-h-20 border-b-2 border-gray-300 flex items-end pb-2">
                    {files.signature.preview ? (
                      <img
                        src={files.signature.preview}
                        alt="Applicant Signature"
                        className="max-h-20 max-w-50 object-contain"
                      />
                    ) : (
                      <p className="text-gray-300 text-sm italic pb-1">
                        Signature will appear here after upload above ↑
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-semibold">
                    {fullName}
                  </p>
                </div>

                {/* Date */}
                <div>
                  <InputField label="Date">
                    <input
                      type="date"
                      name="declarationDate"
                      value={formData.declarationDate}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 outline-none pb-2 text-sm font-medium text-gray-700 transition-colors"
                    />
                  </InputField>
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div className="md:flex items-center justify-between pt-2 pb-8">
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-red-500 ">*</span> All required fields
                must be filled
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 md:w-auto w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-10 py-3.5 rounded-lg font-bold text-base shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-0.5 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Submit Enrollment
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
