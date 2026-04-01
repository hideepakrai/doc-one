"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Heart,
  Calendar,
  User,
  Stethoscope,
  Brain,
  Baby,
  Bone,
  Eye,
  HeartPulse,
  Shield,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const specializations = [
    { name: t("doctors.filters")[1], icon: HeartPulse, description: "Heart & cardiovascular care" },
    { name: t("doctors.filters")[2], icon: Brain, description: "Brain & nervous system" },
    { name: t("doctors.filters")[3], icon: Baby, description: "Children's health" },
    { name: t("doctors.filters")[4], icon: Bone, description: "Bones & joints" },
    { name: "Ophthalmology", icon: Eye, description: "Eye care & vision" },
    { name: "General Medicine", icon: Stethoscope, description: "Primary healthcare" },
  ];

  const navLinks = [
    { name: t("header.nav.specializations"), href: "#specializations", hasMega: true },
    { name: t("header.nav.doctors"), href: "#doctors", hasMega: false },
    { name: t("header.nav.services"), href: "#services", hasMega: false },
    { name: t("header.nav.about"), href: "#about", hasMega: false },
    { name: t("header.nav.contact"), href: "#contact", hasMega: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              {t("header.logo")}<span className="text-primary">{t("header.logoSuffix")}</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMega && setMegaMenuOpen(true)}
                onMouseLeave={() => link.hasMega && setMegaMenuOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                >
                  {link.name}
                  {link.hasMega && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Mega Menu */}
                {link.hasMega && (
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="bg-card rounded-2xl shadow-2xl border border-border p-6 w-[600px]">
                          <div className="grid grid-cols-2 gap-3">
                            {specializations.map((spec) => (
                              <Link
                                key={spec.name}
                                href={`#${spec.name.toLowerCase()}`}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                              >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <spec.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{spec.name}</p>
                                  <p className="text-sm text-muted-foreground">{spec.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-border">
                            <Link
                              href="#all-specializations"
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              View all specializations
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-sm font-medium hover:bg-muted/80 transition-colors mr-2"
            >
              <Languages className="w-4 h-4" />
              <span>{language === "en" ? "हिंदी" : "English"}</span>
            </button>

            {/* Search */}
            <div className="relative hidden sm:block">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 40 }}
                    animate={{ width: 280 }}
                    exit={{ width: 40 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder={t("header.searchPlaceholder")}
                      className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSearchOpen(true)}
                    className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites */}
            <button className="hidden sm:flex w-10 h-10 rounded-xl bg-muted items-center justify-center hover:bg-muted/80 transition-colors relative">
              <Heart className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* User */}
            <button className="hidden sm:flex w-10 h-10 rounded-xl bg-muted items-center justify-center hover:bg-muted/80 transition-colors">
              <User className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Book Appointment CTA */}
            <Link
              href="#book"
              className="hidden md:flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {t("header.book")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("header.searchPlaceholder")}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              {/* Mobile Nav Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">{link.name}</span>
                    {link.hasMega && <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors">
                  <User className="w-5 h-5" />
                  {t("header.signIn")}
                </button>
                <Link
                  href="#book"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
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
