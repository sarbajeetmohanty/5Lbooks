import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo.png";
import booksHindi1 from "@/assets/books-hindi-1.jpg";
import booksEnglish1 from "@/assets/books-english-1.jpg";
import booksEnglish2 from "@/assets/books-english-2.jpg";
import booksHindi2 from "@/assets/books-hindi-2.jpg";

import heroVideo from "@/assets/hero-video.mp4.asset.json";

const VIDEO_URL = heroVideo?.url?.startsWith("/__l5e")
  ? "/hero-video.mp4"
  : heroVideo?.url || "/hero-video.mp4";
const CHECKOUT_URL = "https://simpexmedia.co";
const SUPPORT_EMAIL = "support@simpexmedia.in";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Simpex Media Library — 5,00,000+ Premium eBooks for ₹199" },
      {
        name: "description",
        content:
          "Unlock 5,00,000+ premium eBooks across 16+ categories for just ₹199. Lifetime access, instant delivery and a 500GB audiobook bonus from Simpex Media Library.",
      },
      { property: "og:title", content: "Simpex Media Library — 5,00,000+ Premium eBooks for ₹199" },
      {
        property: "og:description",
        content:
          "5,00,000+ eBooks · 16+ categories · 500GB audiobooks bonus · Lifetime access. One tiny payment today.",
      },
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
  const h = String(Math.floor(left / 3600)).padStart(2, "0");
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return { h, m, s };
}

