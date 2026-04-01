"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Clock, Building2 } from "lucide-react";
import Link from "next/link";

const locations = [
  {
    name: "Manhattan Medical Center",
    address: "123 Health Avenue, Manhattan, NY 10001",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Sat: 8AM-8PM",
  },
  {
    name: "Brooklyn Health Hub",
    address: "456 Wellness Blvd, Brooklyn, NY 11201",
    phone: "+1 (555) 234-5678",
    hours: "Mon-Sat: 8AM-8PM",
  },
  {
    name: "Queens Family Clinic",
    address: "789 Care Street, Queens, NY 11375",
    phone: "+1 (555) 345-6789",
    hours: "Mon-Fri: 9AM-6PM",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 text-balance">
            {"We're"} here to help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our services or need to schedule an appointment? Reach out to us
            through any of the channels below.
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
                  <h3 className="text-2xl font-semibold mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    {"We've"} received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    Send Another Message
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
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="john@example.com"
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject
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
                        <option value="">Select a subject</option>
                        <option value="appointment">Book Appointment</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
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
                Our Locations
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
              <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is available around the clock to help you with urgent matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="tel:+15559110000"
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Link>
                <Link
                  href="mailto:urgent@medicare.com"
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
