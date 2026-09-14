"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const suggestions = [
  {
    title: "I need a website",
    description: "Discuss a website for my business or organisation",
  },
  {
    title: "I need a professional CV",
    description: "Create or improve my CV or resume",
  },
  {
    title: "I need business branding",
    description: "Build a professional visual identity",
  },
  {
    title: "I have a software idea",
    description: "Explore a custom software or digital product",
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to AmakTech Solutions. I'm here to help you identify the right digital or creative solution for your needs. Tell me what you're looking to create, improve, or achieve.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message?: string) {
    const text = (message ?? input).trim();

    if (!text || loading) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to process request.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      const errorText =
        error instanceof Error
          ? error.message
          : "The AmakTech AI Assistant is temporarily unavailable. Please try again or contact us on WhatsApp.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: errorText,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="ai-assistant">
      {/* Header */}
      <div className="ai-assistant-header">
        <div className="ai-brand">
          <div className="ai-logo">
            <span>AM</span>
          </div>

          <div>
            <strong>AmakTech AI</strong>
            <span>
              <i className="ai-status-dot" />
              Online assistant
            </span>
          </div>
        </div>

        <div className="ai-header-label">
          <span>AI CONSULTATION</span>
        </div>
      </div>

      {/* Intro */}
      <div className="ai-assistant-intro">
        <span className="ai-intro-label">LET'S GET STARTED</span>

        <h2>
          Tell us what you&apos;re
          <br />
          <span>trying to achieve.</span>
        </h2>

        <p>
          Describe your idea, challenge, or project. Our AI Assistant will
          help you understand which AmakTech solution may be the right fit.
        </p>
      </div>

      {/* Conversation */}
      <div className="ai-conversation">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`ai-message-row ${message.role}`}
          >
            {message.role === "assistant" && (
              <div className="ai-message-avatar">AM</div>
            )}

            <div className="ai-message">
              <span className="ai-message-label">
                {message.role === "assistant" ? "AMAKTECH AI" : "YOU"}
              </span>

              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="ai-message-row assistant">
            <div className="ai-message-avatar">AM</div>

            <div className="ai-message ai-thinking">
              <span className="ai-message-label">AMAKTECH AI</span>

              <div className="ai-thinking-content">
                <span />
                <span />
                <span />
                <em>Reviewing your request...</em>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length === 1 && !loading && (
        <div className="ai-suggestions">
          <div className="ai-suggestions-heading">
            <span>QUICK START</span>
            <p>Choose an option or describe your project below.</p>
          </div>

          <div className="ai-suggestions-grid">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.title}
                type="button"
                onClick={() =>
                  sendMessage(`${suggestion.title}. ${suggestion.description}`)
                }
              >
                <strong>{suggestion.title}</strong>
                <span>{suggestion.description}</span>
                <b>→</b>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form className="ai-input-area" onSubmit={handleSubmit}>
        <div className="ai-input-wrapper">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe what you'd like AmakTech to help you with..."
            rows={1}
            maxLength={2000}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <span>Send</span>
            <b>→</b>
          </button>
        </div>

        <div className="ai-input-footer">
          <span>AmakTech AI can help identify the right service for you.</span>
          <span>{input.length}/2000</span>
        </div>
      </form>

      {/* Bottom CTA */}
      <div className="ai-direct-contact">
        <div>
          <strong>Prefer to speak with our team?</strong>
          <span>
            You can contact AmakTech directly and discuss your project with us.
          </span>
        </div>

        <div className="ai-contact-actions">
          <a
            href="https://wa.me/263716997735"
            target="_blank"
            rel="noreferrer"
            className="ai-whatsapp-button"
          >
            WhatsApp us
          </a>

          <Link href="/contact" className="ai-contact-button">
            Contact page
          </Link>
        </div>
      </div>
    </div>
  );
}