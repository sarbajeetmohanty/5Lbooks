import { useEffect, useState } from "react";
import { Zap, ShieldCheck } from "lucide-react";

const DURATION_SECONDS = 1774; // 29m 34s
const STORAGE_KEY = "govt_countdown_end";

function getTargetTimestamp(): number {
  if (typeof window === "undefined") {
    return Date.now() + DURATION_SECONDS * 1000;
  }
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ts = Number(stored);
      if (!isNaN(ts) && ts > Date.now()) {
        return ts;
      }
    }
  } catch {}
  const newTarget = Date.now() + DURATION_SECONDS * 1000;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, String(newTarget));
  } catch {}
  return newTarget;
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function StickyTimerBar({
  checkoutUrl = "https://simpexmedia.co",
}: {
  checkoutUrl?: string;
}) {
  const [left, setLeft] = useState<number>(() => {
    if (typeof window === "undefined") return DURATION_SECONDS;
    const target = getTargetTimestamp();
    return Math.max(0, Math.floor((target - Date.now()) / 1000));
  });

  useEffect(() => {
    const tick = () => {
      const target = getTargetTimestamp();
      setLeft(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    };
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;

  return (
    <aside
      aria-label="Sticky countdown purchase bar"
      className="fixed inset-x-0 bottom-0 z-50 bg-[#06140E]/95 px-3 py-2 sm:px-6 sm:py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.9)] border-t border-emerald-500/30 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 sm:gap-6">
        {/* Left Timer with Top Badge */}
        <div className="flex flex-col items-start gap-0.5">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>2026 Edition • 80% Discount Ending</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 font-mono text-sm font-black text-white sm:text-base">
            <span className="rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-2 py-1 text-emerald-300">
              {pad(h)}
            </span>
            <span className="text-emerald-500 font-bold">:</span>
            <span className="rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-2 py-1 text-emerald-300">
              {pad(m)}
            </span>
            <span className="text-emerald-500 font-bold">:</span>
            <span className="rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-2 py-1 text-accent animate-pulse">
              {pad(s)}
            </span>
          </div>
        </div>

        {/* Center Price Tag */}
        <div className="hidden text-center sm:block">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-xl font-black text-white">₹199</span>
            <span className="text-xs text-muted-foreground line-through">₹999</span>
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              Save 80%
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
            <ShieldCheck className="h-3 w-3 text-primary" /> Instant Google Drive Access
          </p>
        </div>

        {/* Right CTA Button */}
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-950 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>Get GST & TDS Kit @ ₹199</span>
        </a>
      </div>
    </aside>
  );
}
