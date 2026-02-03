import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-lime-500 p-4 text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="AmakTech Solutions Logo"
          className="h-16"
        />

        {/* Navigation */}
        <nav className="flex gap-6 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Subscribe Form (POST) */}
        <form
          action="https://formsubmit.co/inforamaiv@gmail.com"
          method="POST"
          className="flex gap-2"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="px-3 py-2 rounded text-black"
          />

          <button
            type="submit"
            className="bg-white text-lime-600 px-4 py-2 rounded font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
}