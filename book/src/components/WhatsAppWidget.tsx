export function WhatsAppWidget({
  whatsappUrl = "https://wa.me/?text=Hi%20Simpex%20Media%20Team%2C%20I%20have%20a%20question%20about%20the%205%2C00%2C000%2B%20eBooks%20Library%20Bundle.%20Can%20you%20help%20me%20with%20instant%20access%3F",
}: {
  whatsappUrl?: string;
}) {
  return (
    <aside
      aria-label="WhatsApp live chat support"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 transition-transform duration-300 hover:scale-105 sm:bottom-24 sm:right-6"
    >
      {/* Floating Tooltip Bubble */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden rounded-full border border-emerald-500/30 bg-card/95 px-3.5 py-1.5 text-xs font-bold text-foreground shadow-xl backdrop-blur-md transition hover:bg-card md:flex items-center gap-2"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
        </span>
        <span>Need help or UPI QR? <strong className="text-[#25D366]">Chat on WhatsApp</strong></span>
      </a>

      {/* Pulsing WhatsApp Circle Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with admin on WhatsApp"
        className="relative grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-600/50 transition hover:bg-[#20bd5a] hover:scale-110 active:scale-95 cursor-pointer sm:h-14 sm:w-14"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-black text-white items-center justify-center">
            1
          </span>
        </span>
        <svg className="h-7 w-7 fill-current sm:h-8 sm:w-8" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.044-1.045-.078-.518-.154-1.18-.432-2.029-1.282-.85-.85-1.127-1.512-1.281-2.03-.122-.411-.123-.733-.078-1.045.05-.333.419-1.026.824-1.17.13-.046.26-.046.39-.046.13 0 .26 0 .39.046.144.405.492 1.2.492 1.2s.072.155.021.261c-.05.106-.108.188-.179.271-.072.083-.153.174-.219.239-.083.083-.169.174-.072.34.097.167.432.712.928 1.153.637.568 1.174.743 1.341.826.167.083.266.072.366-.043.1-.115.426-.497.54-.668.115-.17.23-.142.388-.083.158.058 1.002.472 1.174.558.173.086.288.13.331.203.044.072.044.419-.1.824zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.407C8.423 21.503 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.174-.488-4.468-1.328l-.32-.208-2.946.838.838-2.946-.208-.32C3.688 15.174 3.2 13.637 3.2 12 3.2 7.148 7.148 3.2 12 3.2s8.8 3.948 8.8 8.8-3.948 8.2-8.8 8.2z" />
        </svg>
      </a>
    </aside>
  );
}
