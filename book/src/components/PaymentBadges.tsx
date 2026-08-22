export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Authentic Payment App Logos Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {/* Google Pay Official Logo */}
        <div className="flex h-7 items-center justify-center rounded-lg bg-white px-2.5 py-1 shadow-sm border border-slate-200/80 sm:h-8">
          <svg className="h-4 w-auto sm:h-4.5" viewBox="0 0 1024 416" fill="none">
            <path
              d="M130.6 208.5c0-10.7-1-21-2.8-30.8H0v58.3h73.3c-3.2 17-12.8 31.4-27.2 41.1v34.2h44c25.7-23.7 40.5-58.5 40.5-102.8z"
              fill="#4285F4"
            />
            <path
              d="M0 339.1c36.6 0 67.4-12.1 89.9-32.9l-44-34.2c-12.2 8.2-27.8 13-45.9 13-35.3 0-65.2-23.8-75.9-55.9H-122v35.3C-100.2 308.2-53.5 339.1 0 339.1z"
              fill="#34A853"
            />
            <path
              d="M-75.9 229.1c-2.7-8.2-4.3-16.9-4.3-25.9 0-9 1.5-17.7 4.3-25.9V142H-122C-131 160-136 180.2-136 203.2c0 23 5 43.2 14 61.2l46.1-35.3z"
              fill="#FBBC05"
            />
            <path
              d="M0 137.9c19.9 0 37.8 6.9 51.9 20.3l38.9-38.9C67.4 97.2 36.6 85.3 0 85.3c-53.5 0-100.2 30.9-122 76.7l46.1 35.3C-65.2 161.7-35.3 137.9 0 137.9z"
              fill="#EA4335"
            />
            <path
              d="M260.8 108.4h-57.7v171.9h27.4v-64.8h30.3c32.7 0 59.2-23.7 59.2-53.6s-26.5-53.5-59.2-53.5zm-.5 80.8H230.5v-54.6h29.8c18.5 0 32.5 12.3 32.5 27.3 0 15-14 27.3-32.5 27.3zm170.8 20.9c-20.9 0-38.3 8.3-46.7 20.5v-18.1h-26v115.8h27.4v-42.3c8.4 12.2 25.8 20.5 45.3 20.5 33.6 0 60.1-26.6 60.1-60.8s-26.5-60.6-60.1-60.6zm-11.4 95.3c-19.5 0-35.1-15.5-35.1-34.7s15.6-34.7 35.1-34.7c19.5 0 34.6 15.5 34.6 34.7 0 19.3-15.1 34.7-34.6 34.7zm163.6-13.4c-11.9-4.8-19.9-11.3-19.9-22 0-11.7 11.2-19.8 26.6-19.8 15.9 0 27.7 7.7 33.8 19.4l24.4-12.7c-9.7-18.7-28.7-30.8-58.2-30.8-32.7 0-54.6 19.3-54.6 46.4 0 25.7 18.2 38.6 44.5 45.3 14.7 3.8 22.8 9.3 22.8 17.5 0 10.9-12.4 18.2-28.7 18.2-19.3 0-31.9-9.1-38.6-23.7l-24.8 12.6c10.4 22.7 31.8 35.2 63.4 35.2 35.8 0 57.5-19.6 57.5-48.4 0-26.7-19.5-39.7-48.2-47.1z"
              fill="#5F6368"
            />
          </svg>
        </div>

        {/* PhonePe Official Logo */}
        <div className="flex h-7 items-center justify-center rounded-lg bg-[#5f259f] px-2.5 py-1 shadow-sm sm:h-8">
          <svg className="h-4 w-auto sm:h-4.5" viewBox="0 0 450 140" fill="none">
            <circle cx="70" cy="70" r="58" fill="#5f259f" />
            <path
              d="M87.5 45H58c-4.4 0-8 3.6-8 8v52c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V88h13.5c15.2 0 27.5-12.3 27.5-27.5v-2c0-7.5-6.1-13.5-13.5-13.5zm-5.5 27H66V61h16c3.3 0 6 2.7 6 6v0c0 3.3-2.7 6-6 6z"
              fill="#FFFFFF"
            />
            <text
              x="145"
              y="85"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="52"
              fontWeight="900"
              fill="#FFFFFF"
              letterSpacing="-1"
            >
              PhonePe
            </text>
          </svg>
        </div>

        {/* Paytm Official Logo */}
        <div className="flex h-7 items-center justify-center rounded-lg bg-white px-2.5 py-1 shadow-sm border border-slate-200/80 sm:h-8">
          <svg className="h-4 w-auto sm:h-4.5" viewBox="0 0 280 90" fill="none">
            <path
              d="M18.8 17.5h20.6c13.7 0 22.8 8.4 22.8 21.1 0 12.8-9.1 21.3-22.8 21.3H29.6v24.6H18.8V17.5zm10.8 32.4h9.8c7.5 0 12-4.5 12-11.3 0-6.7-4.5-11.2-12-11.2h-9.8v22.5zm66.1 13.9c0 8.1 4.7 12.7 12.3 12.7 5.6 0 10.1-2.5 13.2-7.2v6.2h10.4V46.6h-10.4v6.5c-3.1-4.8-7.7-7.4-13.3-7.4-7.5 0-12.2 4.7-12.2 12.8v15.3zm10.4-12.4c0-4.8 2.6-7.3 6.9-7.3 4.3 0 6.9 2.5 6.9 7.3v9.5c0 4.8-2.6 7.3-6.9 7.3-4.3 0-6.9-2.5-6.9-7.3v-9.5zm55.3-7.7l-9.8 24.2-9.6-24.2h-11.4l15.7 36.3-8.8 19.3h11.2l24.3-55.6h-11.6z"
              fill="#002970"
            />
            <path
              d="M174.5 35.8h11.2v9.3h-11.2v20.4c0 3.7 1.8 5.6 5.4 5.6h5.8v9.4h-9.1c-9.8 0-13.3-4.9-13.3-14V45.1h-7.8v-9.3h7.8V23.7l11.2-4.8v16.9zm27.4 10.8c3.2-4.8 7.7-7.4 13.3-7.4 5.9 0 10.3 2.8 12.5 7.9 3.5-5.1 8.3-7.9 14.3-7.9 7.5 0 12.3 4.7 12.3 12.8v37.3h-10.8V54.2c0-4.8-2.4-7.3-6.4-7.3-4 0-6.4 2.5-6.4 7.3v32.3H219V54.2c0-4.8-2.4-7.3-6.4-7.3-4.1 0-6.5 2.5-6.5 7.3v32.3h-10.8V46.6h6.6z"
              fill="#00BAF2"
            />
          </svg>
        </div>

        {/* UPI Official Logo */}
        <div className="flex h-7 items-center justify-center rounded-lg bg-white px-2 py-1 shadow-sm border border-slate-200/80 sm:h-8">
          <svg className="h-4.5 w-auto sm:h-5" viewBox="0 0 190 75" fill="none">
            <path d="M42 12l-22 51h14.5l6-14h18l3 14H75L53 12H42zm2.5 27l5-12 5 12h-10z" fill="#097939" />
            <path d="M18 12l-18 51h13.5l18-51H18z" fill="#E26A2C" />
            <text
              x="82"
              y="54"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="44"
              fontWeight="900"
              fontStyle="italic"
              fill="#0F172A"
              letterSpacing="2"
            >
              UPI
            </text>
          </svg>
        </div>

        {/* RuPay / Cards Official Logo */}
        <div className="flex h-7 items-center justify-center rounded-lg bg-white px-2.5 py-1 shadow-sm border border-slate-200/80 sm:h-8">
          <svg className="h-4 w-auto sm:h-4.5" viewBox="0 0 240 75" fill="none">
            <text
              x="6"
              y="52"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="38"
              fontWeight="900"
              fill="#0F172A"
              letterSpacing="1"
            >
              RuPay
            </text>
            <path d="M152 20l22 36h-14l-15-25 7-11z" fill="#097939" />
            <path d="M166 20l22 36h-14l-15-25 7-11z" fill="#E26A2C" />
          </svg>
        </div>
      </div>

      {/* Trust Subline */}
      <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-bold text-muted-foreground sm:text-xs">
        <span className="text-primary">🔒 256-Bit SSL Encrypted</span>
        <span>•</span>
        <span className="text-emerald-400">⚡ Instant Google Drive Delivery</span>
      </p>
    </div>
  );
}
