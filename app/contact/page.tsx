"use client";

import PageHero from "@/components/ui/PageHero";
import ContactSection from "@/components/sections/Contact";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col">
      <PageHero 
        title={language === "hi" ? "हम आपकी मदद के लिए यहाँ हैं" : "We're here to help"}
        description={language === "hi" 
          ? "किसी भी प्रश्न या शेड्यूलिंग सहायता के लिए हमारी नैदानिक सहायता टीम से संपर्क करें।" 
          : "Reach out to our clinical support team for any inquiries or scheduling assistance."}
        badge={t("header.nav.contact")}
      />
      
      <ContactSection />
    </div>
  );
}
