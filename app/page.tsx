import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Specializations from "@/components/sections/Specializations";
import Doctors from "@/components/sections/Doctors";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Specializations />
      <Doctors />
      <Services />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
