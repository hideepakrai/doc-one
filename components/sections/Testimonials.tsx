"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Williams",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "The level of care I received at MediCare was exceptional. Dr. Mitchell took the time to explain everything thoroughly and made me feel completely at ease. The booking process was seamless, and I appreciated the follow-up care.",
    specialty: "Cardiology",
    doctor: "Dr. Sarah Mitchell",
  },
  {
    id: 2,
    name: "Robert Thompson",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "I was skeptical about video consultations, but MediCare changed my mind. The quality was excellent, and Dr. Anderson was incredibly professional. It saved me so much time while still receiving top-notch medical advice.",
    specialty: "Neurology",
    doctor: "Dr. James Anderson",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "School Teacher",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "As a mother of three, finding quality pediatric care is crucial. Dr. Chen and her team have been wonderful with my children. The clinic is welcoming, and the staff is always patient and understanding.",
    specialty: "Pediatrics",
    doctor: "Dr. Emily Chen",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24">
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
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            What our patients say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real patients who have trusted us with their healthcare needs.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image Side */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Quote className="w-12 h-12 text-primary" />
                </div>
              </div>

              {/* Content Side */}
              <div>
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl leading-relaxed text-foreground mb-8">
                  {`"${testimonials[currentIndex].text}"`}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                  </div>
                </div>

                {/* Treatment Info */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Treated by</p>
                    <p className="font-medium">
                      {testimonials[currentIndex].doctor} •{" "}
                      {testimonials[currentIndex].specialty}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
