"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Clock, Building2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const { t, language } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const locations = [
    {
      name: t("header.logo") + " " + t("header.logoSuffix"),
      address: t("footer.address"),
      phone: t("footer.phone"),
      hours: language === "hi" ? "सोम-शनि: सुबह 9 बजे - रात 9 बजे" : "Mon-Sat: 9AM-9PM",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24">
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
            {language === "hi" ? "संपर्क करें" : "Get in Touch"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            {language === "hi" ? "हम आपकी मदद के लिए यहाँ हैं" : "We're here to help"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hi" 
              ? "हमारी सेवाओं के बारे में प्रश्न हैं या अपॉइंटमेंट लेना चाहते हैं? नीचे दिए गए किसी भी माध्यम से हमसे संपर्क करें।" 
              : "Have questions about our services or need to schedule an appointment? Reach out to us through any of the channels below."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card rounded-2xl border border-border p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {language === "hi" ? "संदेश भेज दिया गया!" : "Message Sent!"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === "hi" 
                      ? "हमें आपका संदेश मिल गया है और हम 24 घंटों के भीतर आपसे संपर्क करेंगे।" 
                      : "We've received your message and will get back to you within 24 hours."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    {language === "hi" ? "एक और संदेश भेजें" : "Send Another Message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        {language === "hi" ? "पूरा नाम" : "Full Name"}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder={language === "hi" ? "राजेश शर्मा" : "Rajesh Sharma"}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        {language === "hi" ? "ईमेल पता" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="rajesh@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        {language === "hi" ? "फ़ोन नंबर" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+91 98765-43210"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        {language === "hi" ? "विषय" : "Subject"}
                      </label>
                      <select
                        id="subject"
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        required
                      >
                        <option value="">{language === "hi" ? "एक विषय चुनें" : "Select a subject"}</option>
                        <option value="appointment">{t("header.book")}</option>
                        <option value="inquiry">{language === "hi" ? "सामान्य पूछताछ" : "General Inquiry"}</option>
                        <option value="feedback">{language === "hi" ? "परामर्श" : "Feedback"}</option>
                        <option value="other">{language === "hi" ? "अन्य" : "Other"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      {language === "hi" ? "संदेश" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder={language === "hi" ? "हम आपकी कैसे मदद कर सकते हैं?" : "How can we help you?"}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    {language === "hi" ? "संदेश भेजें" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {language === "hi" ? "हमारे स्थान" : "Our Locations"}
              </h3>
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <div
                    key={location.name}
                    className={`${
                      index !== locations.length - 1 ? "pb-6 border-b border-border" : ""
                    }`}
                  >
                    <h4 className="font-semibold mb-3">{location.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{location.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <h3 className="text-xl font-semibold mb-4">
                {language === "hi" ? "तत्काल सहायता की आवश्यकता है?" : "Need Immediate Assistance?"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === "hi" 
                  ? "हमारी सहायता टीम आपकी तत्काल मामलों में मदद के लिए चौबीसों घंटे उपलब्ध है।" 
                  : "Our support team is available around the clock to help you with urgent matters."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`tel:${t("footer.phone")}`}
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {language === "hi" ? "अभी कॉल करें" : "Call Now"}
                </Link>
                <Link
                  href={`mailto:${t("footer.email")}`}
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {language === "hi" ? "ईमेल करें" : "Email Us"}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
