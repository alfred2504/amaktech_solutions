import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Technologies", href: "/technologies" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
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

      </div>
    </header>
  );
}