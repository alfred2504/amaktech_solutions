"use client";

import { useState } from "react";
import Link from "next/link";

const suggestions = [
  "What services does AmakTech offer?",
  "I need a professional CV.",
  "I need a website for my business.",
  "Can you help me build software?",
  "I need an AI solution.",
];

export default function AIAssistantPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text:
        "Hello! I'm the AmakTech Assistant. I can help you explore our services, understand what solution you may need, and prepare you for starting a project.",
    },
  ]);

  function sendMessage(text = message) {
    const trimmed = text.trim();

    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: trimmed,
      },
      {
        role: "assistant",
        text:
          "Thanks for sharing that. Our AI assistant will soon be connected to AmakTech's knowledge base so it can provide detailed recommendations and help prepare your project requirements.",
      },
    ]);

    setMessage("");
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="section-label">AMAKTECH AI</span>

          <h1>
            Your intelligent
            <span> digital assistant.</span>
          </h1>

          <p>
            Ask questions about AmakTech services, explore technology
            solutions, or get guidance on what type of digital solution may
            suit your needs.
          </p>
        </div>
      </section>

      <section className="section ai-page-section">
        <div className="container">
          <div className="ai-chat">
            <div className="ai-chat-header">
              <div className="ai-avatar">AM</div>

              <div>
                <strong>AmakTech Assistant</strong>
                <span>Digital Solutions Assistant</span>
              </div>
            </div>

            <div className="ai-chat-body">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`ai-message ${
                    item.role === "user"
                      ? "ai-message-user"
                      : "ai-message-assistant"
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <div className="ai-suggestions">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="ai-input-area">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask AmakTech something..."
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => sendMessage()}
              >
                Send
              </button>
            </div>
          </div>

          <div className="ai-page-footer">
            <p>
              Need to speak to the team directly?
            </p>

            <Link href="/contact" className="text-link">
              Start a project with AmakTech →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}