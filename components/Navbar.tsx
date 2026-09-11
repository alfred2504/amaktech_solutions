"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-navbar">
      <div className="container site-navbar-inner">

        {/* LOGO */}
        <Link href="/" className="site-brand">
          <img
            src="/images/brand-logo.png"
            alt="AmakTech Solutions"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="site-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}

          <Link href="/ai-assistant" className="site-nav-ai">
            AI Assistant
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="btn btn-primary site-navbar-cta"
        >
          Get Started
        </Link>

        {/* MOBILE HAMBURGER */}
        <button
          className="site-navbar-toggle"
          type="button"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      <div className={`site-mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <nav className="site-mobile-nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/ai-assistant" className="site-mobile-ai" onClick={() => setMobileOpen(false)}>
            AI Assistant
          </Link>
        </nav>
      </div>
    </header>
  );
}