import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy | Complete GST & TDS Filing Kit — Simpex Media" },
      { name: "description", content: "Refund Policy for Complete GST & TDS Filing Kit." },
    ],
  }),
  component: RefundPolicy,
});

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#06140E] text-slate-100 px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-[#0B2017] p-8 shadow-2xl">
        <Link to="/" className="text-xs font-bold text-emerald-400 hover:underline">
          ← Back to GST &amp; TDS Filing Kit
        </Link>
        <h1 className="mt-4 text-3xl font-black text-white">Refund Policy</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: January 2026</p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-emerald-100/90">
          <p>
            We stand behind the quality of the Complete GST &amp; TDS Filing Kit (2026 Edition).
          </p>
          <h2 className="text-lg font-bold text-white pt-2">1. 100% Satisfaction Guarantee</h2>
          <p>
            If you encounter any technical issues with downloading your files or if the templates do not match the promised description, our dedicated support team will assist you immediately.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">2. Refund Request Process</h2>
          <p>
            To request assistance or a refund, please write to us at{" "}
            <a href="mailto:support@simpexmedia.in" className="font-bold text-emerald-400 underline">
              support@simpexmedia.in
            </a>{" "}
            with your payment transaction ID. Our team will review and process valid claims within 3-5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
