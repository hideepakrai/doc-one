"use client";

import PageHero from "@/components/ui/PageHero";
import SpecializationsList from "@/components/sections/Specializations";
import { useLanguage } from "@/lib/LanguageContext";

export default function AllSpecializationsPage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col">
      <PageHero 
        title={t("header.nav.specializations")}
        description={language === "hi" 
          ? "हर स्वास्थ्य आवश्यकता के लिए हमारी पूरी चिकित्सा विशेषज्ञता और विभाग।" 
          : "Discover our full range of medical expertise and specialized departments dedicated to your health."}
        badge={language === "hi" ? "चिकित्सा विभाग" : "Medical Disciplines"}
      />
      
      <SpecializationsList />
    </div>
  );
}
