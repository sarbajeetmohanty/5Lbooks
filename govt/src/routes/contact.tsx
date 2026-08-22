import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Clock, ShieldCheck } from "lucide-react";

const SUPPORT_EMAIL = "support@simpexmedia.in";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Complete GST & TDS Filing Kit — Simpex Media" },
      { name: "description", content: "Contact the Simpex Media Tax & Compliance Support Team." },
    ],
  }),
  component: ContactPage,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#06140E] text-slate-100 px-4 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-[#0B2017] p-8 shadow-2xl">
        <Link to="/" className="text-xs font-bold text-emerald-400 hover:underline">
          ← Back to GST &amp; TDS Filing Kit
        </Link>
        <h1 className="mt-4 text-3xl font-black text-white">Contact Tax Support</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          We are here to help you with download access, queries, and file instructions.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Support</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-base font-bold text-white hover:text-emerald-400 underline">
                {SUPPORT_EMAIL}
              </a>
              <p className="mt-1 text-xs text-emerald-200/80">Response time: Usually within 2 to 4 hours.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Working Hours</p>
              <p className="text-sm font-bold text-white">Monday to Saturday: 9:00 AM – 9:00 PM IST</p>
              <p className="mt-1 text-xs text-emerald-200/80">Instant download link generation is active 24/7/365.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-900/60 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Instant WhatsApp Access</p>
              <p className="text-sm font-bold text-white">Live AI Tax Assistant</p>
              <p className="mt-1 text-xs text-emerald-200/80">
                You can also use the floating WhatsApp chat assistant on our home page for instant real-time help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
