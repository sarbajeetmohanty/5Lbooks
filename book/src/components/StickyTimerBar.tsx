import { useEffect, useState } from "react";

const DURATION_SECONDS = 1774; // 29m 34s
const STORAGE_KEY = "book_countdown_end";

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
      className="fixed inset-x-0 bottom-0 z-50 bg-black px-3 py-2 sm:px-6 sm:py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.9)] border-t border-primary/30"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 sm:gap-6">
        {/* Left Timer with Top Badge */}
        <div className="flex flex-col items-center">
          {/* Top Amber Tab */}
          <div className="rounded-t-[8px] bg-yellow-400 px-3 py-0.5 text-[10px] font-black tracking-tight text-black sm:px-4 sm:text-xs">
            Limited Time Offer
          </div>
          {/* Black Timer Box with Border */}
          <div className="flex items-center gap-2.5 rounded-[18px] border-2 border-yellow-400 bg-black px-3 py-1 sm:gap-6 sm:px-6 sm:py-1.5">
            <div className="flex min-w-[28px] flex-col items-center sm:min-w-[42px]">
              <span className="text-base font-extrabold tabular-nums leading-tight text-white sm:text-2xl">
                {pad(h)}
              </span>
              <span className="text-[10px] font-bold text-white/90 sm:text-xs">
                Hours
              </span>
            </div>
            <div className="flex min-w-[28px] flex-col items-center sm:min-w-[42px]">
              <span className="text-base font-extrabold tabular-nums leading-tight text-white sm:text-2xl">
                {pad(m)}
              </span>
              <span className="text-[10px] font-bold text-white/90 sm:text-xs">
                Minutes
              </span>
            </div>
            <div className="flex min-w-[28px] flex-col items-center sm:min-w-[42px]">
              <span className="text-base font-extrabold tabular-nums leading-tight text-white sm:text-2xl">
                {pad(s)}
              </span>
              <span className="text-[10px] font-bold text-white/90 sm:text-xs">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Right BUY NOW / UNLOCK LIBRARY Button */}
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 px-5 py-3 text-center text-xs font-black tracking-wide text-black shadow-[0_4px_20px_rgba(234,179,8,0.4)] transition-all duration-200 animate-pulse hover:scale-105 active:scale-95 sm:rounded-2xl sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
        >
          YES, UNLOCK LIBRARY @ ₹199
        </a>
      </div>
    </aside>
  );
}
