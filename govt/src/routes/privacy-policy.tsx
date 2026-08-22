import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Complete GST & TDS Filing Kit — Simpex Media" },
      { name: "description", content: "Privacy Policy for Complete GST & TDS Filing Kit." },
    ],
  }),
  component: PrivacyPolicy,
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#06140E] text-slate-100 px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-[#0B2017] p-8 shadow-2xl">
        <Link to="/" className="text-xs font-bold text-emerald-400 hover:underline">
          ← Back to GST &amp; TDS Filing Kit
        </Link>
        <h1 className="mt-4 text-3xl font-black text-white">Privacy Policy</h1>
        <p className="mt-2 text-xs text-muted-foreground">Last updated: January 2026</p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-emerald-100/90">
          <p>
            At Simpex Media, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you purchase and access the Complete GST &amp; TDS Filing Kit.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">1. Information We Collect</h2>
          <p>
            When you purchase our digital product, we collect standard transaction details including your name, email address, phone number (for WhatsApp delivery), and payment confirmation details processed via secure payment gateways.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">2. How We Use Your Information</h2>
          <p>
            We use your contact information solely to deliver your Google Drive access link, provide customer support, and send critical tax calendar compliance updates. We do not sell or rent your personal data to third parties.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">3. Payment Security</h2>
          <p>
            All payment transactions are encrypted using 256-bit SSL technology. We do not store your credit card, debit card, or UPI banking credentials on our servers.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">4. Contact Us</h2>
          <p>
            If you have questions about this policy, contact us at:{" "}
            <a href="mailto:support@simpexmedia.in" className="font-bold text-emerald-400 underline">
              support@simpexmedia.in
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
