import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

type Props = {
  checkoutUrl?: string;
  whatsappUrl?: string;
  originalPrice?: number;
  discountPrice?: number;
};

export function ExitIntentModal({
  checkoutUrl = "https://simpexmedia.co",
  whatsappUrl = "https://wa.me/?text=Hi%20Admin%2C%20I%20want%20to%20get%20the%205%2C00%2C000%2B%20eBooks%20Library%20Bundle%20at%20a%20special%20discount.%20Please%20guide%20me!",
  originalPrice = 199,
  discountPrice = 149,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. BACK BUTTON TRAP (Mobile, Instagram, Chrome, Safari, Desktop):
    // Push dummy history entry immediately so clicking Back triggers popstate
    try {
      window.history.pushState({ modalTrap: true }, "", window.location.href);
    } catch {}

    const handlePopState = () => {
      // Re-push so page doesn't exit and show the ₹149 offer modal immediately
      try {
        window.history.pushState({ modalTrap: true }, "", window.location.href);
      } catch {}
      setIsOpen(true);
    };

    window.addEventListener("popstate", handlePopState);

    // 2. DESKTOP EXIT-INTENT: Mouse moving above viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 || e.relatedTarget === null) {
        setIsOpen(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // 3. MOBILE RAPID SCROLL-UP TRIGGER
    let lastY = window.scrollY;
    let maxY = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > maxY) maxY = currentY;

      // If user explored past 350px and rapidly scrolls up by > 140px
      if (maxY > 350 && lastY - currentY > 140) {
        setIsOpen(true);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock background scrolling when modal is open
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm animate-fade-in sm:p-4"
    >
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border-4 border-primary bg-card text-card-foreground shadow-2xl shadow-black animate-scale-in">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close special offer modal"
          className="absolute right-3.5 top-3.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-foreground/15 text-lg font-black text-foreground transition hover:bg-foreground/30 active:scale-90 cursor-pointer"
        >
          ✕
        </button>

        {/* Top Header Banner */}
        <div className="bg-primary px-5 py-3.5 text-center text-primary-foreground sm:px-6 sm:py-4">
          <span className="inline-block rounded-full bg-yellow-400 px-3 py-0.5 text-xs font-black uppercase text-black animate-pulse">
            Special One-Time Discount
          </span>
          <h2 className="mt-1.5 text-xl font-black uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
            WAIT! BEFORE YOU GO... 📚
          </h2>
          <p className="mt-1 text-xs font-bold text-yellow-300 sm:text-sm">
            Unlock 5,00,000+ eBooks + 500GB Audiobooks for Just ₹149!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 text-center sm:p-6">
          {/* Visual Preview + Price */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <img
              src={logo}
              alt="Simpex Media Library"
              width={100}
              height={100}
              className="h-24 w-24 rounded-2xl border-2 border-primary object-contain p-2 bg-background shadow-lg sm:h-28 sm:w-28"
            />
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground sm:text-xs">
                5,00,000+ eBooks + 500GB Audiobooks
              </p>
              <div className="mt-1 flex items-baseline justify-center gap-2 sm:justify-start">
                <span className="text-base font-bold line-through text-muted-foreground">
                  ₹{originalPrice}
                </span>
                <span className="text-2xl font-black text-primary sm:text-4xl">
                  ₹{discountPrice} ONLY
                </span>
              </div>
              <span className="mt-1 inline-block rounded-md bg-emerald-500/20 px-2 py-0.5 text-[11px] font-extrabold text-emerald-500 sm:text-xs">
                Instant ₹50 SAVINGS UNLOCKED!
              </span>
            </div>
          </div>

          {/* Value Bullet Points */}
          <ul className="mt-4 space-y-2 rounded-2xl bg-background/50 p-3.5 text-left text-xs font-semibold sm:mt-5 sm:p-4 sm:text-sm border border-border">
            <li className="flex items-center gap-2">
              <span className="font-bold text-primary">✔</span>
              <span>5,00,000+ Premium eBooks (16+ High-Value Categories)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-primary">✔</span>
              <span>FREE BONUS: 500GB High-Quality Audiobooks</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-primary">✔</span>
              <span>Instant Lifetime Google Drive Access (Read on Mobile & PC)</span>
            </li>
          </ul>

          {/* Primary CTA Action Button */}
          <div className="mt-5 sm:mt-6">
            <a
              href={checkoutUrl}
              onClick={() => setIsOpen(false)}
              className="btn-cta block w-full rounded-2xl py-3.5 text-center text-base font-black uppercase tracking-wider shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:text-lg cursor-pointer"
            >
              CLAIM ₹{discountPrice} OFFER NOW ➔
            </a>
          </div>

          {/* WhatsApp Admin Extra Discount Option */}
          <div className="mt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-center text-xs font-black uppercase text-black shadow-md transition-all hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-[0.98] sm:text-sm cursor-pointer"
            >
              <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.044-1.045-.078-.518-.154-1.18-.432-2.029-1.282-.85-.85-1.127-1.512-1.281-2.03-.122-.411-.123-.733-.078-1.045.05-.333.419-1.026.824-1.17.13-.046.26-.046.39-.046.13 0 .26 0 .39.046.144.405.492 1.2.492 1.2s.072.155.021.261c-.05.106-.108.188-.179.271-.072.083-.153.174-.219.239-.083.083-.169.174-.072.34.097.167.432.712.928 1.153.637.568 1.174.743 1.341.826.167.083.266.072.366-.043.1-.115.426-.497.54-.668.115-.17.23-.142.388-.083.158.058 1.002.472 1.174.558.173.086.288.13.331.203.044.072.044.419-.1.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.407C8.423 21.503 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.174-.488-4.468-1.328l-.32-.208-2.946.838.838-2.946-.208-.32C3.688 15.174 3.2 13.637 3.2 12 3.2 7.148 7.148 3.2 12 3.2s8.8 3.948 8.8 8.8-3.948 8.2-8.8 8.2z" />
              </svg>
              <span>Want at even less price? Message Admin on WhatsApp</span>
            </a>
          </div>

          {/* Decline / Dismiss Link */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-3.5 text-xs font-semibold text-muted-foreground underline hover:text-foreground sm:mt-4 cursor-pointer"
          >
            No thanks, I prefer paying ₹{originalPrice} later
          </button>
        </div>
      </div>
    </div>
  );
}
