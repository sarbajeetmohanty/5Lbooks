import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ExitIntentModal } from "@/components/ExitIntentModal";
import { StickyTimerBar } from "@/components/StickyTimerBar";
import { PaymentBadges } from "@/components/PaymentBadges";
import { SalesCloserChat } from "@/components/SalesCloserChat";
import { indianBuyers, relativeTimeOptions, type Buyer } from "@/data/buyers";
import {
  CheckCircle2,
  BookOpen,
  FileSpreadsheet,
  Calendar,
  FileCheck2,
  Receipt,
  Gift,
  Download,
  ShieldCheck,
  Zap,
  Users,
  Star,
  Clock,
  Sparkles,
  HelpCircle,
  FolderLock,
  ExternalLink,
} from "lucide-react";

const CHECKOUT_URL = "https://simpexmedia.co";
const SUPPORT_EMAIL = "support@simpexmedia.in";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Complete GST & TDS Filing Kit (2026 Edition) — Simpex Media" },
      {
        name: "description",
        content:
          "Everything you need to understand GST & TDS — in one practical digital toolkit. Includes step-by-step filing guides, Excel tax calculators, calendars, invoice templates, and bonuses for ₹199.",
      },
      { property: "og:title", content: "Complete GST & TDS Filing Kit (2026 Edition)" },
      {
        property: "og:description",
        content:
          "11-in-1 Complete GST & TDS compliance kit for freelancers, business owners, accountants & consultants. Lifetime Google Drive access for ₹199.",
      },
      { property: "og:image", content: "/images/gst-tds-hero-banner.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return { m, s };
}

