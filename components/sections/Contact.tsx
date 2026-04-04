"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, HelpCircle, PhoneCall 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: PhoneCall,
      title: language === "hi" ? "हमें कॉल करें" : "Call Us Directly",
      detail: t("footer.phone"),
      sub: language === "hi" ? "24/7 आपातकालीन सहायता उपलब्ध" : "24/7 Emergency support available",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Mail,
      title: language === "hi" ? "ईमेल समर्थन" : "Email Support",
      detail: t("footer.email"),
      sub: language === "hi" ? "24 कार्य घंटों के भीतर उत्तर" : "Response within 24 working hours",
      color: "bg-emerald-500/10 text-emerald-600"
    },
    {
      icon: Clock,
      title: language === "hi" ? "कार्य के घंटे" : "Working Hours",
      detail: language === "hi" ? "सोम-शनि: सुबह 9 से रात 9" : "Mon-Sat: 9 AM - 9 PM",
      sub: language === "hi" ? "रविवार: सुबह 10 से शाम 4" : "Sunday: 10 AM - 4 PM",
      color: "bg-amber-500/10 text-amber-600"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4 border border-primary/20"
          >
            {language === "hi" ? "हमसे जुड़ें" : "Get in Touch"}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-serif font-medium mb-6 leading-tight">
            {language === "hi" ? "संपर्क करने में संकोच न करें" : "Don't hesitate to reach out"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed italic opacity-80">
            {language === "hi" 
              ? "हम आपकी सहायता के लिए तैयार हैं और आपके स्वास्थ्य संबंधी सभी सवालों के जवाब देना चाहते हैं।" 
              : "We're here to help and would love to hear from you. Experience the best medical care combined with clinical excellence."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card p-10 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group text-center"
            >
              <div className={`w-16 h-16 rounded-2xl ${info.color.split(' ')[0]} flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                <info.icon className={`w-8 h-8 ${info.color.split(' ')[1]}`} strokeWidth={2.5} />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-foreground/40">{info.title}</h4>
              <p className="text-xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">{info.detail}</p>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">{info.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-[3rem] p-10 sm:p-14 border border-border/50 shadow-2xl shadow-primary/5 border-white/40"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-serif mb-6">{language === "hi" ? "संदेश प्राप्त हुआ!" : "Message Received!"}</h3>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed mb-10">
                    {language === "hi" 
                      ? "आपके संदेश के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।" 
                      : "Thank you for reaching out. A clinical advisor will contact you within one business day."}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-10 py-5 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20"
                >
                  {language === "hi" ? "वापस जाएँ" : "Back to Form"}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-[11px] font-black uppercase tracking-widest mb-3 ml-1 text-muted-foreground group-focus-within:text-primary">{language === "hi" ? "आपका नाम" : "Your Name"}</label>
                    <input
                      required name="name" type="text"
                      value={formState.name} onChange={handleInputChange}
                      className="w-full h-16 pl-6 bg-muted/30 border border-border/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[11px] font-black uppercase tracking-widest mb-3 ml-1 text-muted-foreground group-focus-within:text-primary">{language === "hi" ? "ईमेल पता" : "Email Address"}</label>
                    <input
                      required name="email" type="email"
                      value={formState.email} onChange={handleInputChange}
                      className="w-full h-16 pl-6 bg-muted/30 border border-border/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[11px] font-black uppercase tracking-widest mb-3 ml-1 text-muted-foreground group-focus-within:text-primary">{language === "hi" ? "विषय" : "Inquiry Subject"}</label>
                  <select
                    name="subject" value={formState.subject} onChange={handleInputChange}
                    className="w-full h-16 pl-6 bg-muted/30 border border-border/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">{language === "hi" ? "एक विषय चुनें" : "Select a topic"}</option>
                    <option value="appointment">{language === "hi" ? "अपॉइंटमेंट सहायता" : "Appointment Assistance"}</option>
                    <option value="billing">{language === "hi" ? "बिलिंग पूछताछ" : "Billing Inquiry"}</option>
                    <option value="support">{language === "hi" ? "सामान्य प्रश्न" : "General Question"}</option>
                    <option value="feedback">{language === "hi" ? "फीडबैक" : "Feedback"}</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-[11px] font-black uppercase tracking-widest mb-3 ml-1 text-muted-foreground group-focus-within:text-primary">{language === "hi" ? "आपका संदेश" : "Detailed Message"}</label>
                  <textarea
                    required name="message" rows={6}
                    value={formState.message} onChange={handleInputChange}
                    className="w-full pl-6 pt-5 bg-muted/30 border border-border/80 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 font-bold transition-all resize-none"
                    placeholder={language === "hi" ? "आपकी क्या मदद करें?" : "How can we assist you today?"}
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full h-18 rounded-[2rem] bg-primary text-white font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
                >
                  {isSubmitting ? <span className="animate-pulse">{language === "hi" ? "भेज रहा है..." : "Processing..."}</span> : (
                    <>
                      {language === "hi" ? "संदेश भेजें" : "Send Inquiry"}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Location & Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full flex flex-col"
          >
            <div className="bg-primary-dark rounded-[3rem] p-10 sm:p-14 text-white shadow-2xl shadow-primary/20 border border-white/5 mb-8 relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10">
                <MapPin className="w-12 h-12 text-primary mb-8" strokeWidth={2.5} />
                <h3 className="text-3xl font-serif mb-6 leading-tight">
                  {language === "hi" ? "क्लिनिक स्थान" : "Visit our clinical center"}
                </h3>
                <p className="text-white/60 mb-10 text-xl leading-relaxed italic">
                  {t("footer.address")}
                </p>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 h-14 rounded-2xl bg-white text-primary-dark font-black uppercase tracking-widest text-[11px] shadow-xl hover:shadow-white/10 transition-all">
                        Directions
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 h-14 rounded-2xl border-2 border-white/10 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all">
                        {language === "hi" ? "कॉल करें" : "Call"}
                    </button>
                </div>
              </div>
            </div>

            <div className="rounded-[3rem] overflow-hidden border border-border shadow-2xl h-[340px] relative bg-muted grayscale group">
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.916174415518!2d77.15175968715818!3d28.585376399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d784d1de9d7%3A0xe54dca738f654b!2sVasant%20Vihar%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1712215689123!5m2!1sen!2sin" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter contrast-125 group-hover:filter-none transition-all duration-1000"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
