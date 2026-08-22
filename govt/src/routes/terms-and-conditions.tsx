import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Complete GST & TDS Filing Kit — Simpex Media" },
      { name: "description", content: "Terms and Conditions for Complete GST & TDS Filing Kit." },
    ],
  }),
  component: TermsAndConditions,
});

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#06140E] text-slate-100 px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-[#0B2017] p-8 shadow-2xl">
        <Link to="/" className="text-xs font-bold text-emerald-400 hover:underline">
          ← Back to GST &amp; TDS Filing Kit
        </Link>
        <h1 className="mt-4 text-3xl font-black text-white">Terms &amp; Conditions</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: January 2026</p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-emerald-100/90">
          <p>
            By purchasing and downloading the Complete GST &amp; TDS Filing Kit from Simpex Media, you agree to the following terms and conditions.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">1. License &amp; Usage</h2>
          <p>
            Upon purchase, you are granted a non-exclusive, non-transferable, lifetime personal and commercial practice license to use the guides, Excel models, checklists, and templates for your own business or consultancy. Reselling or distributing the toolkit files publicly is strictly prohibited.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">2. Educational &amp; Informational Resource</h2>
          <p>
            The guides, templates, and calculators provided in this kit are intended for educational, workflow, and compliance reference purposes. While every effort has been made to ensure accuracy according to Indian tax regulations, users should consult certified tax professionals for complex legal disputes.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">3. Instant Digital Delivery</h2>
          <p>
            The files are delivered digitally via Google Drive link sent to your registered WhatsApp number and email address within 60 seconds of successful payment.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">4. Support Inquiries</h2>
          <p>
            For any queries or access issues, email our team at:{" "}
            <a href="mailto:support@simpexmedia.in" className="font-bold text-emerald-400 underline">
              support@simpexmedia.in
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
