import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmakTech Solutions | Transforming Ideas into Digital Solutions",
  description:
    "AmakTech Solutions provides professional graphic design, digital branding, website development, software engineering and technology solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />

        {children}

        <footer className="footer">
          <div className="container footer-grid">
            <div>
              <img
                src="/images/brand-logo.png"
                alt="AmakTech Solutions"
                className="footer-logo"
              />

              <p>
                Transforming ideas into digital solutions.
              </p>
            </div>

            <div>
              <h4>Quick Links</h4>

              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div>
              <h4>Contact</h4>

              <a href="tel:+263716997735">
                +263 716 997 735
              </a>

              <a href="tel:+263782683072">
                +263 782 683 072
              </a>

              <a href="mailto:inforamaiv@gmail.com">
                amaktechsolution@gmail.com
              </a>
            </div>
          </div>

          <div className="container footer-bottom">
            <span>
              © {new Date().getFullYear()} AmakTech Solutions.
              All rights reserved.
            </span>

            <span>
              Creative Designs. Digital Solutions. Professional Results.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
