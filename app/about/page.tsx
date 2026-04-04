"use client";

import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import { Shield, Sparkles, HeartPulse, Building2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { t, language } = useLanguage();
  
  const whyChooseUs = (t("footer.about.whyChooseUs.items") as any[]) || [
    { title: "Expert Specialists", desc: "Board-certified doctors with decades of combined experience." },
    { title: "Advanced Technology", desc: "Equipped with state-of-the-art diagnostic and surgical equipment." },
    { title: "Compassionate Care", desc: "A patient-first approach that ensures comfort and trust." },
    { title: "Comprehensive Services", desc: "A wide range of specializations all under one roof." }
  ];
  
  const whyIcons = [Shield, Sparkles, HeartPulse, Building2];

  return (
    <div className="flex flex-col">
      <PageHero 
        title={language === "hi" ? "असाधारण स्वास्थ्य सेवा सभी के लिए" : "Exceptional healthcare for everyone"}
        description={t("footer.about.description")}
        badge={language === "hi" ? "मेडीकेयर क्लीनिक के बारे में" : "About MediCareClinic"}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-medium leading-tight">
                {language === "hi" 
                  ? "बेहतर चिकित्सा विशेषज्ञता और दयालु देखभाल के माध्यम से जीवन को सशक्त बनाना।" 
                  : "Empowering lives through superior medical expertise and compassionate care."}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {t("footer.about.introduction")}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-6">
                <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                   <h3 className="text-xl font-bold mb-4 text-primary">{t("footer.about.mission.title")}</h3>
                   <p className="text-muted-foreground font-medium">{t("footer.about.mission.text")}</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm">
                   <h3 className="text-xl font-bold mb-4">{t("footer.about.vision.title")}</h3>
                   <p className="text-muted-foreground font-medium">{t("footer.about.vision.text")}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative aspect-square rounded-[3rem] overflow-hidden"
            >
               <img 
                 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" 
                 alt="Clinic Interior" 
                 className="object-cover w-full h-full"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium mb-4">{t("footer.about.whyChooseUs.title")}</h2>
              <div className="w-20 h-1 bg-primary/20 mx-auto rounded-full" />
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => {
                 const Icon = whyIcons[index] || Shield;
                 return (
                    <motion.div
                       key={item.title}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: index * 0.1 }}
                       className="p-8 rounded-[2rem] bg-card border border-border hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-black/5"
                    >
                       <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                          <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                       </div>
                       <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                       <p className="text-muted-foreground font-medium text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                 );
              })}
           </div>
        </div>
      </section>
    </div>
  );
}
