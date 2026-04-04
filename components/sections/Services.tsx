"use client";

import { motion } from "framer-motion";
import { 
  Heart, Brain, Baby, Activity, Eye, ShieldCheck, 
  Stethoscope, Microscope, Search, ArrowRight 
} from "lucide-react";
import * as Icons from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";

export default function Services() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
        try {
            const res = await fetch("/api/specializations");
            const data = await res.json();
            if (Array.isArray(data)) {
                setServices(data.slice(0, 4)); // Only show top 4 services on homepage grid
            }
        } catch (err) {
            console.error("Failed to fetch services:", err);
        } finally {
            setIsLoading(false);
        }
    }
    fetchServices();
  }, []);

  const colorPalette = [
    { bg: "bg-red-500/10", text: "text-red-600" },
    { bg: "bg-blue-500/10", text: "text-blue-600" },
    { bg: "bg-pink-500/10", text: "text-pink-600" },
    { bg: "bg-amber-500/10", text: "text-amber-600" },
    { bg: "bg-emerald-500/10", text: "text-emerald-600" },
  ];

  const benefits = [
    { 
        title: language === "hi" ? "24/7 आपातकालीन सेवा" : "24/7 Emergency Care", 
        desc: language === "hi" ? "हमेशा आपकी सेवा के लिए तैयार।" : "Advanced trauma care available around the clock.",
        icon: Stethoscope
    },
    { 
        title: language === "hi" ? "आधुनिक लैब" : "Modern Diagnostic Lab", 
        desc: language === "hi" ? "सटीक और तेज़ परिणाम।" : "Equipped with the latest automated diagnostic technology.",
        icon: Microscope
    },
    { 
        title: language === "hi" ? "विशेषज्ञ डॉक्टर" : "Qualified Specialists", 
        desc: language === "hi" ? "दशकों का सामूहिक अनुभव।" : "Our team brings decades of combined clinical experience.",
        icon: ShieldCheck
    }
  ];

  return (
    <section id="services" className="py-24 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4 border border-primary/20"
          >
            {language === "hi" ? "विश्व स्तरीय सेवाएं" : "World-Class Services"}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-serif font-medium mb-6 leading-tight">
            {language === "hi" ? "आपकी भलाई हमारी प्राथमिकता" : "Your wellbeing is our priority"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {language === "hi" 
              ? "हम आधुनिक तकनीक और दयालु देखभाल के साथ व्यापक स्वास्थ्य सेवाएं प्रदान करते हैं।" 
              : "We provide comprehensive medical services using modern technology and compassionate care across various specialities."}
          </p>
        </div>

        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-[400px] bg-card/60 animate-pulse rounded-[2.5rem] border border-border/50" />
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {services.map((service, index) => {
                const IconComponent = (Icons as any)[service.icon] || Icons.Heart;
                const colors = colorPalette[index % colorPalette.length];
                return (
                    <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group flex flex-col h-full"
                    >
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                        <IconComponent className={`w-8 h-8 ${colors.text}`} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-muted-foreground text-sm font-medium mb-8 leading-relaxed flex-1 italic opacity-80">
                        "{service.description}"
                    </p>
                    <ul className="space-y-4 mb-8">
                        {(service.features && service.features.length > 0 ? service.features : 
                           (language === "hi" ? ["24/7 सहायता", "सटीक डायग्नोस्टिक्स", "विशेषज्ञ टीम"] : ["24/7 Clinical Support", "SLA Certified Performance", "Specialized Care Teams"]))
                                .slice(0, 3).map((feature: string) => (
                        <li key={feature} className="flex items-start gap-3 group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                            <span className="text-sm font-bold text-foreground/70">{feature}</span>
                        </li>
                        ))}
                    </ul>
                    <motion.button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group/btn mt-auto">
                        {language === "hi" ? "विवरण देखें" : "View Details"}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" strokeWidth={3} />
                    </motion.button>
                    </motion.div>
                );
            })}
            </div>
        )}

        {/* Improved Clinical Trust Area */}
        <div className="pt-20 border-t border-border/50">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {benefits.map((benefit, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex flex-col items-center text-center p-8 rounded-[2.5rem] hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:border-primary/30 transition-all rotate-3 group-hover:rotate-0">
                        <benefit.icon className="w-7 h-7 text-primary/60 group-hover:text-primary transition-all" />
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 text-foreground/80">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-[200px]">{benefit.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
