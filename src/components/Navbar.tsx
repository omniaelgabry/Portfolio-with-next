"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 glass border-b border-white/5" : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          PORT<span className="text-violet-500">FOLIO</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors hover:glow-text"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-purple">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-xs font-medium text-violet-100">Available for Work</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggle}
            aria-label="Toggle theme"
            className="clickable relative w-10 h-10 rounded-full glass flex items-center justify-center text-violet-400 hover:text-white hover:bg-violet-600/30 transition-all duration-300 border border-white/10 hover:border-violet-500/50 hover:shadow-[0_0_12px_rgba(139,92,246,0.4)]"
          >
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: theme === "dark" ? 1 : 0, transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)" }}
            >
              <Moon size={17} />
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: theme === "light" ? 1 : 0, transform: theme === "light" ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)" }}
            >
              <Sun size={17} />
            </span>
          </button>
        </div>

        {/* Mobile — Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            id="theme-toggle-mobile"
            onClick={toggle}
            aria-label="Toggle theme"
            className="clickable relative w-9 h-9 rounded-full glass flex items-center justify-center text-violet-400 transition-all duration-300"
          >
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: theme === "dark" ? 1 : 0, transform: theme === "dark" ? "scale(1)" : "scale(0)" }}
            >
              <Moon size={16} />
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: theme === "light" ? 1 : 0, transform: theme === "light" ? "scale(1)" : "scale(0)" }}
            >
              <Sun size={16} />
            </span>
          </button>
          <button
            className="text-white hover:text-violet-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-purple md:hidden flex flex-col py-6 px-6 gap-6 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-medium text-gray-200 hover:text-violet-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-4 py-3 mt-4 rounded-full glass self-start">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white">Available for Work</span>
          </div>
        </div>
      )}
    </nav>
  );
}
