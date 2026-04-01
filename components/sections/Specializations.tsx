"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Specializations() {
  const { t, language } = useLanguage();
  const [specializations, setSpecializations] = useState([]);
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
    "bg-red-500/10 text-red-600",
    "bg-blue-500/10 text-blue-600",
    "bg-pink-500/10 text-pink-600",
    "bg-amber-500/10 text-amber-600",
    "bg-cyan-500/10 text-cyan-600",
    "bg-emerald-500/10 text-emerald-600",
    "bg-violet-500/10 text-violet-600",
    "bg-slate-500/10 text-slate-600",
  ];

  return (
    <section id="specializations" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {language === "hi" ? "हमारी विशेषज्ञता" : "Our Expertise"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            {language === "hi" ? "हर जरूरत के लिए विशेष देखभाल" : "Specialized care for every need"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hi" 
              ? "विशेषज्ञों की हमारी टीम चिकित्सा विषयों की एक विस्तृत श्रृंखला को कवर करती है, यह सुनिश्चित करती है कि आपको आपकी विशिष्ट स्वास्थ्य आवश्यकताओं के अनुरूप विशेषज्ञ देखभाल मिले।" 
              : "Our team of specialists covers a wide range of medical disciplines, ensuring you receive expert care tailored to your specific health needs."}
          </p>
        </motion.div>

        {/* Specializations Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[250px] bg-card/60 animate-pulse rounded-2xl border border-border" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specializations.map((spec: any, index: number) => {
              // Dynamically get the icon component or default to HelpCircle
              const IconComponent = (Icons as any)[spec.icon] || Icons.HelpCircle;
              const color = colorPalette[index % colorPalette.length];

              return (
                <motion.div
                  key={spec._id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link
                    href={`#${spec.name.toLowerCase()}`}
                    className="block h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-5`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {spec.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {spec.doctorCount} {language === "hi" ? "डॉक्टर" : "Doctors"}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
          className="text-center mt-12"
        >
          <Link
            href="#all-specializations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            {language === "hi" ? "सभी विशेषज्ञता देखें" : "View All Specializations"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
