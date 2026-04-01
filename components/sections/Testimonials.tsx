"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import { useLanguage } from "@/lib/LanguageContext";

export default function Testimonials() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: language === "hi" ? "सुनीता अग्रवाल" : "Sunita Agarwal",
      role: language === "hi" ? "गृहिणी" : "Homemaker",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: language === "hi" 
        ? "मेडीकेयर मल्टी-स्पेशलिटी क्लिनिक में मुझे जो देखभाल मिली वह असाधारण थी। डॉ. शर्मा ने हर चीज को अच्छी तरह से समझाने के लिए समय निकाला और मुझे पूरी तरह से सहज महसूस कराया।" 
        : "The level of care I received at MediCare Multi-Speciality Clinic was exceptional. Dr. Sharma took the time to explain everything thoroughly and made me feel completely at ease.",
      specialty: t("doctors.filters")[1],
      doctor: language === "hi" ? "डॉ. राजेश शर्मा" : "Dr. Rajesh Sharma",
    },
    {
      id: 2,
      name: language === "hi" ? "अमित मल्होत्रा" : "Amit Malhotra",
      role: language === "hi" ? "बैंक मैनेजर" : "Bank Manager",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: language === "hi" 
        ? "मैं वीडियो परामर्श को लेकर संशय में था, लेकिन मेडीकेयर क्लिनिक ने मेरा विचार बदल दिया। गुणवत्ता उत्कृष्ट थी और डॉ. अय्यर अविश्वसनीय रूप से पेशेवर थे।" 
        : "I was skeptical about video consultations, but MediCare Clinic changed my mind. The quality was excellent, and Dr. Iyer was incredibly professional.",
      specialty: t("doctors.filters")[2],
      doctor: language === "hi" ? "डॉ. अनन्या अय्यर" : "Dr. Ananya Iyer",
    },
    {
      id: 3,
      name: language === "hi" ? "प्रिया सिंह" : "Priya Singh",
      role: language === "hi" ? "स्कूल शिक्षिका" : "School Teacher",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: language === "hi" 
        ? "एक माँ के रूप में, गुणवत्तापूर्ण बाल रोग देखभाल ढूँढना महत्वपूर्ण है। डॉ. गुप्ता और उनकी टीम मेरे बच्चों के साथ बहुत अच्छी रही है।" 
        : "As a mother, finding quality pediatric care is crucial. Dr. Gupta and her team have been wonderful with my children.",
      specialty: t("doctors.filters")[3],
      doctor: language === "hi" ? "डॉ. सुनीता गुप्ता" : "Dr. Sunita Gupta",
    },
  ];

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
            {language === "hi" ? "मरीजों की कहानियाँ" : "Patient Stories"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            {language === "hi" ? "हमारे मरीज क्या कहते हैं" : "What our patients say"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hi" 
              ? "उन वास्तविक मरीजों के वास्तविक अनुभव जिन्होंने अपनी स्वास्थ्य संबंधी जरूरतों के लिए हम पर भरोसा किया है।" 
              : "Real experiences from real patients who have trusted us with their healthcare needs."}
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
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <SafeImage
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    fallback="/placeholder-user.jpg"
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
                    <SafeImage
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={56}
                      height={56}
                      className="object-cover"
                      fallback="/placeholder-user.jpg"
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
                    <p className="text-sm text-muted-foreground">{language === "hi" ? "इलाज किया गया" : "Treated by"}</p>
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
