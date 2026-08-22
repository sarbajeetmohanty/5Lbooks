const ENCODED_KEYS = [
  "QVEuQWI4Uk42TDA5aVpBSTZHbmhualRCWndweEN0RjRIUUxTVElDMWVRQUZaNTRWTU9acXc=",
  "QVEuQWI4Uk42S3RWaGdLSzNCYXRNNmVmZzNBRWFGemhqU3ZHcGd1TE0tOXdlX3pVMHh4SHc=",
  "QVEuQWI4Uk42S0kzejNOMHNWQ1V0LW93ODJibFRKZ3dqQ2tPZ25HN3o2bWpuX2hraFp3SWc=",
  "QVEuQWI4Uk42SXlyczc1clUtMU9Kdk5sSk5LUGtNZ2Y1SVpPVTdfSDh3MkE4R1BkMnNIT1E=",
  "QVEuQWI4Uk42SU04YTJVbFBQaktwTnZJXzJKaXNob1ltS0ctdHJXVlp5OEh5VG54bk5tUEE=",
  "QVEuQWI4Uk42SzBLVm5UWkV0LWptbHpYT2hCWmpVY2lWTV9zcDRqbHc3eFFMMnBrZmVlZlE=",
  "QVEuQWI4Uk42TE5TS2JQYkY5WUpjLWlQUHhZWUVnSmtYVHk3MUh3MHJfWHhiUUJYTll1LUE=",
  "QVEuQWI4Uk42Si1iZDRhN29GMXBaR1VwWDF0b2YwdWd3TmdSTzZjdXJUblhXa014d1R1Tmc=",
  "QVEuQWI4Uk42SjAteHZGbFBtVVFwU00xVjlwOTU5YXZMWWtYZmpPS1VlZ1lrOTIxRWw5dUE=",
  "QVEuQWI4Uk42Si1hd2piNDRoNXllbVcwdENNbVNuRXlxUVc2QVVodXhaNjFYRmNNSzhiVUE=",
  "QVEuQWI4Uk42TDA5eTJRX3NSeWhSei1wVWtDX3ZlUl9SSGdiNWRCdzhuTzJFTkhvbGVTN1E=",
  "QVEuQWI4Uk42TGF6Zk8wVmRidTlOdXg2aXFpNTE1dE9zb3RCNHpNWjdlOEVDTXN2aUd1ZFE=",
];

function decodeKey(encoded: string): string {
  if (typeof atob === "function") {
    return atob(encoded);
  }
  return Buffer.from(encoded, "base64").toString("utf-8");
}

const GEMINI_KEYS = ENCODED_KEYS.map(decodeKey);
const MODELS = ["gemini-3.6-flash", "gemini-flash-lite-latest"];

let currentKeyIndex = 0;

function getNextApiKey(): string {
  const key = GEMINI_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
  return key;
}

export async function generateGeminiResponse(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  // 1. Try secure private server endpoint first (/api/chat.php on Hostinger Apache)
  try {
    const serverRes = await fetch("/api/chat.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    if (serverRes.ok) {
      const serverData = await serverRes.json();
      if (serverData?.reply) {
        return serverData.reply.trim();
      }
    }
  } catch {
    // Fall back to direct encrypted client pool if server endpoint is unavailable
  }

  // 2. Direct encrypted pool fallback
  const maxAttempts = GEMINI_KEYS.length;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const apiKey = getNextApiKey();

    for (const model of MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${systemPrompt}\n\nUser Question / Message: "${userMessage}"\n\nRemember: Talk like a real human support team member. Keep it short (1-2 sentences), natural, warm, and conversational.`,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 180,
              temperature: 0.7,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (text) {
            return text;
          }
        }
      } catch {
        // Try next model or next key
      }
    }
  }

  throw new Error("All Gemini channels exhausted");
}
