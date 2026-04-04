"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Shield,
  Search,
  Calendar,
  Globe,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("header.nav.specializations"), href: "/specializations" },
    { name: t("header.nav.doctors"), href: "/doctors" },
    { name: t("header.nav.services"), href: "/services" },
    { name: t("header.nav.about"), href: "/about" },
    { name: t("header.nav.contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-10 lg:gap-14">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center gap-3.5 group relative">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-6 transition-all duration-500">
              <Shield className="w-6.5 h-6.5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-foreground leading-none">
                {t("header.logo")}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mt-1 leading-none">
                {t("header.logoSuffix")}
              </span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 ml-10 xl:ml-14">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative text-[13px] font-black uppercase tracking-[0.15em] transition-all hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3 pr-6 border-r border-border/50">
              {/* Language Switcher */}
              <div className="relative group mr-2">
                <button 
                  className="flex items-center gap-2 h-10 px-3 rounded-xl hover:bg-muted transition-colors text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary"
                >
                  <Globe className="w-4 h-4" />
                  {language === "hi" ? "HINDI" : "ENGLISH"}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
                   <button 
                    onClick={() => setLanguage("en")}
                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-primary/5 hover:text-primary ${language === "en" ? "text-primary bg-primary/5" : "text-muted-foreground"}`}
                   >
                     English
                   </button>
                   <button 
                    onClick={() => setLanguage("hi")}
                    className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-primary/5 hover:text-primary ${language === "hi" ? "text-primary bg-primary/5" : "text-muted-foreground"}`}
                   >
                     हिन्दी (Hindi)
                   </button>
                </div>
              </div>

               <button className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-all text-muted-foreground hover:text-primary hover:rotate-12">
                <Search className="w-5.5 h-5.5" strokeWidth={2.5} />
              </button>
            </div>
            
            <Link
              href="#book"
              className="flex items-center gap-3 h-12 px-7 rounded-2xl bg-primary-dark text-white text-xs font-black uppercase tracking-[0.15em] shadow-xl shadow-primary/10 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-white/10"
            >
              <Calendar className="w-4.5 h-4.5 text-primary" strokeWidth={3} />
              {t("header.book")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
          >
            {isMobileMenuOpen ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-border/50 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-10 space-y-8">
               <div className="flex items-center justify-between pb-6 border-b border-border/50">
                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Language</span>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setLanguage("en")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold ${language === "en" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                    >EN</button>
                    <button 
                      onClick={() => setLanguage("hi")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold ${language === "hi" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                    >HI</button>
                 </div>
               </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-black text-foreground hover:text-primary transition-colors tracking-tight flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                ))}
              </div>
              <div className="pt-8 border-t border-border/50">
                <Link
                  href="#book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-16 rounded-[2rem] bg-primary text-white font-bold flex items-center justify-center gap-4 shadow-2xl shadow-primary/20 uppercase tracking-[0.2em] text-xs"
                >
                  <Calendar className="w-5.5 h-5.5" strokeWidth={2.5} />
                  {t("header.book")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
