// Sub-components
"use client";
function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="bg-white border border-green-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${accent}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
      </div>
    </div>
  );
}
export default StatCard;
