# 🗣️ TalkTranslate (or LucidSpeak, etc.)

> Speak freely. We'll turn it into clear, professional English — no matter how messy it starts.

TalkTranslate is an AI-powered voice-to-text web app that helps users — especially non-native English speakers — turn unstructured or emotional speech into polished, polite, and client-ready messages.

Whether you're speaking in Urdu, English, or switching mid-sentence... even if you're ranting, stumbling, or using slang — TalkTranslate listens, understands your intent, and rewrites it into something you’d actually want to send.

---

## ✨ Features

- 🎙️ **Voice Input** — Record directly from your browser.
- 🌍 **Multilingual Support** — Speak in any language (especially Urdu/English mix).
- 💬 **Natural Translation** — Converts informal, chaotic speech into clear, professional English.
- 🧠 **Emotionally Aware** — Keeps tone intact when necessary (e.g. apologies, urgency, frustration).
- 🛑 **Profanity Handling** — Rewrites harsh or inappropriate language into assertive, respectful phrasing.
- 🔁 **Usage Limiter** — Free plan includes 5 uses per day (tracked in localStorage).

---

## 🚀 How It Works

1. User records a short voice message.
2. Audio is transcribed using **OpenAI Whisper**.
3. The transcript is passed to **GPT-4o**, which rewrites it into clean, polite English.
4. The result is displayed in 3 versions:
   - Raw transcription
   - Basic translation
   - Final "Plain English" version

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS** for UI
- **OpenAI Whisper** for transcription
- **GPT-4o** for intelligent message rewriting
- **TypeScript** throughout
- **Lucide Icons** for clean, modern icons

---

## 📦 Installation

```bash
git clone https://github.com/your-username/talktranslate.git
cd talktranslate
npm install
npm run dev
