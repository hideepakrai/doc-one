"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Calendar, Award, ShieldCheck, Activity } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();

  const stats = [
    { label: t("hero.stats.0.label"), value: t("hero.stats.0.value"), icon: Users },
    { label: t("hero.stats.1.label"), value: t("hero.stats.1.value"), icon: Calendar },
    { label: t("hero.stats.2.label"), value: t("hero.stats.2.value"), icon: Award },
  ];

  const headlineParts = (t("hero.headlineParts") as any) || {
    prefix: "",
    highlight: "",
    suffix: t("hero.headline")
  };

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" 
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[calc(100vh-6rem)] py-16">
          {/* Left Content */}
          <div className="order-2 lg:order-1 relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/40 backdrop-blur-md border border-primary/20 mb-10 shadow-sm"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="text-[13px] font-bold text-primary uppercase tracking-wider">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium leading-[1.05] tracking-tight mb-8 text-balance max-w-4xl"
            >
              <span className="text-foreground/90">{headlineParts.prefix}</span>
              <span className="relative inline-block text-primary mx-1">
                {headlineParts.highlight}
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ delay: 1, duration: 1 }}
                   className="absolute -bottom-2 left-0 h-1.5 bg-primary/20 rounded-full"
                />
              </span>
              <span className="text-foreground/90">{headlineParts.suffix}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl font-medium"
            >
               {t("hero.subheadline")}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 mb-16"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#book"
                  className="group flex items-center justify-center gap-3 h-16 px-10 rounded-2xl bg-primary-dark text-white font-bold shadow-2xl shadow-primary-dark/20 hover:shadow-primary/30 transition-all border border-white/10"
                >
                  {t("hero.cta.book")}
                  <ArrowRight className="w-5.5 h-5.5 group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#doctors"
                  className="flex items-center justify-center gap-3 h-16 px-10 rounded-2xl border-2 border-border/80 bg-white/50 backdrop-blur-sm text-foreground font-bold hover:bg-white hover:border-primary/30 transition-all"
                >
                  <Activity className="w-5.5 h-5.5 text-primary" strokeWidth={2.5} />
                  {t("hero.cta.explore")}
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl shadow-black/5 w-fit"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white bg-muted overflow-hidden shadow-lg"
                  >
                    <SafeImage
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      alt="Patient"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      fallback="/placeholder-user.jpg"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-primary text-primary opacity-60" />
                  ))}
                  <span className="text-lg font-bold ml-1.5 text-foreground leading-none">4.9/5</span>
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                  {language === "hi" ? "12,000+ संतुष्ट मरीज" : "12,000+ Satisfied Patients"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Modern Layout */}
          <div className="order-1 lg:order-2 relative group">
            {/* Main Visuals Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] max-w-[540px] mx-auto"
            >
              {/* Decorative Rings */}
              <div className="absolute inset-0 -m-8 border-2 border-primary/5 rounded-[4rem] group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 -m-16 border border-primary/10 rounded-[5rem] group-hover:scale-110 transition-transform duration-1000 delay-75" />

              {/* Central Image Card */}
              <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white/50 backdrop-blur-sm">
                <SafeImage
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=90"
                  alt="Professional healthcare"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
                
                {/* Image Overlay Label */}
                <div className="absolute top-8 right-8 px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="text-[11px] font-bold text-white uppercase tracking-widest">NABH Certified</span>
                    </div>
                </div>
              </div>

              {/* Floating Performance Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -left-12 top-1/4 bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] p-6 border border-white/60 hidden xl:block"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Calendar className="w-7 h-7 text-primary" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{t("doctors.nextAvailable")}</p>
                    <p className="text-xl font-bold text-primary-dark">{language === "hi" ? "आज, दोपहर 2:30" : "Today, 2:30 PM"}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Specialist Card */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -right-8 bottom-12 bg-primary-dark rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(10,46,46,0.3)] p-8 border border-white/10 text-white min-w-[280px]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&q=80"
                      alt="Expert Specialist"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold leading-none mb-2">{language === "hi" ? "डॉ. राजेश शर्मा" : "Dr. Rajesh Sharma"}</h4>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span className="text-xs font-bold text-white/50 uppercase tracking-widest">{t("doctors.filters")[1]}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.15em] mb-1">Experience</p>
                        <p className="text-sm font-bold">15+ Years</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-[0.15em] mb-1">Success Rate</p>
                        <p className="text-sm font-bold text-primary">99.2%</p>
                    </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Improved Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -8 }}
              className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-inner">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-white transition-all" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{stat.value}</span>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
