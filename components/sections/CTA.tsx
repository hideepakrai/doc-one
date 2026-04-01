"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function CTA() {
  const { t, language } = useLanguage();

  return (
    <section id="book" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-primary"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative px-8 py-16 sm:p-16 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-primary-foreground mb-6"
                >
                  {language === "hi" 
                    ? "अपने स्वास्थ्य की दिशा में अगला कदम उठाने के लिए तैयार हैं?" 
                    : "Ready to take the next step in your health journey?"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-primary-foreground/80 mb-8"
                >
                  {language === "hi" 
                    ? "आज ही अपना अपॉइंटमेंट बुक करें और स्वास्थ्य सेवा का अनुभव वैसा ही करें जैसा उसे होना चाहिए - व्यक्तिगत, सुलभ और असाधारण।" 
                    : "Book your appointment today and experience healthcare the way it should be — personalized, accessible, and exceptional."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="#schedule"
                    className="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                    {language === "hi" ? "ऑनलाइन अपॉइंटमेंट" : "Schedule Online"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="tel:+919812345678"
                    className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {language === "hi" ? "अभी कॉल करें" : "Call Us Now"}
                  </Link>
                </motion.div>
              </div>

              {/* Right Content - Quick Info */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                      <Clock className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-primary-foreground">
                        {language === "hi" ? "कार्य के घंटे" : "Working Hours"}
                      </h4>
                      <p className="text-primary-foreground/70">
                        {language === "hi" ? "सोम - शनि: सुबह 9:00 - रात 9:00" : "Mon - Sat: 9:00 AM - 9:00 PM"}
                      </p>
                      <p className="text-primary-foreground/70">
                        {language === "hi" ? "रवि: सुबह 10:00 - शाम 4:00" : "Sun: 10:00 AM - 4:00 PM"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                      <Phone className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-primary-foreground">
                        {language === "hi" ? "आपातकालीन नंबर" : "Emergency Line"}
                      </h4>
                      <p className="text-primary-foreground/70">{language === "hi" ? "24/7 उपलब्ध" : "Available 24/7"}</p>
                      <p className="text-xl font-semibold text-primary-foreground">
                        +91 11 2614 1234
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary flex items-center justify-center"
                      >
                        <span className="text-xs text-primary-foreground font-medium">
                          {i}K+
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-primary-foreground/80">
                    {language === "hi" ? "मरीजों की इस महीने सेवा की" : "patients served this month"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
