import { ShieldCheck, Zap, RotateCcw, Lock } from "lucide-react";

export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
      {/* UPI, Card & Wallet Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-300/90">
        <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 shadow-sm">
          🟢 GPay
        </span>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 shadow-sm">
          🟣 PhonePe
        </span>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 shadow-sm">
          🔵 Paytm
        </span>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 shadow-sm">
          ⚡ UPI Intent
        </span>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 shadow-sm">
          💳 Debit / Credit Card
        </span>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Zap className="h-3.5 w-3.5 text-accent" />
          <span>Instant Google Drive Delivery in 60s</span>
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>2026 Updated Edition</span>
        </span>
        <span className="flex items-center gap-1">
          <RotateCcw className="h-3.5 w-3.5 text-accent" />
          <span>100% Risk-Free Guarantee</span>
        </span>
        <span className="flex items-center gap-1">
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          <span>256-Bit SSL Encrypted</span>
        </span>
      </div>
    </div>
  );
}
