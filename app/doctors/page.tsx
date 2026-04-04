"use client";

import PageHero from "@/components/ui/PageHero";
import DoctorsList from "@/components/sections/Doctors";
import { useLanguage } from "@/lib/LanguageContext";

export default function DoctorsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col">
      <PageHero 
        title={t("doctors.headline")}
        description={t("doctors.subheadline")}
        badge={t("doctors.badge")}
      />
      
      <DoctorsList />
    </div>
  );
}
