"use client";

import { motion } from "framer-motion";
import {
  Video,
  Calendar,
  FileText,
  Clock,
  Shield,
  Smartphone,
  ArrowRight,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Video Consultations",
    description:
      "Connect with specialists from the comfort of your home through secure, high-quality video calls.",
    icon: Video,
    features: ["HD video quality", "Screen sharing", "Record sessions"],
  },
  {
    title: "Easy Scheduling",
    description:
      "Book appointments online 24/7 with real-time availability and instant confirmations.",
    icon: Calendar,
    features: ["Real-time slots", "SMS reminders", "Easy rescheduling"],
  },
  {
    title: "Digital Health Records",
    description:
      "Access your complete medical history, prescriptions, and test results anytime.",
    icon: FileText,
    features: ["Secure storage", "Share with doctors", "Download reports"],
  },
  {
    title: "24/7 Care Support",
    description:
      "Our medical team is available around the clock for urgent consultations and advice.",
    icon: Clock,
    features: ["Emergency support", "Nurse helpline", "Quick response"],
  },
];

const benefits = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your data is protected with enterprise-grade security",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Manage your health on the go with our iOS and Android apps",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            Healthcare made simple
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience modern healthcare with our comprehensive digital services designed to make
            your journey seamless and stress-free.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="flex flex-wrap gap-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80"
              alt="Modern healthcare facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/90" />
          </div>

          <div className="relative px-8 py-16 sm:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif font-medium text-primary-foreground mb-6">
                  Your health data, protected and accessible
                </h3>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  We prioritize your privacy while ensuring you have complete control over your
                  health information. Access your records anytime, anywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#learn-more"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#download"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
                  >
                    Download App
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="text-lg font-semibold text-primary-foreground mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