function CtaButton({
  children,
  className = "",
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "lg" | "sm";
}) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-cta inline-flex items-center justify-center rounded-full font-extrabold tracking-tight hover:-translate-y-0.5 hover:brightness-105 ${
        size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-6 py-3 text-sm"
      } ${className}`}
    >
      {children}
    </a>
  );
}

const badges = [
  "Instant Delivery",
  "One-Time Payment",
  "Mobile + Laptop",
  "Huge Category Library",
  "Beginner Friendly",
  "Secure Checkout",
  "Email Support",
];

const differences: [string, string, string][] = [
  ["📚", "Massive Coverage", "5,00,000+ ebooks across 16+ powerful categories"],
  ["💰", "Incredible Value", "Cost per book is less than ₹0.02 — unbeatable"],
  ["🎯", "Beginner to Advanced", "Perfect for all skill levels"],
  ["🗂️", "Organized Files", "Everything sorted by category for easy access"],
  ["🧠", "Learn Anything", "Business, AI, Marketing, Money, Growth & more"],
  ["🚀", "Digital Success", "Everything you need to grow online"],
];

const categories: [string, string][] = [
  ["💸", "Online Earning"],
  ["📈", "Digital Marketing"],
  ["🤝", "Sales"],
  ["💻", "Freelancing"],
  ["🤖", "AI & Tools"],
  ["🏢", "Business"],
  ["✨", "Branding"],
  ["🎬", "Content Creation"],
  ["⏱️", "Productivity"],
  ["🗣️", "Communication"],
  ["🏦", "Personal Finance"],
  ["🧘", "Mindset"],
  ["🌱", "Self Development"],
  ["🛒", "Ecommerce"],
  ["✍️", "Copywriting"],
  ["🎓", "Career Growth"],
];

const audience: [string, string, string][] = [
  ["🎓", "Students", "Boost your knowledge beyond textbooks"],
  ["💼", "Freelancers", "Learn skills that pay the bills"],
  ["🔍", "Job Seekers", "Stand out with in-demand knowledge"],
  ["🎥", "Creators", "Master content, branding & growth"],
  ["📣", "Marketers", "Digital marketing & sales mastery"],
  ["🏗️", "Business Owners", "Scale your business with proven strategies"],
  ["📖", "Self-Learners", "Feed your curiosity endlessly"],
  ["⚡", "Ambitious People", "Fast-track your growth journey"],
];

const benefits: [string, string, string][] = [
  ["💎", "Save Thousands", "Get ₹3,799+ worth of ebooks for just ₹199"],
  ["⏳", "Stop Wasting Time", "No more searching for random resources online"],
  ["🗃️", "One Organized Collection", "Everything sorted by category, ready to read"],
  ["📱", "Access Anywhere", "Read on your phone, tablet, or laptop anytime"],
  ["♾️", "Keep Forever", "Lifetime access — no subscriptions, no renewals"],
  ["🕰️", "Learn at Your Pace", "Build skills on your own schedule"],
];

const testimonials: [string, string, string][] = [
  [
    "5,00,000 ebooks at this price? I thought it was a joke. But it's REAL. Best investment I've made this year!",
    "Priya Sharma",
    "Mumbai",
  ],
  [
    "The categories are insane. I found books on AI, marketing, and freelancing — all organized. Totally worth it.",
    "Rahul Verma",
    "Delhi",
  ],
  [
    "Instant delivery via Google Drive. Super smooth. Already started reading the business section!",
    "Anjali Patel",
    "Bangalore",
  ],
  [
    "I used to spend ₹300-500 on single books. This bundle saved me thousands. Mind-blowing value.",
    "Vikram Singh",
    "Pune",
  ],
  [
    "The audiobook bonus alone is worth more than ₹199. Can't believe this deal exists!",
    "Sneha Gupta",
    "Hyderabad",
  ],
  [
    "Perfect for self-learners. I've been reading about personal finance and it's changing my mindset.",
    "Arjun Kumar",
    "Chennai",
  ],
  ["Email support was super helpful. Got my access link within minutes!", "Kavita Rao", "Jaipur"],
  [
    "As a freelancer, the digital marketing and copywriting books are gold. Highly recommend!",
    "Rohan Mehta",
    "Kolkata",
  ],
  [
    "I shared this with my college group. Everyone bought it. The value is undeniable.",
    "Meera Iyer",
    "Ahmedabad",
  ],
  [
    "₹199 for lifetime access to this much knowledge? Easiest decision ever.",
    "Amit Joshi",
    "Lucknow",
  ],
  [
    "The self-development section alone has books I've wanted to read for months!",
    "Deepika Nair",
    "Kochi",
  ],
  [
    "Files are well organized by category. Easy to browse and find what you need.",
    "Karan Malhotra",
    "Chandigarh",
  ],
];

const bonuses: [string, string, string][] = [
  ["🎧", "500GB Premium Audiobooks", "Massive audiobook collection — absolutely FREE"],
  ["🚦", "Quick Start Reading Guide", "Know exactly where to start reading"],
  ["🏆", "Best Categories to Start With", "Curated recommendations for maximum impact"],
  ["🗺️", "Recommended Reading Path", "Step-by-step reading roadmap"],
  ["🧰", "Productivity Resource Sheet", "Tools & templates to 10x your productivity"],
  ["✅", "Beginner Success Checklist", "Your action plan for fast results"],
];

const faqs: [string, string][] = [
  [
    "How will I receive the bundle?",
    "Right after payment you get an instant email with a Google Drive link to the full Simpex Media Library.",
  ],
  ["Is this instant download?", "Yes — delivery is automatic and takes less than 2 minutes."],
  [
    "Can I use it on mobile?",
    "Absolutely. Read on mobile, tablet or laptop — the files are standard PDF/EPUB.",
  ],
  [
    "Are files organized by category?",
    "Yes, every ebook sits inside a clearly labelled category folder so you never hunt for a title.",
  ],
  ["Is it a one-time payment?", "One payment of ₹199. No subscription, no renewals, ever."],
  ["Do I get lifetime access?", "Yes — download once and keep everything forever."],
  [
    "Who is this bundle for?",
    "Students, freelancers, creators, marketers, business owners and anyone who loves learning.",
  ],
  [
    "What categories are included?",
    "16+ categories including business, AI, marketing, finance, mindset, copywriting and more.",
  ],
  [
    "What if I need help after purchase?",
    `Email us at ${SUPPORT_EMAIL} — the Simpex Media support team replies within 24 hours.`,
  ],
];

const buyerNames: [string, string][] = [
  ["Priya S.", "Mumbai"],
  ["Rahul V.", "Delhi"],
  ["Anjali P.", "Bangalore"],
  ["Vikram S.", "Pune"],
  ["Sneha G.", "Hyderabad"],
  ["Arjun K.", "Chennai"],
  ["Kavita R.", "Jaipur"],
  ["Rohan M.", "Kolkata"],
  ["Meera I.", "Ahmedabad"],
  ["Amit J.", "Lucknow"],
];

function PurchasePopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setVisible(true);
      timeout = setTimeout(() => {
        setVisible(false);
        setIndex((i) => (i + 1) % buyerNames.length);
      }, 5000);
    };
    const first = setTimeout(cycle, 4000);
    const interval = setInterval(cycle, 11000);
    return () => {
      clearTimeout(first);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;
  const [name, city] = buyerNames[index]!;

  return (
    <div className="animate-pop-in fixed bottom-24 left-4 z-50 max-w-[19rem] rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:bottom-6">
      <div className="flex items-center gap-3 text-left">
        <img src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
        <div>
          <p className="text-sm font-bold">
            {name} <span className="font-medium text-muted-foreground">from {city}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            just purchased the <span className="font-semibold text-primary">₹199 Mega Bundle</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-primary">
            <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-primary" />a few
            seconds ago
          </p>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const offer = useCountdown(15 * 60);
  const timeLeft = `${offer.m}:${offer.s}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Sale bar */}
      <div className="sticky top-0 z-50 overflow-hidden bg-sale text-sale-foreground">
        <div
          aria-hidden
          className="animate-sale-shine pointer-events-none absolute inset-y-0 w-1/3 bg-sale-foreground/15 blur-md"
        />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-xs font-semibold sm:text-sm">
          <span className="flex items-center gap-1.5 font-extrabold">
            <span className="inline-block h-2 w-2 animate-blink rounded-full bg-sale-foreground" />
            🔥 MEGA SALE LIVE
          </span>
          <span className="opacity-90">
            Price jumps to <s>₹3,799</s> soon — Lock in ₹199 now
          </span>
          <span className="animate-blink rounded-full bg-sale-foreground/20 px-3 py-0.5 font-bold tabular-nums">
            Offer Expires in {timeLeft}
          </span>
        </div>
      </div>

      {/* Hero */}
      <header className="px-4 pt-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <img
            src={logo}
            alt="Simpex Media Library logo"
            width={96}
            height={96}
            className="h-14 w-14 rounded-2xl bg-card p-1 shadow-[var(--shadow-soft)] sm:h-16 sm:w-16"
          />
          <p className="whitespace-nowrap text-xl font-extrabold tracking-tight sm:text-3xl">
            SIMPEX <span className="text-primary">MEDIA</span> LIBRARY
          </p>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sale/10 px-4 py-1.5 text-sm font-semibold text-sale">
          ⏰ Offer Expires in <span className="tabular-nums">{timeLeft}</span>
        </div>
        <div className="mt-4">
          <span className="inline-flex rounded-full bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground ring-1 ring-accent/40">
            🎉 Mega Sale 2026 · Biggest eBook Bundle Ever
          </span>
        </div>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-[1.15] sm:text-6xl sm:leading-[1.05]">
          <span className="block sm:inline">
            Get <span className="text-primary">5,00,000+</span>
          </span>
          <span className="block sm:inline text-primary"> Premium eBooks</span>
          <span className="block sm:inline text-accent"> for the Price of 1 Coffee ☕</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base font-semibold text-foreground sm:text-lg">
          One tiny payment today. Lifetime access to every ebook, forever.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Why pay ₹499 for one book when you can unlock an entire knowledge vault — Business, AI,
          Marketing, Finance, Self-Growth & 11+ more categories — today only.
        </p>
        <p className="mt-5 text-xl font-extrabold sm:text-2xl">
          Today's Flash Price: <span className="text-primary">₹199</span>{" "}
          <s className="text-muted-foreground">₹3,799</s>{" "}
          <span className="ml-1 rounded-full bg-sale/10 px-3 py-1 text-sm font-bold text-sale">
            95% OFF
          </span>
        </p>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative rounded-2xl bg-foreground p-2 shadow-[var(--shadow-card)] ring-1 ring-border">
            <video
              className="aspect-video w-full rounded-xl object-cover"
              src={VIDEO_URL}
              poster={booksEnglish1}
              controls
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full bg-sale px-3 py-1 text-[11px] font-bold text-sale-foreground shadow-[var(--shadow-soft)] sm:text-xs">
              <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-sale-foreground" />
              Offer ends in <span className="tabular-nums">{timeLeft}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <CtaButton>🚀 YES, UNLOCK MY LIBRARY @ ₹199</CtaButton>
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            Secure Payment · Instant Access · Downloadable · Mobile + Laptop
          </p>
          <p className="mt-2 text-sm font-semibold">
            ⭐⭐⭐⭐⭐ <span className="text-muted-foreground">Rated 4.9/5 by 2,400+ learners</span>
          </p>
        </div>
      </header>

      {/* Marquee */}
      <div className="mt-10 overflow-hidden border-y border-border bg-card py-3">
        <div className="animate-marquee flex w-max gap-8 pr-8">
          {[...badges, ...badges, ...badges].map((b, i) => (
            <span key={i} className="text-sm font-semibold text-primary">
              ✦ {b}
            </span>
          ))}
        </div>
      </div>

      <Section
        title="Why This Bundle is Different"
        subtitle="This isn't a random ebook pack. It's a curated digital knowledge vault."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differences.map(([icon, title, text]) => (
            <div key={title} className="card-soft rounded-2xl p-6 text-left">
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Whatever You Want to Learn, It's Already Inside"
        subtitle="16+ powerful categories. Thousands of premium ebooks."
        tone="muted"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map(([icon, name]) => (
            <div
              key={name}
              className="card-soft flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-transform hover:-translate-y-0.5"
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="देखिए कौन-कौन सी Books हैं Bundle में"
        subtitle="Rich Dad Poor Dad, Atomic Habits, Psychology of Money, Ikigai जैसी 5,00,000+ Bestseller Books — Hindi & English दोनों में"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              [booksHindi1, "Hindi bestseller eBooks collection"],
              [booksEnglish1, "English bestseller eBooks collection"],
              [booksEnglish2, "Business and sales eBooks collection"],
              [booksHindi2, "Finance and mindset eBooks collection"],
            ] as [string, string][]
          ).map(([src, alt]) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              width={1024}
              height={768}
              loading="lazy"
              className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)]"
            />
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold text-muted-foreground">
          ये सिर्फ कुछ examples हैं — Bundle में 5,00,000+ eBooks हैं! 🔥
        </p>
        <CtaButton className="mt-4">पूरी Library Unlock करें — ₹199 🔓</CtaButton>
      </Section>

      {/* Comparison */}
      <Section
        id="pricing"
        title="Are You Making the Smart Choice?"
        subtitle="Many useful ebooks individually cost ₹299–₹499+. Here, you unlock a giant bundle for just ₹199."
        tone="muted"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-soft rounded-2xl p-7 text-left opacity-90">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              The Expensive Way
            </p>
            <h3 className="mt-2 text-xl font-bold">1 Book on Amazon</h3>
            <p className="mt-1 text-2xl font-extrabold text-muted-foreground">₹299 / per book</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {[
                "Limited Knowledge",
                "High Cost Per Book",
                "No Bonuses",
                "Single Category Only",
              ].map((i) => (
                <li key={i}>✖ {i}</li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl border-2 border-accent bg-card p-7 text-left shadow-[var(--shadow-card)]">
            <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
              BEST VALUE
            </span>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">The Smart Way</p>
            <h3 className="mt-2 text-xl font-bold">Simpex Media Library Mega Bundle</h3>
            <p className="mt-1 text-3xl font-extrabold text-primary">
              ₹199 <s className="text-lg font-semibold text-muted-foreground">₹3,799</s>
            </p>
            <p className="mt-1 text-sm font-semibold text-sale">
              5,00,000+ eBooks • 95% OFF Today!
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Unlimited Knowledge Vault",
                "16+ Premium Categories",
                "Lifetime Access Forever",
                "500GB Audiobooks FREE Bonus",
              ].map((i) => (
                <li key={i}>✅ {i}</li>
              ))}
            </ul>
            <CtaButton className="mt-6 w-full">Get Instant Access — ₹199 🔓</CtaButton>
          </div>
        </div>
      </Section>

      <Section title="Who Is This For?" subtitle="If you want to grow, this is for you.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map(([icon, title, text]) => (
            <div key={title} className="card-soft rounded-2xl p-5 text-left">
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-2 text-base font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Why You'll Love This Bundle" tone="muted">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([icon, title, text]) => (
            <div key={title} className="card-soft rounded-2xl p-6 text-left">
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-2 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Loved by 2,400+ Learners" subtitle="4.9/5 based on verified buyer feedback">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {testimonials.map(([quote, name, city]) => (
            <figure key={name} className="card-soft break-inside-avoid rounded-2xl p-5 text-left">
              <div className="text-sm text-accent">⭐⭐⭐⭐⭐</div>
              <blockquote className="mt-2 text-sm leading-relaxed">"{quote}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold">{name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {city} • Verified Buyer ✅
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Bonuses */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[image:var(--gradient-green)] px-6 py-12 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold sm:text-3xl">🎁 FREE BONUS ALERT!</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm opacity-90">
            Get 500GB of Premium Audiobooks absolutely FREE when you buy today. Offer valid only for
            a limited time.
          </p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {bonuses.map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-2xl bg-primary-foreground/10 p-5 ring-1 ring-primary-foreground/15"
              >
                <div className="text-2xl">{icon}</div>
                <h3 className="mt-2 text-base font-bold">{title}</h3>
                <p className="mt-1 text-sm opacity-85">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Frequently Asked Questions" tone="muted">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl text-left">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="card-soft mb-3 rounded-2xl px-5">
              <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Final CTA */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
          <h2 className="text-2xl font-bold leading-tight sm:text-4xl">
            Don't Buy Books One-by-One — Own the Entire Library Forever
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            5,00,000+ eBooks · 16+ categories · 500GB audiobooks bonus · Lifetime access. One tiny
            payment today. No subscriptions. No renewals. Ever.
          </p>
          <CtaButton className="mt-6">🔥 YES, UNLOCK MY LIBRARY @ ₹199</CtaButton>
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            Secure Payment · Instant Delivery · Email Support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <img
            src={logo}
            alt="Simpex Media Library"
            width={64}
            height={64}
            loading="lazy"
            className="h-12 w-12"
          />
          <p className="text-sm font-bold">Simpex Media Library</p>
          <p className="text-xs text-muted-foreground">
            Contact Support:{" "}
            <a
              className="font-semibold text-primary underline underline-offset-2"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Simpex Media. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <CtaButton size="sm" className="w-full max-w-md">
            YES, UNLOCK MY LIBRARY @ ₹199
          </CtaButton>
        </div>
      </div>

      <PurchasePopup />
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
  tone = "default",
  id,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "default" | "muted";
  id?: string;
}) {
  return (
    <section id={id} className={`px-4 py-14 ${tone === "muted" ? "bg-mint" : ""}`}>
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