function CtaButton({
  children,
  className = "",
  size = "lg",
  showTrustBadges = true,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "sm";
  showTrustBadges?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-gold inline-flex items-center justify-center gap-2 rounded-2xl font-black tracking-tight text-slate-950 shadow-2xl shadow-amber-500/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
          size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-6 py-3 text-sm"
        }`}
      >
        {children}
      </a>

      {showTrustBadges && <PaymentBadges className="mt-3.5" />}
    </div>
  );
}

function PurchasePopup() {
  const [currentBuyer, setCurrentBuyer] = useState<Buyer | null>(null);
  const [timeAgo, setTimeAgo] = useState("Just now");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      const b = indianBuyers[Math.floor(Math.random() * indianBuyers.length)]!;
      const t = relativeTimeOptions[Math.floor(Math.random() * relativeTimeOptions.length)]!;
      setCurrentBuyer(b);
      setTimeAgo(t);
      setVisible(true);
      timeout = setTimeout(() => {
        setVisible(false);
      }, 5000);
    };
    const first = setTimeout(cycle, 3500);
    const interval = setInterval(cycle, 12000);
    return () => {
      clearTimeout(first);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible || !currentBuyer) return null;

  return (
    <aside
      aria-label="Recent buyer notification"
      className="animate-pop-in fixed bottom-24 left-3 z-40 max-w-[16rem] sm:max-w-[19rem] rounded-2xl border border-emerald-500/40 bg-[#0B2017]/95 p-3 shadow-2xl shadow-black/80 backdrop-blur-md sm:bottom-24 sm:left-6"
    >
      <div className="flex items-center gap-3 text-left">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-900/60 border border-emerald-400/40 text-base font-bold text-amber-400">
          💼
        </div>
        <div>
          <p className="text-xs font-bold text-white">
            {currentBuyer.name} <span className="font-medium text-emerald-300">({currentBuyer.city})</span>
          </p>
          <p className="text-[11px] text-emerald-100/80">
            bought <span className="font-bold text-amber-400">GST &amp; TDS Filing Kit</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {timeAgo} • Verified Purchase
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function Index() {
  const timer = useCountdown(15 * 60);

  const coreResources = [
    {
      icon: <BookOpen className="h-6 w-6 text-emerald-400" />,
      title: "📘 1. Complete TDS Filing Guide",
      desc: "Comprehensive, beginner-friendly guide covering TDS fundamentals, TAN/PAN rules, Major Sections (194C, 194J, 194Q, 194I), deduction & challan payment process, return filing workflow, compliance timelines & common mistakes to avoid.",
      tag: "Step-by-Step PDF",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-emerald-400" />,
      title: "📗 2. Complete GST Filing Guide",
      desc: "Detailed guide designed to help you understand GST compliance with clear explanations — GST registration, GSTR-1, GSTR-3B, GSTR-9 returns, Input Tax Credit (ITC) claiming rules, tax invoice essentials, and filing workflow.",
      tag: "Step-by-Step PDF",
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6 text-emerald-400" />,
      title: "📊 3. Tax Calculation & Reconciliation Excel Toolkit",
      desc: "Professionally designed spreadsheet templates with pre-configured formulas: Advance Tax Estimator, GSTR-2B vs Books Reconciliation Sheet, and TDS Deduction Tracker for effortless financial calculations.",
      tag: "Excel Templates (.xlsx)",
    },
    {
      icon: <FileCheck2 className="h-6 w-6 text-emerald-400" />,
      title: "✅ 4. GST & TDS Compliance Checklists",
      desc: "Never miss an important compliance step again. Includes printable checklists covering monthly, quarterly and annual GST & TDS verification processes before you hit submit.",
      tag: "Printable Checklists",
    },
    {
      icon: <Calendar className="h-6 w-6 text-emerald-400" />,
      title: "📅 5. Tax Compliance Calendar (FY 2026-27)",
      desc: "Stay ahead of critical tax deadlines. Easy-to-follow calendar covering major GST filing dates, TDS deposit due dates, quarterly return timelines, and advance tax installments.",
      tag: "Annual Tax Calendar",
    },
    {
      icon: <Receipt className="h-6 w-6 text-emerald-400" />,
      title: "🧾 6. Professional Business Invoice Templates",
      desc: "Ready-to-use GST-compliant invoice templates designed for businesses, freelancers, consultants, and agencies. Simply edit your business details and send professional invoices.",
      tag: "Editable Word / Excel / PDF",
    },
  ];

  const bonusResources = [
    {
      icon: <Gift className="h-5 w-5 text-amber-400" />,
      title: "💰 Bonus #1 — Business Expense Tracker",
      desc: "An organized spreadsheet to record income, expenses, and business transactions throughout the year. Perfect for maintaining clean financial records and simplifying year-end tax prep.",
      value: "Worth ₹1,499 (FREE)",
    },
    {
      icon: <ExternalLink className="h-5 w-5 text-amber-400" />,
      title: "🌐 Bonus #2 — Government Resources Directory",
      desc: "A carefully curated directory of official government tax portals, utility links, and department services related to GST and TDS — saving you hours of searching.",
      value: "Worth ₹999 (FREE)",
    },
    {
      icon: <FolderLock className="h-5 w-5 text-amber-400" />,
      title: "📂 Bonus #3 — The Ultimate Tax Document Organizer",
      desc: "A practical folder & file management system that keeps invoices, tax documents, GST records, TDS records, and payment proofs neatly organized in one secure place.",
      value: "Worth ₹1,299 (FREE)",
    },
  ];

  const targetAudience = [
    { title: "Freelancers", desc: "Understand TDS deductions on your invoices & file GST without stress." },
    { title: "Small Business Owners", desc: "Keep GST & TDS filings 100% compliant and avoid costly late penalties." },
    { title: "Startup Founders", desc: "Organize vendor payments, ITC reconciliations, and tax books from day one." },
    { title: "Consultants & Agencies", desc: "Create professional GST invoices and track advance taxes easily." },
    { title: "Accountants & CAs", desc: "Ready-to-use Excel templates & checklists to save 20+ hours every month." },
    { title: "Students & Beginners", desc: "Master real-world practical GST and TDS with zero complicated jargon." },
  ];

  const faqs = [
    {
      q: "Is this a physical product or a digital download?",
      a: "This is a 100% instant digital toolkit. Immediately upon payment, you will receive lifetime Google Drive download access on WhatsApp and Email.",
    },
    {
      q: "Will I receive my files immediately after payment?",
      a: "Yes! The download link is automatically generated and sent within 60 seconds of successful payment to both your WhatsApp and Email address.",
    },
    {
      q: "Is this kit suitable for beginners with no tax background?",
      a: "Absolutely. Everything is explained in clear, simple language with visual diagrams, practical real-life examples, and step-by-step filing workflows.",
    },
    {
      q: "Can I use the Excel sheets on mobile, tablet, and laptop?",
      a: "Yes! The Excel templates (.xlsx) and PDF guides are fully compatible with MS Excel, Google Sheets, Mobile WPS Office, Apple Numbers, Windows PC, Mac, and iPad.",
    },
    {
      q: "Are the rules and sections updated for the 2026 financial year?",
      a: "Yes! The entire kit has been updated specifically for the 2026 compliance edition, including the latest GST ITC reconciliation rules, advance tax schedules, and TDS thresholds.",
    },
    {
      q: "What if I need help or have questions after downloading?",
      a: "You get dedicated email and WhatsApp support from the Simpex Media team at support@simpexmedia.in.",
    },
  ];

  const textTestimonials = [
    {
      quote:
        "Everything I needed was organized in one place. The checklists made the filing process much easier to understand and execute.",
      author: "Prasana P.",
      role: "Business Owner, Bengaluru",
    },
    {
      quote:
        "I was filing my return for the first time and was nervous about missing something. The step-by-step guide explained everything in simple language.",
      author: "Ankit Gupta",
      role: "Tech Freelancer, Delhi NCR",
    },
    {
      quote:
        "The document checklist alone was worth it. I knew exactly what I needed before starting my TDS filing and didn't have to search multiple websites.",
      author: "Priya Verma",
      role: "Agency Founder, Pune",
    },
    {
      quote:
        "This kit made tax filing feel much less intimidating. Everything was easy to understand, even for someone with no tax background.",
      author: "Neha Kapoor",
      role: "E-Commerce Consultant, Mumbai",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06140E] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 pb-24">
      {/* Top Scarcity Alert Bar */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 border-b border-emerald-500/40 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-xs font-bold sm:text-sm">
          <span className="flex items-center gap-1.5 text-amber-300 font-extrabold">
            <Sparkles className="h-4 w-4" /> 2026 EDITION FLASH SALE:
          </span>
          <span>Complete 11-in-1 GST &amp; TDS Toolkit @ ₹199 (Regular ₹999)</span>
          <span className="rounded-md bg-black/40 px-2 py-0.5 font-mono font-black text-amber-400 border border-amber-400/30">
            ⏳ Offer Ends in {timer.m}:{timer.s}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden px-4 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center">
        {/* Background Glowing Ambient Orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl">
          {/* Trust Pill Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-1.5 text-xs font-extrabold text-emerald-300 shadow-lg backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>THE COMPLETE DIGITAL TOOLKIT FOR GST &amp; TDS (2026 EDITION)</span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl text-white leading-[1.15]">
            Master GST &amp; TDS Compliance With{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              100% Confidence &amp; Zero Errors
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-emerald-100/90 sm:text-lg">
            Stop spending hours searching YouTube or reading scattered government portals. Get step-by-step filing guides, pre-configured Excel calculators, audit checklists, invoice templates, and tax calendars in one practical digital toolkit.
          </p>

          {/* Massive 3D Hero Mockup Banner */}
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border-2 border-emerald-500/50 bg-emerald-950/40 p-2 shadow-2xl shadow-emerald-950 backdrop-blur-md">
            <img
              src="/images/gst-tds-hero-banner.jpg"
              alt="Complete GST and TDS Filing Kit 2026 Edition Hero Mockup"
              className="w-full h-auto rounded-2xl object-cover"
              loading="eager"
            />
          </div>

          {/* Pricing Box & CTA */}
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#0B2017] to-[#06140E] p-6 shadow-2xl shadow-black">
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-sm font-bold text-muted-foreground line-through">₹999</span>
              <span className="text-4xl font-black text-amber-400 sm:text-5xl">₹199</span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-black text-emerald-300">
                SAVE 80% TODAY
              </span>
            </div>
            <p className="mt-1 text-xs font-semibold text-emerald-200">
              ⚡ One-Time Payment • Lifetime Google Drive Access • Instant 60s Delivery
            </p>

            <CtaButton className="mt-5" size="lg">
              <Download className="h-5 w-5" />
              <span>👉 UNLOCK COMPLETE GST &amp; TDS KIT @ ₹199 ➔</span>
            </CtaButton>
          </div>
        </div>
      </header>

      {/* Problem & Value Proposition */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-emerald-500/30 bg-[#0B2017]/90 p-6 sm:p-10 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Why Waste 100+ Hours On Confusing Tax Rules &amp; Expensive CA Follow-ups?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Tax compliance shouldn't be stressful or expensive. The Complete GST &amp; TDS Compliance Kit brings together professionally designed guides, practical templates, Excel tools, and compliance resources so you can stay organized throughout the financial year.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4 text-center">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-900/60 text-lg">
                ⏱️
              </div>
              <h3 className="mt-3 font-bold text-white text-sm">Save 20+ Hours Monthly</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                No more guessing formulas or searching 50 different websites for deadlines.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4 text-center">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-900/60 text-lg">
                🛡️
              </div>
              <h3 className="mt-3 font-bold text-white text-sm">Avoid Costly Penalties</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Printable checklists ensure zero errors in TDS deductions, ITC claims, and filing dates.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4 text-center">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-900/60 text-lg">
                📂
              </div>
              <h3 className="mt-3 font-bold text-white text-sm">1 Centralized System</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Keep invoices, challans, calculations, and tax documents organized in one simple folder structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Resources Breakdown */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/50 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-300">
            📦 WHAT'S INCLUDED IN THE 2026 EDITION
          </div>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
            6 Comprehensive Compliance Toolkits
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-muted-foreground">
            Every guide, formula, and template you need to handle GST &amp; TDS like a pro.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {coreResources.map((res) => (
            <div
              key={res.title}
              className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-[#0B2017] p-6 shadow-xl transition-all hover:border-emerald-400 hover:shadow-emerald-950/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-950/80 border border-emerald-500/40">
                    {res.icon}
                  </div>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                    {res.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-white sm:text-lg">{res.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  {res.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 High-Value Bonuses */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#133829] to-[#0B2017] p-6 sm:p-10 shadow-2xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-amber-500/20 border border-amber-400/50 px-4 py-1 text-xs font-black uppercase text-amber-300">
              🎁 3 EXCLUSIVE BONUSES INCLUDED (WORTH ₹3,797 FREE)
            </span>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
              Extra Tools To Completely Automate Your Tax Workflow
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bonusResources.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-amber-500/30 bg-emerald-950/60 p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/20 border border-amber-400/40">
                      {b.icon}
                    </div>
                    <span className="text-[11px] font-extrabold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      {b.value}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-white">{b.title}</h3>
                  <p className="mt-2 text-xs text-emerald-100/80 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <CtaButton size="lg">
              <Download className="h-5 w-5" />
              <span>CLAIM ALL 6 TOOLKITS + 3 BONUSES FOR ₹199 ➔</span>
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white sm:text-4xl">👨‍💼 Who Is This Kit Perfect For?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-muted-foreground">
            Designed specifically for professionals who want accurate, stress-free compliance without paying hefty retainer fees.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {targetAudience.map((t) => (
            <div
              key={t.title}
              className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-[#0B2017] p-4 transition hover:border-emerald-400/50"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white">{t.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Social Proof Gallery */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 px-3.5 py-1 text-xs font-bold text-emerald-300">
            💬 VERIFIED REAL USER EXPERIENCES
          </div>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
            📸 See What Our Customers Are Saying On WhatsApp
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-muted-foreground">
            Real feedback from business owners, freelancers, and accountants using this toolkit every month.
          </p>
        </div>

        {/* 4 Real WhatsApp Screenshots Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-black shadow-xl transition hover:scale-[1.02]">
            <img
              src="/images/whatsapp-review-1.jpg"
              alt="WhatsApp review 1"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-black shadow-xl transition hover:scale-[1.02]">
            <img
              src="/images/whatsapp-review-2.png"
              alt="WhatsApp review 2"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-black shadow-xl transition hover:scale-[1.02]">
            <img
              src="/images/whatsapp-review-3.png"
              alt="WhatsApp review 3"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-black shadow-xl transition hover:scale-[1.02]">
            <img
              src="/images/whatsapp-review-4.png"
              alt="WhatsApp review 4"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Testimonial Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {textTestimonials.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl border border-emerald-500/30 bg-[#0B2017] p-5 shadow-lg"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="mt-3 border-t border-emerald-500/20 pt-2.5">
                <p className="text-xs font-bold text-white">{t.author}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (4 Simple Steps) */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-emerald-500/30 bg-[#0B2017] p-6 sm:p-10 text-center shadow-xl">
          <h2 className="text-2xl font-black text-white sm:text-3xl">🚀 How It Works (4 Simple Steps)</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4">
              <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-black text-slate-950">
                1
              </div>
              <h3 className="mt-3 font-bold text-white text-xs sm:text-sm">Secure Payment</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pay ₹199 securely via UPI, GPay, PhonePe, Paytm, or Card.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4">
              <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-black text-slate-950">
                2
              </div>
              <h3 className="mt-3 font-bold text-white text-xs sm:text-sm">Instant 60s Delivery</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Receive Google Drive lifetime link directly on WhatsApp &amp; Email.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4">
              <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-black text-slate-950">
                3
              </div>
              <h3 className="mt-3 font-bold text-white text-xs sm:text-sm">Download Files</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Download all 9.80 MB of PDF guides, Excel models &amp; templates.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-4">
              <div className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-xs font-black text-slate-950">
                4
              </div>
              <h3 className="mt-3 font-bold text-white text-xs sm:text-sm">Start Filing Confidently</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Calculate taxes, follow checklists, and organize tax records forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Badge Card */}
      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4">
          <div>
            <p className="text-[11px] text-muted-foreground">Number of Resources</p>
            <p className="text-lg font-black text-amber-400">11 Tools &amp; Guides</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Total File Size</p>
            <p className="text-lg font-black text-white">9.80 MB (All in One)</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Compatibility</p>
            <p className="text-lg font-black text-white">Mobile, PC &amp; Mac</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Access Validity</p>
            <p className="text-lg font-black text-emerald-400">Lifetime Access</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Everything you need to know about the Complete GST &amp; TDS Filing Kit.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-500/30 bg-[#0B2017] p-4 sm:p-6 shadow-xl">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 px-4"
              >
                <AccordionTrigger className="text-left text-xs sm:text-sm font-bold text-white hover:text-emerald-300">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed pt-1 pb-3">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <CtaButton size="lg">
            <Download className="h-5 w-5" />
            <span>👉 GET INSTANT ACCESS TO GST &amp; TDS KIT @ ₹199 ➔</span>
          </CtaButton>
        </div>
      </section>

      {/* Footer & Legal */}
      <footer className="mt-16 border-t border-emerald-500/20 bg-[#040D09] px-4 py-10 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="font-bold text-emerald-300 text-sm">
            Simpex Media — Complete GST &amp; TDS Filing Kit (2026 Edition)
          </p>
          <p className="text-xs text-muted-foreground">
            For support &amp; inquiries, email us at:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-emerald-400 underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-emerald-200/80">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:underline">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
          <p className="text-[11px] text-muted-foreground pt-2">
            © {new Date().getFullYear()} Simpex Media. All rights reserved. Not affiliated with the Income Tax Department or GSTN. All trademarks belong to their respective owners.
          </p>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <StickyTimerBar checkoutUrl={CHECKOUT_URL} />

      {/* Live Buyer Purchase Alert */}
      <PurchasePopup />

      {/* AI Live Sales Closer Chat */}
      <SalesCloserChat checkoutUrl={CHECKOUT_URL} />

      {/* Exit Intent Modal */}
      <ExitIntentModal
        checkoutUrl={CHECKOUT_URL}
        originalPrice={199}
        discountPrice={149}
      />
    </div>
  );
}
