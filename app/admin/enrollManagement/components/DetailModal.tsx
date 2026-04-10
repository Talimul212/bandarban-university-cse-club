"use client";
import { Enrollment } from "@/utils/types";
import { X } from "lucide-react";
import Image from "next/image";

function DetailModal({
  enrollment,
  onClose,
}: {
  enrollment: Enrollment;
  onClose: () => void;
}) {
  const baseUrl = "http://localhost:3000";

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div>
      <p className="text-[10px] font-semibold text-green-600 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-700 wrap-break-words">{value || "—"}</p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-green-700 to-green-500 rounded-t-3xl px-7 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-green-100 text-xs font-medium uppercase tracking-widest">
              Enrollment Detail
            </p>
            <h2 className="text-white text-xl font-bold mt-0.5">
              {enrollment.firstName} {enrollment.lastName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-xl p-2"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-7 py-6 space-y-6">
          {/* Personal Info */}
          <section>
            <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b border-green-100 pb-1">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" value={enrollment.firstName} />
              <Field label="Last Name" value={enrollment.lastName} />
              <Field label="Date of Birth" value={enrollment.dateOfBirth} />
              <Field label="Gender" value={enrollment.gender} />
              <Field label="Email" value={enrollment.email} />
              <Field label="Phone" value={enrollment.phone} />
              <div className="col-span-2">
                <Field label="Address" value={enrollment.address} />
              </div>
            </div>
          </section>

          {/* Guardian */}
          <section>
            <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b border-green-100 pb-1">
              Guardian Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Guardian Name" value={enrollment.guardianName} />
              <Field label="Phone" value={enrollment.guardianPhone} />
              <Field label="Relation" value={enrollment.guardianRelation} />
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b border-green-100 pb-1">
              Education
            </h3>
            {enrollment.educationList.map((edu) => (
              <div
                key={edu._id}
                className="bg-green-50 rounded-xl px-4 py-3 mb-2 grid grid-cols-3 gap-3"
              >
                <Field label="Institution" value={edu.institutionName} />
                <Field label="Degree" value={edu.degree} />
                <Field label="Year" value={edu.yearCompleted} />
              </div>
            ))}
            {enrollment.educationNotes !== "not applicable" && (
              <Field label="Notes" value={enrollment.educationNotes} />
            )}
          </section>

          {/* Payment */}
          <section>
            <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b border-green-100 pb-1">
              Payment
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Method" value={enrollment.paymentMethod} />
              <Field label="Reference" value={enrollment.paymentReference} />
              <Field
                label="Declaration Date"
                value={enrollment.declarationDate}
              />
            </div>
          </section>

          {/* Documents */}
          <section>
            <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 border-b border-green-100 pb-1">
              Uploaded Documents
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "NID", url: enrollment.nidUrl },
                { label: "Birth Cert", url: enrollment.birthCertUrl },
                { label: "Edu Cert", url: enrollment.educationCertUrl },
                { label: "Signature", url: enrollment.signatureUrl },
              ]
                .filter((d) => d.url)
                .map((doc) => (
                  <a
                    key={doc.label}
                    href={`${baseUrl}${doc.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-400 rounded-xl py-4 transition-all"
                  >
                    <Image
                      src={`${baseUrl}${doc.url}`}
                      alt={doc.label}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg w-16 h-16"
                      unoptimized
                    />
                    <span className="text-xs font-semibold text-green-700 group-hover:text-green-800">
                      {doc.label}
                    </span>
                  </a>
                ))}
            </div>
          </section>

          {/* Meta */}
          <p className="text-[11px] text-gray-400 text-right">
            Submitted:{" "}
            {new Date(enrollment.createdAt).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
export default DetailModal;
