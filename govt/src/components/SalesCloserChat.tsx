import { useState, useEffect, useRef } from "react";
import { generateGeminiResponse, detectLanguage } from "@/lib/gemini";

type Message = {
  id: string;
  sender: "agent" | "user";
  text: string;
  time: string;
  cta?: {
    label: string;
    url: string;
  };
};

function playWhatsAppChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(850, now);
    osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
    gain1.gain.setValueAtTime(0.22, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.18);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1250, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(1450, now + 0.16);
    gain2.gain.setValueAtTime(0.18, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.25);
  } catch {
    // Autoplay restrictions handled gracefully
  }
}

const GOVT_KNOWLEDGE_BASE_PROMPT = `You are a friendly, human tax support specialist from Simpex Media for the Complete GST & TDS Filing Kit (2026 Edition).

#1 STRICT RULE: ALWAYS REPLY IN THE EXACT SAME LANGUAGE & SCRIPT AS THE USER'S LATEST MESSAGE:
- If user asked in ENGLISH: Reply 100% in natural, fluent, friendly ENGLISH. Never use Hindi/Hinglish.
- If user asked in HINGLISH: Reply 100% in sweet, simple HINGLISH (Hindi written in English alphabet). Never use English.
- If user asked in HINDI (Devanagari): Reply 100% in Hindi (Devanagari script).

#2 COMMUNICATE IN SIMPLE, COMMON WORDS:
- Keep replies short (2 to 3 sentences max), warm, helpful, and clear.

#3 WHAT IS INCLUDED (11 COMPLETE RESOURCES):
- 📘 1. Complete TDS Filing Guide (TAN/PAN, Sections 194C/194J/194Q/194I, Challan payment, Return workflow, common errors).
- 📗 2. Complete GST Filing Guide (Registration, GSTR-1, GSTR-3B, GSTR-9, ITC rules, invoice essentials).
- 📊 3. Tax Calculation & Reconciliation Excel Toolkit (Advance Tax Estimator, GSTR-2B Reconciliation, TDS Tracker).
- ✅ 4. GST & TDS Compliance Checklists (Printable checklists).
- 📅 5. Tax Compliance Calendar (FY 2026-27 compliance due dates).
- 🧾 6. Professional Business Invoice Templates (Ready-to-use).
- 💰 Bonus 1: Business Expense Tracker Spreadsheet.
- 🌐 Bonus 2: Government Resources Directory.
- 📂 Bonus 3: Ultimate Tax Document Organizer.
- Works seamlessly on Mobile, Tablet, Laptop, and PC (PDF & Excel formats).
- Price: ₹199 one-time payment for lifetime access with unlimited downloads.
- Delivery: Instant 60-second delivery to WhatsApp & Email via Google Drive. 100% risk-free.

#4 DISCOUNT TRIGGER (ONLY IF USER ASKS):
- If asked in Hinglish: "Sir/Ma'am, aap hamare special customer hain! 🎁 Agle 10 minute ke liye humne aapke liye VIP ₹149 offer unlock kar diya hai. Niche diye button par tap karke turant access grab kar lijiye!"
- If asked in English: "Sir/Ma'am, you are our special customer! 🎁 For the next 10 minutes only, we have unlocked our VIP ₹149 offer for you. Tap the button below to grab instant lifetime access!"`;

function getContextualCta(userText: string, checkoutUrl: string): { label: string; url: string } {
  const t = userText.toLowerCase();
  const lang = detectLanguage(userText);

  if (
    t.includes("discount") ||
    t.includes("kam") ||
    t.includes("149") ||
    t.includes("offer") ||
    t.includes("coupon") ||
    t.includes("sasta") ||
    t.includes("less") ||
    t.includes("paisa")
  ) {
    return {
      label: lang === "english" ? "🎁 CLAIM ₹149 VIP ACCESS (VALID 10 MIN) ➔" : "🎁 CLAIM ₹149 VIP ACCESS (VALID 10 MIN) ➔",
      url: checkoutUrl,
    };
  }

  if (t.includes("link") || t.includes("drive") || t.includes("delivery") || t.includes("kaise milega")) {
    return {
      label: lang === "english" ? "⚡ GET INSTANT GOOGLE DRIVE ACCESS @ ₹199 ➔" : "⚡ GET INSTANT DRIVE ACCESS @ ₹199 ➔",
      url: checkoutUrl,
    };
  }

  return { label: "👉 GET COMPLETE GST & TDS KIT @ ₹199 ➔", url: checkoutUrl };
}

