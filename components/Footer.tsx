"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { t, language } = useLanguage();

  const footerLinks = {
    columnOne: [
      { name: t("header.nav.doctors"), href: "/doctors" },
      { name: t("header.nav.specializations"), href: "/specializations" },
      { name: t("header.book"), href: "/doctors" },
      { name: language === "hi" ? "हमारे स्थान" : "Our Locations", href: "/contact" },
      { name: language === "hi" ? "रोगी पोर्टल" : "Patient Portal", href: "#portal" },
    ],
    columnTwo: [
      { name: t("header.nav.about"), href: "/about" },
      { name: language === "hi" ? "करियर" : "Careers", href: "#careers" },
      { name: language === "hi" ? "समाचार और अपडेट" : "News & Updates", href: "#news" },
      { name: language === "hi" ? "गोपनीयता नीति" : "Privacy Policy", href: "#privacy" },
      { name: language === "hi" ? "सेवा की शर्तें" : "Terms of Service", href: "#terms" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer-gradient bg-primary-dark text-white/90 relative overflow-hidden">
        {/* Subtle Decorative Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      {/* Newsletter Section */}
      <div className="border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-serif font-medium mb-6 text-white leading-tight"
              >
                {language === "hi" ? "अपने स्वास्थ्य के बारे में सूचित रहें" : "Stay informed about your health"}
              </motion.h3>
              <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                {language === "hi" 
                  ? "स्वास्थ्य सुझावों, नई सेवाओं और विशेष प्रस्तावों के लिए हमारे न्यूज़लेटर की सदस्यता लें।" 
                  : "Subscribe to our newsletter for health tips, new services, and exclusive offers."}
              </p>
            </div>
            <div className="relative">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 text-center border border-white/10 shadow-2xl shadow-black/10"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/10">
                    <Mail className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-2xl font-bold mb-3 text-white">
                    {language === "hi" ? "सदस्यता के लिए धन्यवाद!" : "Thank you for subscribing!"}
                  </p>
                  <p className="text-white/60 font-medium">
                    {language === "hi" ? "आपको अपने इनबॉक्स में हमारे नवीनतम अपडेट प्राप्त होंगे।" : "You'll receive our latest updates in your inbox."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-white/30 group-focus-within:text-white transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === "hi" ? "अपना ईमेल पता दर्ज करें" : "Enter your email address"}
                      className="w-full h-18 pl-15 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-18 px-10 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                  >
                    {language === "hi" ? "सदस्यता लें" : "Subscribe"}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Brand Identity */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 mb-10 group">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-2xl shadow-black/20 group-hover:rotate-6 transition-transform duration-500">
                <Shield className="w-7 h-7 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-bold tracking-tight text-white leading-none">
                {t("header.logo")}<span className="text-primary-foreground opacity-60 ml-0.5">{t("header.logoSuffix")}</span>
              </span>
            </Link>
            <p className="text-white/50 mb-10 leading-relaxed font-medium text-lg">
              {t("footer.description")}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-5 text-white/70 hover:text-white transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="font-bold text-lg">{t("footer.phone")}</span>
              </div>
              <div className="flex items-center gap-5 text-white/70 hover:text-white transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <span className="font-bold text-lg">{t("footer.email")}</span>
              </div>
              <div className="flex items-start gap-5 text-white/70 hover:text-white transition-colors group pt-2 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium leading-relaxed pt-1 text-lg">{t("footer.address")}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:pl-8">
            <h4 className="text-white text-sm font-bold mb-10 uppercase tracking-[0.2em]">{language === "hi" ? "जल्द लिंक" : "Quick Links"}</h4>
            <ul className="space-y-6">
              {footerLinks.columnOne.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-primary font-bold text-sm transition-all flex items-center gap-4 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white text-sm font-bold mb-10 uppercase tracking-[0.2em]">{language === "hi" ? "कंपनी" : "Company"}</h4>
            <ul className="space-y-6">
              {footerLinks.columnTwo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-primary font-bold text-sm transition-all flex items-center gap-4 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Trusted Badges */}
          <div className="flex flex-col">
            <h4 className="text-white text-sm font-bold mb-10 uppercase tracking-[0.2em]">{language === "hi" ? "हमसे जुड़ें" : "Connect With Us"}</h4>
            <div className="flex gap-5 mb-12">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 hover:bg-primary hover:text-white hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
            <div className="mt-auto p-8 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-inner">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">{language === "hi" ? "प्रमाणपत्र" : "Certifications"}</p>
              <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary text-[12px] font-bold border border-primary/20 shadow-sm">
                  NABH Accredited
                </div>
                <div className="px-5 py-2.5 rounded-xl bg-white/5 text-white/40 text-[12px] font-bold border border-white/10 shadow-sm">
                  ISO 9001:2015
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                </div>
                <p className="text-white/30 text-sm font-medium">
                {t("footer.copyright")}
                </p>
            </div>
            <div className="flex items-center gap-10 text-sm font-bold text-white/30">
              <Link href="#privacy" className="hover:text-primary transition-colors uppercase tracking-[0.15em] text-[11px]">
                {language === "hi" ? "गोपनीयता" : "Privacy"}
              </Link>
              <span className="w-1.5 h-1.5 rounded-full bg-white/5" />
              <Link href="#terms" className="hover:text-primary transition-colors uppercase tracking-[0.15em] text-[11px]">
                {language === "hi" ? "नियम" : "Terms"}
              </Link>
              <span className="w-1.5 h-1.5 rounded-full bg-white/5" />
              <Link href="#accessibility" className="hover:text-primary transition-colors uppercase tracking-[0.15em] text-[11px]">
                {language === "hi" ? "पहुंच" : "Accessibility"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-gradient {
          background: linear-gradient(135deg, oklch(0.24 0.04 190) 0%, oklch(0.20 0.03 190) 100%);
        }
      `}</style>
    </footer>
  );
}
