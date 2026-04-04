"use client";

import PageHero from "@/components/ui/PageHero";
import ServicesList from "@/components/sections/Services";
import { useLanguage } from "@/lib/LanguageContext";

export default function ServicesPage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col">
      <PageHero 
        title={t("header.nav.services")}
        description={language === "hi" 
          ? "आपकी गुणवत्तापूर्ण स्वास्थ्य देखभाल के लिए समर्पित व्यापक चिकित्सा सेवाएं।" 
          : "Comprehensive medical services dedicated to providing you with the highest quality of care and clinical excellence."}
        badge={language === "hi" ? "हमारी सेवाएँ" : "Our Services"}
      />
      
      <ServicesList />
    </div>
  );
}