function getPsychologicalFallback(userText: string): { reply: string } {
  const t = userText.toLowerCase();
  const lang = detectLanguage(userText);

  // Discount
  if (
    t.includes("discount") ||
    t.includes("kam") ||
    t.includes("149") ||
    t.includes("offer") ||
    t.includes("coupon") ||
    t.includes("sasta") ||
    t.includes("less") ||
    t.includes("paisa")
  ) {
    if (lang === "english") {
      return {
        reply:
          "Sir/Ma'am, you are our special customer! 🎁 For the next 10 minutes only, we have unlocked our VIP ₹149 offer for you. Tap the button below to grab lifetime access right now! 👇",
      };
    }
    if (lang === "hindi") {
      return {
        reply:
          "नमस्ते! आप हमारे विशेष ग्राहक हैं 🎁 अगले 10 मिनट के लिए हमने आपके लिए विशेष ₹149 ऑफर अनलॉक कर दिया है। नीचे दिए बटन पर टैप करके तुरंत लाइफटाइम एक्सेस प्राप्त करें! 👇",
      };
    }
    return {
      reply:
        "Sir/Ma'am, aap hamare special customer hain! 🎁 Agle 10 minute ke liye humne aapke liye VIP ₹149 offer unlock kar diya hai. Niche diye button par tap karke turant access le lijiye! 👇",
    };
  }

  // GSTR-2B Reconciliation
  if (
    t.includes("gstr-2b") ||
    t.includes("gstr2b") ||
    t.includes("purchase register") ||
    t.includes("reconcile") ||
    t.includes("itc")
  ) {
    if (lang === "english") {
      return {
        reply:
          "Yes, absolutely! The included GSTR-2B vs Books Excel Reconciler has pre-configured VLOOKUP & mismatch formulas to quickly match purchase invoices and claim 100% accurate ITC. 📊",
      };
    }
    return {
      reply:
        "Haan ji bilkul! Isme GSTR-2B vs Purchase Register Reconciler Excel sheet included hai jisme automated formulas set hain, jisse aap 100% sahi ITC claim kar sakte hain bina kisi error ke! 📊",
    };
  }

  // FY 2026-27 filings
  if (
    t.includes("2026") ||
    t.includes("2027") ||
    t.includes("fy") ||
    t.includes("financial year") ||
    t.includes("latest") ||
    t.includes("budget")
  ) {
    if (lang === "english") {
      return {
        reply:
          "Yes! This is the 2026 Edition, 100% updated with all recent GST Council notifications, FY 2026-27 compliance calendars, and latest TDS sections & limits. 📅",
      };
    }
    return {
      reply:
        "Haan ji! Ye 2026 Edition hai jo FY 2026-27 ke sabhi latest GST Council rules, tax calendars aur TDS limits ke hisab se 100% updated hai. 📅",
    };
  }

  // Invoice templates edit
  if (
    t.includes("invoice") ||
    t.includes("word") ||
    t.includes("bill") ||
    t.includes("edit")
  ) {
    if (lang === "english") {
      return {
        reply:
          "Yes! The professional GST-compliant invoice templates are 100% editable in MS Word, MS Excel, Google Docs, and PDF formats. You can easily add your logo and business details. 🧾",
      };
    }
    return {
      reply:
        "Haan ji! Sabhi business invoice templates MS Word, Excel aur PDF me fully editable hain. Aap apna company logo aur details aaram se change karke bill bana sakte hain. 🧾",
    };
  }

  // Delivery & Access
  if (
    t.includes("link") ||
    t.includes("kaise") ||
    t.includes("how") ||
    t.includes("receive") ||
    t.includes("delivery") ||
    t.includes("drive")
  ) {
    if (lang === "english") {
      return {
        reply:
          "Within 60 seconds of completing payment, your permanent Google Drive lifetime access link will be delivered directly to your WhatsApp and Email! ⚡ You can download and use all files anytime.",
      };
    }
    if (lang === "hindi") {
      return {
        reply:
          "भुगतान पूरा होते ही 60 सेकंड के भीतर Google Drive का परमानेंट डाउनलोड लिंक आपके WhatsApp और Email दोनों पर प्राप्त हो जाएगा! ⚡",
      };
    }
    return {
      reply:
        "Payment complete hote hi 60 seconds ke andar Google Drive ka permanent link aapke WhatsApp aur Email dono par receive ho jayega! ⚡ Jab chahein download aur use kijiye. 📥",
    };
  }

  // Excel tools
  if (
    t.includes("excel") ||
    t.includes("sheet") ||
    t.includes("calculator") ||
    t.includes("template")
  ) {
    if (lang === "english") {
      return {
        reply:
          "Yes! It includes ready-to-use Excel spreadsheets for Advance Tax Estimation, GSTR-2B Reconciliation, and TDS Deduction Tracking with pre-set formulas. 📊",
      };
    }
    return {
      reply:
        "Isme Advance Tax Estimator, GSTR-2B Reconciliation Sheet aur TDS Tracker ke ready-to-use Excel templates included hain jinme formulas pehle se set hain! 📊",
    };
  }

  // Beginner friendly
  if (t.includes("beginner") || t.includes("fresh") || t.includes("easy") || t.includes("start")) {
    if (lang === "english") {
      return {
        reply:
          "This toolkit is 100% beginner-friendly! All GST & TDS concepts are explained in simple language with practical real-life examples and step-by-step checklists. 📗",
      };
    }
    return {
      reply:
        "Ye kit bilkul beginner-friendly hai! Sabhi TDS aur GST concepts ko aasan bhasha, practical examples aur step-by-step checklists ke sath samjhaya gaya hai. 📗",
    };
  }

  // Trust / Safe
  if (
    t.includes("safe") ||
    t.includes("trust") ||
    t.includes("fake") ||
    t.includes("real") ||
    t.includes("scam") ||
    t.includes("refund") ||
    t.includes("guarantee")
  ) {
    if (lang === "english") {
      return {
        reply:
          "This is a 100% verified and secure digital toolkit trusted by thousands of Indian businesses, freelancers, and accountants. Instant 60-second delivery with a 100% satisfaction guarantee. 🛡️",
      };
    }
    return {
      reply:
        "100% Safe & Verified toolkit hai! 🛡️ Thousands of business owners & CAs ise use kar rahe hain. Instant 60-second delivery aur 100% money back guarantee hai. ✅",
    };
  }

  // Default
  if (lang === "english") {
    return {
      reply:
        "The Complete GST & TDS Filing Kit (2026 Edition) includes 11 powerful resources — Step-by-Step Guides, Excel Calculators, Checklists, Calendar, and Invoices. Get lifetime access today for just ₹199! 🚀",
    };
  }
  return {
    reply:
      "Is Complete GST & TDS Filing Kit (2026 Edition) me 11 powerful resources milte hain — Guides, Excel tools, Checklists aur Invoices. Abhi sirf ₹199 me lifetime access mil raha hai! 🚀",
  };
}

