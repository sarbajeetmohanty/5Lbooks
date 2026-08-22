import { useEffect, useState } from "react";
import { Zap, ShieldCheck, Download, Clock } from "lucide-react";

type Props = {
  checkoutUrl?: string;
  whatsappUrl?: string;
  originalPrice?: number;
  discountPrice?: number;
};

export function ExitIntentModal({
  checkoutUrl = "https://simpexmedia.co",
  whatsappUrl = "https://wa.me/?text=Hi%20Admin%2C%20I%20want%20to%20get%20the%20Complete%20GST%20%26%20TDS%20Filing%20Kit%20at%20a%20special%20discount.%20Please%20guide%20me!",
  originalPrice = 199,
  discountPrice = 149,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Back Button Trap
    try {
      window.history.pushState({ modalTrap: true }, "", window.location.href);
    } catch {}

    const handlePopState = () => {
      try {
        window.history.pushState({ modalTrap: true }, "", window.location.href);
      } catch {}
      setIsOpen(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md animate-fade-in sm:p-4"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-amber-500/60 bg-[#0B2017] p-5 text-center text-white shadow-2xl shadow-amber-500/20 sm:p-6 animate-scale-in">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close discount popup"
          className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-black text-white transition hover:bg-white/20 active:scale-95"
        >
          ✕
        </button>

        {/* Header Alert Tag */}
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-amber-500/50 bg-amber-500/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300">
          <Clock className="h-3.5 w-3.5 animate-pulse" />
          <span>Exclusive VIP Tax Offer — Next 10 Min Only</span>
        </div>

        <h3 className="mt-3 text-xl font-black tracking-tight sm:text-2xl text-white">
          Wait! Don't Miss the Complete <span className="text-amber-400">GST &amp; TDS Kit</span>
        </h3>

        <p className="mt-1.5 text-xs text-emerald-100/90 leading-relaxed sm:text-sm">
          Avoid costly CA penalties &amp; confusing filing steps. Claim your complete 11-in-1 tax toolkit right now:
        </p>

        {/* Pricing Comparison Box */}
        <div className="my-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/60 p-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground line-through">
              ₹{originalPrice}
            </span>
            <span className="text-3xl font-black text-amber-400 sm:text-4xl">
              ₹{discountPrice}
            </span>
            <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-black text-slate-950">
              ₹50 OFF
            </span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-emerald-300">
            ⚡ One-Time Payment • Lifetime Google Drive Access • 11 Resources
          </p>
        </div>

        {/* Features Checklist */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-left text-xs text-emerald-100">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>TDS &amp; GST Guides</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Excel Calculators</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Tax Calendar 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Invoice Templates</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2.5">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-black uppercase tracking-tight text-slate-950 shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            <span>Unlock Instant Drive Access @ ₹{discountPrice}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 py-2.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/40"
          >
            <span>💬 Need help? Message Tax Support on WhatsApp</span>
          </a>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground">
          🔒 100% Secure Checkout • 60-Second WhatsApp &amp; Email Delivery
        </p>
      </div>
    </div>
  );
}
