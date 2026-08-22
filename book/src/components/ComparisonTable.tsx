export function ComparisonTable() {
  const rows = [
    {
      feature: "Total Library Size",
      physical: "5-10 books",
      kindle: "Rental access (limited)",
      bundle: "5,00,000+ Premium eBooks + Audiobooks",
    },
    {
      feature: "Total Investment Cost",
      physical: "₹3,500 to ₹5,000",
      kindle: "₹2,028 / Year (Recurring)",
      bundle: "₹199 One-Time (Lifetime Access)",
    },
    {
      feature: "Cost Per Book",
      physical: "₹350 to ₹600 per book",
      kindle: "Subscription fee",
      bundle: "Less than ₹0.0004 per book",
    },
    {
      feature: "Audiobook Bonus (500GB)",
      physical: "Not included",
      physicalAudible: "₹199/month extra",
      bundle: "500GB High-Quality Audiobooks FREE",
    },
    {
      feature: "Device Compatibility",
      physical: "Heavy physical weight",
      kindle: "Locked to Kindle app",
      bundle: "Read on Mobile, Tablet, PC & Kindle",
    },
    {
      feature: "Access Validity",
      physical: "Risk of page damage",
      kindle: "Expires when sub stops",
      bundle: "Lifetime Google Drive Access Forever",
    },
    {
      feature: "Delivery Time",
      physical: "3-5 days delivery",
      kindle: "App install",
      bundle: "Instant Access in 60 Seconds",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <span className="inline-block rounded-full bg-primary/20 px-3.5 py-1 text-xs font-black uppercase text-primary">
          Value Comparison Matrix
        </span>
        <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
          Why Buying Individual Books Doesn't Make Sense 💡
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-muted-foreground sm:text-sm">
          Get lifetime access to the world's greatest digital library for less than the cost of a single cup of coffee!
        </p>
      </div>

      {/* Comparison Table Box */}
      <div className="mt-8 overflow-x-auto rounded-3xl border-2 border-primary/40 bg-card p-3 shadow-2xl sm:p-5">
        <table className="w-full min-w-[620px] text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/80 text-muted-foreground">
              <th className="pb-3 pl-3 font-extrabold uppercase sm:text-xs">Feature</th>
              <th className="pb-3 text-center font-bold">Physical Paperbacks</th>
              <th className="pb-3 text-center font-bold">Kindle / Audible</th>
              <th className="rounded-t-2xl bg-primary px-4 pb-3 pt-3 text-center text-xs font-black uppercase text-primary-foreground sm:text-sm shadow-md">
                ⭐ 5,00,000+ Library
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rows.map((r, i) => (
              <tr key={r.feature} className={i % 2 === 0 ? "bg-background/40" : ""}>
                <td className="py-3 pl-3 font-bold text-foreground">
                  {r.feature}
                </td>
                <td className="py-3 text-center text-muted-foreground">
                  {r.physical}
                </td>
                <td className="py-3 text-center text-muted-foreground">
                  {r.kindle}
                </td>
                <td className="bg-primary/15 px-4 py-3 text-center font-black text-primary sm:text-base">
                  {r.bundle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 100% Risk-Free Guarantee & Instant Access Verification Stamp */}
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border-2 border-dashed border-primary bg-primary/10 p-4 sm:p-6 text-center shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-2xl text-primary-foreground font-black shadow-md">
            🛡️
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-base font-black uppercase tracking-tight text-foreground sm:text-lg">
              100% Risk-Free Instant Access Guarantee
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm leading-relaxed">
              Instant Google Drive Access delivered to your WhatsApp &amp; Email within <strong>60 seconds</strong> of purchase or 100% money back! Lifetime validity with unlimited downloads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