export function SalesCloserChat({
  checkoutUrl = "https://simpexmedia.co",
}: {
  checkoutUrl?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "agent",
      text: "Hey! 👋 We are from Simpex Media team. How can we help you?",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Proactive Teaser Bubble on Scroll (35%) or Timer (14s)
  useEffect(() => {
    if (teaserDismissed || isOpen) return;

    const timer = setTimeout(() => {
      if (!isOpen && !teaserDismissed) {
        setShowTeaser(true);
        playWhatsAppChime();
      }
    }, 14000);

    const handleScroll = () => {
      if (isOpen || teaserDismissed) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY / docHeight >= 0.35) {
        setShowTeaser(true);
        playWhatsAppChime();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, teaserDismissed]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const cta = getContextualCta(text, checkoutUrl);

    try {
      let replyText = "";
      try {
        replyText = await generateGeminiResponse(GOVT_KNOWLEDGE_BASE_PROMPT, text, messages);
      } catch {
        const fb = getPsychologicalFallback(text);
        replyText = fb.reply;
      }

      setTimeout(() => {
        setIsTyping(false);
        playWhatsAppChime();
        const agentMsg: Message = {
          id: String(Date.now() + 1),
          sender: "agent",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          cta: cta,
        };
        setMessages((prev) => [...prev, agentMsg]);
      }, 650);
    } catch {
      setIsTyping(false);
      playWhatsAppChime();
      const fb = getPsychologicalFallback(text);
      const agentMsg: Message = {
        id: String(Date.now() + 1),
        sender: "agent",
        text: fb.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        cta: cta,
      };
      setMessages((prev) => [...prev, agentMsg]);
    }
  };

  const quickChips = [
    "Will this help me reconcile GSTR-2B with my purchase register? 📊",
    "Can I use this for FY 2026-27 filings? 📅",
    "Can I print and edit invoice templates in MS Word/Excel? 🧾",
    "How will I receive the Google Drive link? ⚡",
    "Kit me kaun kaun se tools hain? 💼",
  ];

  return (
    <>
      {/* Proactive Floating Teaser Bubble */}
      {showTeaser && !isOpen && (
        <aside
          aria-label="Chat assistant preview"
          className="fixed bottom-38 right-4 z-40 max-w-[300px] rounded-2xl border-2 border-emerald-500/50 bg-[#0B141A]/95 p-3.5 text-white shadow-2xl backdrop-blur-md animate-scale-in sm:bottom-40 sm:right-6 cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setShowTeaser(false);
            setTeaserDismissed(true);
          }}
        >
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#075E54] text-base">
                💼
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#0B141A] bg-[#25D366]" />
            </div>
            <div className="flex-1 text-[11px] leading-snug">
              <div className="flex items-center justify-between">
                <p className="font-black text-[#25D366]">Simpex Tax Support Online</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTeaser(false);
                    setTeaserDismissed(true);
                  }}
                  className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[10px] text-[#8696A0] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="mt-1 text-[#E9EDEF]">
                👋 Have a question on GST &amp; TDS? <strong>Tax Support is online</strong> to help you unlock instant Drive access!
              </p>
              <span className="mt-1.5 inline-block text-[10px] font-bold text-[#25D366] underline">
                Tap to chat with us ➔
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* Floating WhatsApp Bubble Trigger */}
      <aside
        aria-label="Live sales assistant"
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 sm:bottom-24 sm:right-6"
      >
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTeaser(false);
            setTeaserDismissed(true);
          }}
          className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/40 bg-card/95 px-3.5 py-1.5 text-xs font-extrabold text-foreground shadow-2xl backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
          </span>
          <span>Have a question? <strong className="text-[#25D366]">Chat with Us</strong></span>
        </button>

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTeaser(false);
            setTeaserDismissed(true);
          }}
          aria-label="Open sales chat"
          className="relative grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-600/60 transition-transform duration-200 hover:bg-[#20bd5a] hover:scale-110 active:scale-95 cursor-pointer sm:h-14 sm:w-14"
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
        </button>
      </aside>

      {/* WhatsApp Styled Live Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 z-[60] flex h-[520px] max-h-[82vh] w-[92vw] max-w-sm flex-col overflow-hidden rounded-3xl border-2 border-[#075E54]/40 bg-[#0B141A] shadow-2xl shadow-black animate-scale-in sm:bottom-24 sm:right-6">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-base font-black text-[#075E54]">
                  💼
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-[#25D366]" />
              </div>
              <div>
                <p className="text-sm font-black flex items-center gap-1">
                  <span>Simpex Tax Team</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-bold">Verified</span>
                </p>
                <p className="text-[10px] text-emerald-200">Online • Instant Google Drive Support</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full bg-black/20 text-sm font-bold text-white transition hover:bg-black/40 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto bg-[#0b141a] p-3.5 space-y-3">
            <div className="rounded-xl bg-[#182229] p-2 text-center text-[10px] font-bold text-[#8696A0]">
              🔒 Messages are end-to-end encrypted &amp; powered by Instant AI Tax Support
            </div>

            {messages.map((m) => {
              const isMe = m.sender === "user";
              return (
                <div key={m.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                      isMe
                        ? "rounded-tr-none bg-[#005C4B] text-white"
                        : "rounded-tl-none bg-[#202C33] text-[#E9EDEF]"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.cta && (
                      <a
                        href={m.cta.url}
                        className="mt-2.5 flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 py-2 px-3 text-center text-[11px] font-black uppercase text-slate-950 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {m.cta.label}
                      </a>
                    )}
                    <span className="mt-1 block text-right text-[9px] text-[#8696a0]">
                      {m.time} {isMe && "✓✓"}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none bg-[#202C33] px-3.5 py-2 text-xs text-[#8696a0] w-fit animate-pulse">
                <span>Simpex Tax Team is typing</span>
                <span className="animate-bounce">...</span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Quick Tap Suggestion Chips */}
          <div className="bg-[#111B21] px-2 py-1.5 overflow-x-auto flex gap-1.5 no-scrollbar border-t border-[#222E35]">
            {quickChips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => sendMessage(c)}
                className="shrink-0 rounded-full border border-[#2A3942] bg-[#202C33] px-2.5 py-1 text-[10px] font-bold text-[#D1D7DB] transition hover:bg-[#005C4B] hover:text-white cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputValue);
            }}
            className="flex items-center gap-2 bg-[#202C33] p-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type in Hindi, Hinglish or English..."
              className="flex-1 rounded-xl bg-[#2A3942] px-3 py-2 text-xs text-white placeholder-[#8696a0] focus:outline-none focus:ring-1 focus:ring-[#00A884]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="grid h-9 w-9 place-items-center rounded-xl bg-[#00A884] text-white transition hover:bg-[#008f72] disabled:opacity-40 cursor-pointer"
            >
              ➔
            </button>
          </form>
        </div>
      )}
    </>
  );
}
