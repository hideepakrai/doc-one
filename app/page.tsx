"use client";

import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";

// Loading Skeletons
const SectionSkeleton = () => (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="h-10 w-48 bg-muted/60 animate-pulse rounded-full mb-8" />
        <div className="h-16 w-3/4 bg-muted/40 animate-pulse rounded-3xl mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-muted/20 animate-pulse rounded-[2.5rem]" />
            ))}
        </div>
    </div>
);

// Dynamic Imports for performance
const Specializations = dynamic(() => import("@/components/sections/Specializations"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});
const Doctors = dynamic(() => import("@/components/sections/Doctors"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});
const CTA = dynamic(() => import("@/components/sections/CTA"), {
  loading: () => <div className="h-64 bg-muted animate-pulse" />,
  ssr: false
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Specializations />
      <Doctors onlyFeatured />
      <Services />
      <CTA />
      <Contact />
    </div>
  );
}
