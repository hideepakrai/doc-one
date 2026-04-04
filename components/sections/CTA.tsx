"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function CTA() {
  const { t, language } = useLanguage();

  return (
    <section id="book" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary via-[#0d5c5c] to-[#0a2e2e] shadow-2xl shadow-primary/20"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>

          <div className="relative px-8 py-20 sm:p-20 lg:p-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-left">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/10 backdrop-blur-md">
                    {language === "hi" ? "संपर्क में रहें" : "Connect With Us"}
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white mb-8 text-balance leading-[1.1]">
                    {language === "hi" ? "अपने स्वास्थ्य की दिशा में अगला कदम उठाने के लिए तैयार हैं?" : "Ready to take the next step in your health journey?"}
                  </h2>
                  <p className="text-xl text-white/70 mb-10 leading-relaxed font-medium max-w-xl">
                    {language === "hi" 
                      ? "आज ही अपना अपॉइंटमेंट बुक करें और स्वास्थ्य सेवा का अनुभव करें - व्यक्तिगत, सुलभ और असाधारण।" 
                      : "Book your appointment today and experience healthcare the way it should be — personalized, accessible, and exceptional."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="#schedule"
                        className="group flex items-center justify-center gap-3 h-16 px-10 rounded-2xl bg-white text-[#0a2e2e] font-bold shadow-xl shadow-black/10 hover:shadow-white/20 transition-all"
                      >
                        <Calendar className="w-5.5 h-5.5 text-primary" strokeWidth={2.5} />
                        {language === "hi" ? "अभी बुक करें" : "Schedule Online"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`tel:${t("footer.phone")}`}
                        className="flex items-center justify-center gap-3 h-16 px-10 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
                      >
                        <Phone className="w-5.5 h-5.5 text-accent" strokeWidth={2.5} />
                        {language === "hi" ? "कॉल करें" : "Call Us Now"}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Right Content - Quick Info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-white/10 flex items-center justify-center shadow-inner">
                      <Clock className="w-8 h-8 text-emerald-400" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {language === "hi" ? "कार्य के घंटे" : "Working Hours"}
                      </h4>
                      <div className="space-y-1 font-medium">
                        <p className="text-white/60">
                          {language === "hi" ? "सोम - शनि: सुबह 9:00 - रात 9:00" : "Mon - Sat: 9:00 AM - 9:00 PM"}
                        </p>
                        <p className="text-white/60">
                          {language === "hi" ? "रवि: सुबह 10:00 - शाम 4:00" : "Sun: 10:00 AM - 4:00 PM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 }}
                   className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-accent/20 flex items-center justify-center shadow-inner">
                      <Phone className="w-8 h-8 text-accent" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {language === "hi" ? "आपातकालीन नंबर" : "Emergency Line"}
                      </h4>
                      <p className="text-white/60 font-medium mb-1">{language === "hi" ? "24/7 उपलब्ध" : "Available 24/7"}</p>
                      <p className="text-2xl font-bold text-white tracking-widest bg-white/10 px-3 py-1 rounded-lg inline-block">
                        {t("footer.phone")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.6 }}
                   className="flex items-center gap-5 pt-6 pl-2"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-[#0a2e2e] flex items-center justify-center shadow-lg backdrop-blur-md"
                      >
                        <span className="text-[10px] text-white font-bold uppercase">
                          Care
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/50 font-bold uppercase tracking-widest">
                    {language === "hi" ? "600+ रोगियों की सेवा की" : "600+ patients served this month"}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
