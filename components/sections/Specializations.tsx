"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Specializations() {
  const { t, language } = useLanguage();
  const [specializations, setSpecializations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecializations() {
      try {
        const res = await fetch("/api/specializations");
        const data = await res.json();
        if (Array.isArray(data)) {
          setSpecializations(data);
        } else {
          console.error("Specializations data is not an array:", data);
          setSpecializations([]);
        }
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
        setSpecializations([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSpecializations();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Predefined colors to cycle through since the DB doesn't store colors
  const colorPalette = [
    "bg-emerald-500/10 text-emerald-600",
    "bg-blue-500/10 text-blue-600",
    "bg-violet-500/10 text-violet-600",
    "bg-amber-500/10 text-amber-600",
    "bg-cyan-500/10 text-cyan-600",
    "bg-rose-500/10 text-rose-600",
    "bg-indigo-500/10 text-indigo-600",
    "bg-slate-500/10 text-slate-600",
  ];

  return (
    <section id="specializations" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4 border border-primary/20"
          >
            {language === "hi" ? "हमारी विशेषज्ञता" : "Clinical Expertise"}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-serif font-medium mb-6 text-balance leading-tight">
            {language === "hi" ? "हर जरूरत के लिए विशेष देखभाल" : "Specialized care for every need"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {language === "hi" 
              ? "विशेषज्ञों की हमारी टीम चिकित्सा विषयों की एक विस्तृत श्रृंखला को कवर करती है, यह सुनिश्चित करती है कि आपको विशेषज्ञ देखभाल मिले।" 
              : "Our team of specialists covers a wide range of medical disciplines, ensuring you receive expert care tailored to your specific health needs."}
          </p>
        </motion.div>

        {/* Specializations Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[280px] bg-card/60 animate-pulse rounded-3xl border border-border/50" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {specializations.map((spec: any, index: number) => {
              const IconComponent = (Icons as any)[spec.icon] || Icons.HelpCircle;
              const color = colorPalette[index % colorPalette.length];

              return (
                <motion.div
                  key={spec._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link
                    href={`/specializations/${spec.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block h-full p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${color.replace(' text-', ' bg-').split(' ')[0]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                    >
                      <IconComponent className={`w-8 h-8 ${color.split(' ')[1]}`} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">
                      {spec.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium mb-6 line-clamp-2 leading-relaxed">
                      {spec.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1 rounded-lg">
                        {spec.doctorCount} {language === "hi" ? "डॉक्टर" : "Doctors"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary/10 flex items-center justify-center transition-all">
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" strokeWidth={3} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/specializations"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-border text-foreground font-bold hover:bg-muted transition-all shadow-sm hover:shadow-md"
            >
              {language === "hi" ? "सभी विशेषज्ञताएं देखें" : "View All Specializations"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
