"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Calendar, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();

  const stats = [
    { label: t("hero.stats.0.label"), value: t("hero.stats.0.value"), icon: Users },
    { label: t("hero.stats.1.label"), value: t("hero.stats.1.value"), icon: Calendar },
    { label: t("hero.stats.2.label"), value: t("hero.stats.2.value"), icon: Award },
  ];

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-[1.1] tracking-tight mb-6 text-balance">
              {t("hero.headline").split("exceptional")[0]}
              <span className="text-primary">
                {language === "hi" ? "असाधारण" : "exceptional"}
              </span>
              {t("hero.headline").split("exceptional")[1]}
              {/* Note: I'll simplify headline translation in the json if needed, but for now let's use the full string if possible */}
              {/* Special check for Hindi headline structure */}
              {language === "hi" ? "" : ""}
            </h1>
            {/* Re-evaluating headline: simpler to just use t("hero.headline") if I include the span in the JSON, but JSON doesn't support tags easily. 
                I'll just use the full string from JSON for now and wrap the whole thing if needed, 
                or I'll update the JSON to have separate parts. 
                Let's update the JSON to have headlineParts.
            */}

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {t("hero.subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="#book"
                className="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
              >
                {t("hero.cta.book")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#doctors"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                {t("hero.cta.explore")}
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/80?img=${i + 10}`}
                      alt="Patient"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <span className="font-semibold ml-1">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "hi" ? "12,000+ समीक्षाओं से" : "from 12,000+ reviews"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
                  alt="Professional doctor in modern clinic"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 sm:-left-8 top-1/4 bg-card rounded-2xl shadow-xl p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("doctors.nextAvailable")}</p>
                    <p className="font-semibold">{language === "hi" ? "आज, दोपहर 2:30 बजे" : "Today, 2:30 PM"}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 sm:-right-8 bottom-1/4 bg-card rounded-2xl shadow-xl p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80"
                      alt="Dr. Rajesh"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{language === "hi" ? "डॉ. राजेश शर्मा" : "Dr. Rajesh Sharma"}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-sm text-muted-foreground">4.9 • {t("doctors.filters")[1]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
