import { CheckCircle2, XCircle } from "lucide-react";

export function ComparisonTable() {
  const comparisonData = [
    {
      feature: "Cost",
      us: "₹199 One-Time (Lifetime Access)",
      consultant: "₹15,000 – ₹50,000 / year",
      youtube: "Free (Wastes 100+ Hours)",
    },
    {
      feature: "Step-by-Step Filing Workflows",
      us: "✅ Clear 2026 Step-by-Step Guides",
      consultant: "⚠️ Black-box (You learn nothing)",
      youtube: "❌ Outdated / Incomplete info",
    },
    {
      feature: "Ready Excel Calculators & Trackers",
      us: "✅ Advance Tax, GSTR-2B & TDS Trackers",
      consultant: "❌ Not provided for your own use",
      youtube: "❌ Must create formulas yourself",
    },
    {
      feature: "Audit Checklists & Due Date Calendar",
      us: "✅ Printable Checklists & FY 2026-27 Dates",
      consultant: "⚠️ Only reminders if CA is active",
      youtube: "❌ Scattered across 50 videos",
    },
    {
      feature: "Invoice & Expense Templates",
      us: "✅ Professional Editable Templates",
      consultant: "⚠️ Charged extra",
      youtube: "❌ Generic non-standard formats",
    },
    {
      feature: "Instant 60-Second Google Drive Delivery",
      us: "✅ Immediate Download & Offline Access",
      consultant: "❌ Days of waiting & follow-ups",
      youtube: "❌ Broken Google Drive links",
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-emerald-500/30 bg-[#0B2017]/80 p-4 shadow-2xl backdrop-blur-md sm:p-6">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-emerald-500/20 text-emerald-300">
            <th className="pb-3 font-extrabold sm:w-1/3">What You Get</th>
            <th className="pb-3 text-center font-black text-amber-400 sm:w-1/4">
              <div className="inline-block rounded-xl bg-emerald-900/60 px-3 py-1 border border-emerald-400/40">
                ⭐ Complete GST &amp; TDS Kit
              </div>
            </th>
            <th className="pb-3 text-center font-semibold text-muted-foreground sm:w-1/4">
              Expensive CA / Tax Firm
            </th>
            <th className="pb-3 text-center font-semibold text-muted-foreground sm:w-1/4">
              Searching Free YouTube
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-500/10">
          {comparisonData.map((row) => (
            <tr key={row.feature} className="transition hover:bg-emerald-950/30">
              <td className="py-3.5 font-bold text-white pr-2">{row.feature}</td>
              <td className="py-3.5 text-center font-bold text-emerald-200 bg-emerald-950/40 px-2 rounded-lg">
                <div className="flex items-center justify-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{row.us}</span>
                </div>
              </td>
              <td className="py-3.5 text-center text-muted-foreground px-2">
                <div className="flex items-center justify-center gap-1">
                  <span>{row.consultant}</span>
                </div>
              </td>
              <td className="py-3.5 text-center text-muted-foreground px-2">
                <div className="flex items-center justify-center gap-1">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{row.youtube}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
