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

const footerLinks = {
  columnOne: [
    { name: "Find a Doctor", href: "#doctors" },
    { name: "Specializations", href: "#specializations" },
    { name: "Book Appointment", href: "#book" },
    { name: "Our Locations", href: "#locations" },
    { name: "Patient Portal", href: "#portal" },
  ],
  columnTwo: [
    { name: "About MediCare", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "News & Updates", href: "#news" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
                Stay informed about your health
              </h3>
              <p className="text-background/70 text-lg">
                Subscribe to our newsletter for health tips, new services, and exclusive offers.
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
                  <p className="text-xl font-medium mb-2">Thank you for subscribing!</p>
                  <p className="text-background/70">
                    {"You'll"} receive our latest updates in your inbox.
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
                      placeholder="Enter your email address"
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
                    Subscribe
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
                Medi<span className="text-accent">Care</span>
              </span>
            </Link>
            <p className="text-background/70 mb-6 leading-relaxed">
              Delivering exceptional healthcare experiences through innovation, compassion, and
              excellence.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5" />
                <span>contact@medicare.com</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5" />
                <span>123 Health Avenue, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
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
            <h4 className="font-semibold mb-6">Company</h4>
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
            <h4 className="font-semibold mb-6">Connect With Us</h4>
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
              <p className="text-sm text-background/50">Certifications</p>
              <div className="flex gap-3">
                <div className="px-3 py-2 rounded-lg bg-background/10 text-xs font-medium">
                  HIPAA Compliant
                </div>
                <div className="px-3 py-2 rounded-lg bg-background/10 text-xs font-medium">
                  ISO 27001
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
              © {new Date().getFullYear()} MediCare. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <Link href="#privacy" className="hover:text-background transition-colors">
                Privacy
              </Link>
              <Link href="#terms" className="hover:text-background transition-colors">
                Terms
              </Link>
              <Link href="#accessibility" className="hover:text-background transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
