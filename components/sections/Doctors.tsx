"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 284,
    experience: "15+ years",
    location: "Manhattan Medical Center",
    available: true,
    nextSlot: "Today, 3:00 PM",
  },
  {
    id: 2,
    name: "Dr. James Anderson",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 198,
    experience: "12+ years",
    location: "Brooklyn Health Hub",
    available: true,
    nextSlot: "Tomorrow, 10:00 AM",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 342,
    experience: "18+ years",
    location: "Queens Family Clinic",
    available: true,
    nextSlot: "Today, 5:30 PM",
  },
  {
    id: 4,
    name: "Dr. Michael Roberts",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 156,
    experience: "10+ years",
    location: "Manhattan Medical Center",
    available: false,
    nextSlot: "Next Week",
  },
];

const filters = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics"];

export default function Doctors() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredDoctors =
    activeFilter === "All"
      ? doctors
      : doctors.filter((d) => d.specialty === activeFilter);

  return (
    <section id="doctors" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-4 text-balance">
              Meet our expert doctors
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Our team of board-certified physicians brings decades of combined experience to
              provide you with the best possible care.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                    {/* Availability Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          doctor.available
                            ? "bg-emerald-500/90 text-white"
                            : "bg-amber-500/90 text-white"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            doctor.available ? "bg-white animate-pulse" : "bg-white"
                          }`}
                        />
                        {doctor.available ? "Available" : "Busy"}
                      </span>
                    </div>

                    {/* Quick Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                      <p className="text-white/80">{doctor.specialty}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold">{doctor.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        ({doctor.reviews} reviews)
                      </span>
                      <span className="text-muted-foreground text-sm">•</span>
                      <span className="text-muted-foreground text-sm">
                        {doctor.experience}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>

                    {/* Next Available */}
                    <div className="flex items-center gap-2 text-sm mb-5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Next:</span>
                      <span className="font-medium text-primary">{doctor.nextSlot}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`#doctor-${doctor.id}`}
                        className="flex-1 flex items-center justify-center h-11 rounded-xl border-2 border-border text-sm font-medium hover:bg-muted transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`#book-${doctor.id}`}
                        className="flex-1 flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="#all-doctors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            View All Doctors
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
