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
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = {
    columnOne: [
      { name: language === "hi" ? "डॉक्टर खोजें" : "Find a Doctor", href: "#doctors" },
      { name: language === "hi" ? "विशेषज्ञता" : "Specializations", href: "#specializations" },
      { name: t("header.book"), href: "#book" },
      { name: language === "hi" ? "हमारे स्थान" : "Our Locations", href: "#contact" },
      { name: language === "hi" ? "पेशेंट पोर्टल" : "Patient Portal", href: "#portal" },
    ],
    columnTwo: [
      { name: language === "hi" ? "हमारे बारे में" : "About Us", href: "#about" },
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
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium mb-4">
                {language === "hi" ? "अपने स्वास्थ्य के बारे में सूचित रहें" : "Stay informed about your health"}
              </h3>
              <p className="text-background/70 text-lg">
                {language === "hi" 
                  ? "स्वास्थ्य युक्तियों, नई सेवाओं और विशेष प्रस्तावों के लिए हमारे न्यूज़लेटर की सदस्यता लें।" 
                  : "Subscribe to our newsletter for health tips, new services, and exclusive offers."}
              </p>
            </div>
            <div>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-background/10 rounded-2xl p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-xl font-medium mb-2">
                    {language === "hi" ? "सदस्यता लेने के लिए धन्यवाद!" : "Thank you for subscribing!"}
                  </p>
                  <p className="text-background/70">
                    {language === "hi" 
                      ? "आपको हमारे नवीनतम अपडेट अपने इनबॉक्स में प्राप्त होंगे।" 
                      : "You'll receive our latest updates in your inbox."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-background/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === "hi" ? "अपना ईमेल पता दर्ज करें" : "Enter your email address"}
                      className="w-full h-14 pl-12 pr-4 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-14 px-8 rounded-xl bg-accent text-accent-foreground font-medium flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
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

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                {t("header.logo")}<span className="text-accent">{t("header.logoSuffix")}</span>
              </span>
            </Link>
            <p className="text-background/70 mb-6 leading-relaxed">
              {language === "hi" 
                ? "नवाचार, करुणा और उत्कृष्टता के माध्यम से असाधारण स्वास्थ्य अनुभव प्रदान करना।" 
                : "Delivering exceptional healthcare experiences through innovation, compassion, and excellence."}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5" />
                <span>{t("footer.phone")}</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5" />
                <span>{t("footer.email")}</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-semibold mb-6">{language === "hi" ? "त्वरित लिंक" : "Quick Links"}</h4>
            <ul className="space-y-4">
              {footerLinks.columnOne.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-semibold mb-6">{language === "hi" ? "कंपनी" : "Company"}</h4>
            <ul className="space-y-4">
              {footerLinks.columnTwo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Certifications */}
          <div>
            <h4 className="font-semibold mb-6">{language === "hi" ? "हमसे जुड़ें" : "Connect With Us"}</h4>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm text-background/50">{language === "hi" ? "प्रमाणन" : "Certifications"}</p>
              <div className="flex gap-3">
                <div className="px-3 py-2 rounded-lg bg-background/10 text-xs font-medium">
                  {language === "hi" ? "NABH प्रमाणित" : "NABH Accredited"}
                </div>
                <div className="px-3 py-2 rounded-lg bg-background/10 text-xs font-medium">
                  ISO 9001:2015
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} {t("header.logo")}{t("header.logoSuffix")}. {language === "hi" ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <Link href="#privacy" className="hover:text-background transition-colors">
                {language === "hi" ? "गोपनीयता" : "Privacy"}
              </Link>
              <Link href="#terms" className="hover:text-background transition-colors">
                {language === "hi" ? "शर्तें" : "Terms"}
              </Link>
              <Link href="#accessibility" className="hover:text-background transition-colors">
                {language === "hi" ? "पहुंच क्षमता" : "Accessibility"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
