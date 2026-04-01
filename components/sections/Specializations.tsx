"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Eye,
  Stethoscope,
  Pill,
  Scissors,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const specializations = [
  {
    name: "Cardiology",
    description: "Expert care for heart conditions and cardiovascular health",
    icon: HeartPulse,
    doctors: 24,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "Neurology",
    description: "Advanced treatment for brain and nervous system disorders",
    icon: Brain,
    doctors: 18,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Pediatrics",
    description: "Comprehensive healthcare for infants, children, and teens",
    icon: Baby,
    doctors: 32,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "Orthopedics",
    description: "Treatment for bone, joint, and musculoskeletal conditions",
    icon: Bone,
    doctors: 21,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "Ophthalmology",
    description: "Complete eye care from routine exams to complex surgeries",
    icon: Eye,
    doctors: 15,
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    name: "General Medicine",
    description: "Primary healthcare and preventive medical services",
    icon: Stethoscope,
    doctors: 45,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    name: "Dermatology",
    description: "Skin, hair, and nail health treatments and procedures",
    icon: Pill,
    doctors: 12,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    name: "Surgery",
    description: "Minimally invasive and traditional surgical procedures",
    icon: Scissors,
    doctors: 28,
    color: "bg-slate-500/10 text-slate-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Specializations() {
  return (
    <section id="specializations" className="py-24 bg-muted/30">
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
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            Specialized care for every need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of specialists covers a wide range of medical disciplines, ensuring you
            receive expert care tailored to your specific health needs.
          </p>
        </motion.div>

        {/* Specializations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {specializations.map((spec) => (
            <motion.div
              key={spec.name}
              variants={itemVariants}
              className="group"
            >
              <Link
                href={`#${spec.name.toLowerCase()}`}
                className="block h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${spec.color} flex items-center justify-center mb-5`}
                >
                  <spec.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {spec.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {spec.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {spec.doctors} Doctors
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="#all-specializations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            View All Specializations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
