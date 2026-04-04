"use client";

import { useParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import DoctorsList from "@/components/sections/Doctors";
import { useLanguage } from "@/lib/LanguageContext";
import CTA from "@/components/sections/CTA";

export default function SpecializationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t, language } = useLanguage();
  
  // Mapping slugs to localization keys
  const specData = t(`specializationPages.${slug}`);
  const specName = specData?.title || slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  const specDesc = specData?.description || "";
  
  // Mapping slug to actual filter name used in Doctors component
  const filterMap: Record<string, string> = {
    "cardiology": t("doctors.filters", "en")[1],
    "neurology": t("doctors.filters", "en")[2],
    "pediatrics": t("doctors.filters", "en")[3],
    "orthopedics": t("doctors.filters", "en")[4],
    "ophthalmology": t("doctors.filters", "en")[5],
    "general-medicine": t("doctors.filters", "en")[6]
  };
  
  const initialFilter = filterMap[slug] || specName;

  return (
    <div className="flex flex-col">
      <PageHero 
        title={specName}
        description={specDesc}
        badge={language === "hi" ? "विशेषज्ञता विभाग" : "Specialization Department"}
        parent={{ 
            name: language === "hi" ? "चिकित्सा विभाग" : "Specializations", 
            href: "/specializations" 
        }}
      />
      
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16">
              <h2 className="text-3xl font-serif font-medium mb-4">
                 {language === "hi" ? `हमारे ${specName} विशेषज्ञ` : `Our ${specName} Specialists`}
              </h2>
              <p className="text-muted-foreground font-medium text-lg max-w-2xl">
                 {language === "hi" 
                   ? `हमारे समर्पित चिकित्सकों के साथ विश्व स्तरीय ${specName} स्वास्थ्य सेवा का अनुभव करें।` 
                   : `Experience world-class ${specName.toLowerCase()} healthcare with our team of dedicated physicians.`}
              </p>
           </div>
           
           <DoctorsList initialFilter={initialFilter} />
        </div>
      </section>

      <CTA />
    </div>
  );
}
