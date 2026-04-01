import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LockKeyhole,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Introduction | MediCare",
  description: "A digital healthcare platform that feels as trusted as the care itself. Explore our introduction and product screenshots.",
};

const pageLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Impact", href: "#impact" },
];

const platformHighlights = [
  "Seamless healthcare access across web and mobile workflows",
  "Expert doctors with verified specializations and transparent ratings",
  "A digital-first patient experience designed around speed and trust",
];

const problemPoints = [
  "Difficulty in finding trusted doctors",
  "Long waiting times for appointments",
  "Lack of digital healthcare accessibility",
  "Fragmented patient records",
];

const solutionPoints = [
  "Online appointment booking system",
  "Verified and categorized specialists",
  "Real-time availability tracking",
  "Digital health records system",
  "Seamless patient-doctor interaction",
];

const featureCards: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Doctor Discovery & Filtering",
    description:
      "Patients discover specialists by category, language, insurance, rating, and next availability.",
    icon: Search,
  },
  {
    title: "Appointment Booking System",
    description:
      "A fast booking journey reduces friction from first search to confirmed consultation.",
    icon: CalendarDays,
  },
  {
    title: "Real-time Availability",
    description:
      "Live scheduling logic keeps every visible slot accurate across doctors, clinics, and devices.",
    icon: Clock3,
  },
  {
    title: "Patient Dashboard",
    description:
      "A single dashboard centralizes upcoming visits, care history, prescriptions, and reminders.",
    icon: LayoutDashboard,
  },
  {
    title: "Testimonials & Reviews",
    description:
      "Verified patient feedback builds confidence and helps new visitors choose the right doctor.",
    icon: Star,
  },
  {
    title: "Secure Data & Privacy",
    description:
      "HIPAA-ready concepts shape every flow, from authentication to health record access and sharing.",
    icon: ShieldCheck,
  },
];

const workSteps: Array<{
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    step: "01",
    title: "Search doctors by specialization",
    description: "Patients start with symptoms, specialty, or care goals and instantly filter the directory.",
    icon: Search,
  },
  {
    step: "02",
    title: "View profiles & ratings",
    description: "Each doctor page surfaces expertise, reviews, clinic details, and consultation options.",
    icon: BadgeCheck,
  },
  {
    step: "03",
    title: "Book appointment instantly",
    description: "Patients choose a slot, confirm their details, and complete the booking in a few taps.",
    icon: CalendarDays,
  },
  {
    step: "04",
    title: "Get confirmation & reminders",
    description: "Automated confirmations and reminder flows reduce no-shows and support confidence.",
    icon: BellRing,
  },
  {
    step: "05",
    title: "Attend consultation",
    description: "Care continues in-person or online with records, notes, and follow-up context kept in sync.",
    icon: HeartPulse,
  },
];

const techStack: Array<{
  name: string;
  detail: string;
  icon: LucideIcon;
}> = [
  {
    name: "Next.js",
    detail: "App Router powers a fast, modular frontend with strong SEO and modern rendering.",
    icon: Sparkles,
  },
  {
    name: "MongoDB",
    detail: "Flexible data modeling supports doctor catalogs, scheduling, patient profiles, and records.",
    icon: Database,
  },
  {
    name: "Tailwind CSS",
    detail: "A tight design system keeps the product consistent, responsive, and premium across screens.",
    icon: Activity,
  },
  {
    name: "JWT Authentication",
    detail: "Secure, scalable session flows protect patient access while keeping sign-in friction low.",
    icon: LockKeyhole,
  },
];

const challengeRows = [
  {
    challenge: "Managing real-time appointment slots",
    solution:
      "Slot states were synchronized with live availability logic so patients only saw bookable times.",
  },
  {
    challenge: "Secure authentication & patient data",
    solution:
      "Role-aware access, JWT-based auth, and privacy-first record handling created a safer patient journey.",
  },
  {
    challenge: "Scalable backend architecture",
    solution:
      "The data model and APIs were designed to support more doctors, clinics, and patient traffic over time.",
  },
  {
    challenge: "Responsive UI across devices",
    solution:
      "Every workflow was simplified into mobile-first layouts without sacrificing clarity on desktop dashboards.",
  },
];

const impactStats = [
  { value: "70%", label: "Faster appointment booking", icon: CalendarDays },
  { value: "4.9/5", label: "Improved patient experience", icon: Star },
  { value: "3x", label: "Increased doctor accessibility", icon: Stethoscope },
  { value: "10k+", label: "Scalable monthly consultations", icon: Users },
];

const screenshotCards = [
  {
    title: "Doctor search",
    label: "Discovery",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    bars: ["Specialty", "Location", "Insurance"],
  },
  {
    title: "Booking flow",
    label: "Scheduling",
    accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
    bars: ["Tuesday 10:00", "Tuesday 11:30", "Wednesday 09:00"],
  },
  {
    title: "Patient dashboard",
    label: "Portal",
    accent: "from-sky-500/20 via-emerald-500/10 to-transparent",
    bars: ["Upcoming visit", "Records", "Prescriptions"],
  },
  {
    title: "Health records",
    label: "Records",
    accent: "from-emerald-400/20 via-lime-400/10 to-transparent",
    bars: ["Blood test", "Care notes", "Doctor summary"],
  },
  {
    title: "Live availability",
    label: "Realtime",
    accent: "from-cyan-500/20 via-teal-500/10 to-transparent",
    bars: ["Available now", "Busy", "Follow-up slots"],
  },
  {
    title: "Reviews & trust",
    label: "Social proof",
    accent: "from-teal-400/20 via-emerald-500/10 to-transparent",
    bars: ["4.9 average", "Verified reviews", "Top specialists"],
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-4 py-2 text-sm font-medium text-teal-700 shadow-sm backdrop-blur-xl">
      <span className="h-2 w-2 rounded-full bg-teal-500" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

export default function IntroductionPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.14),_transparent_26%),radial-gradient(circle_at_top_left,_rgba(16,185,129,0.1),_transparent_22%),linear-gradient(180deg,_#f8fffe_0%,_#f7fbfb_45%,_#f3f8f7_100%)] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-teal-100/70 bg-white/78 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-800 text-white shadow-lg shadow-teal-900/15">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Medi<span className="text-teal-700">Care</span>
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Introduction</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/75 p-1 shadow-sm lg:flex">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-teal-50 hover:text-teal-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#overview"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-200 hover:text-teal-800 sm:inline-flex"
            >
              Read Story
            </Link>
            <Link
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-teal-800 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-16 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute right-[-6%] top-20 h-80 w-80 rounded-full bg-teal-200/45 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-16">
          <div className="flex flex-col justify-center">
            <SectionEyebrow>Premium healthcare product design</SectionEyebrow>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              MediCare Healthcare Platform
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Modern healthcare made simple, accessible, and efficient.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-4 text-base font-medium text-white shadow-xl shadow-teal-900/20 transition duration-300 hover:-translate-y-1 hover:bg-teal-700"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#screenshots"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-4 text-base font-medium text-slate-700 shadow-sm backdrop-blur-xl transition duration-300 hover:border-teal-200 hover:bg-white hover:text-teal-800"
              >
                Explore Product Screens
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { value: "120k+", label: "Patients onboarded" },
                { value: "2.3x", label: "Faster consultations" },
                { value: "98%", label: "Booking completion rate" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1"
                >
                  <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden rounded-[28px] border border-white/70 bg-white/75 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Next available</p>
                  <p className="font-semibold text-slate-950">Today, 2:30 PM</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-3 shadow-[0_30px_90px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl">
              <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.6rem]">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor standing in a bright modern clinic"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/30 via-transparent to-white/10" />
              </div>

              <div className="absolute inset-x-8 bottom-8 rounded-[1.75rem] border border-white/40 bg-white/25 p-5 shadow-lg backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-teal-700 shadow-sm">
                      <HeartPulse className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Lead specialist</p>
                      <p className="text-lg font-semibold text-white">Dr. Sarah Mitchell</p>
                    </div>
                  </div>
                  <div className="hidden rounded-full bg-emerald-400/20 px-3 py-1 text-sm font-medium text-emerald-50 sm:block">
                    Available now
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-10 hidden max-w-xs rounded-[28px] border border-white/70 bg-white/78 p-5 shadow-xl backdrop-blur-xl lg:block">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">Secure patient records</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    HIPAA-ready patterns, clear permissions, and a calm digital experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-10">
              <SectionHeading
                eyebrow="Overview"
                title="A digital healthcare platform that feels as trusted as the care itself."
                description="MediCare Healthcare Platform was designed as a premium healthcare experience that brings discovery, booking, communication, and records into one intuitive product. The goal was to replace fragmented patient journeys with a streamlined platform that feels calm, credible, and fast."
              />
            </div>

            <div className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700 p-8 text-white shadow-[0_25px_80px_-32px_rgba(13,148,136,0.6)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-teal-100/75">Core outcomes</p>
              <div className="mt-8 space-y-5">
                {platformHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-base leading-7 text-teal-50/95">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-rose-100 bg-white/80 p-8 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.25)] backdrop-blur-xl">
              <SectionHeading
                eyebrow="Problem Statement"
                title="Patients were facing a broken healthcare journey."
                description="The existing experience made routine care feel unnecessarily complex. Trust was hard to establish, booking took too long, and essential health information lived in disconnected systems."
              />
              <div className="mt-8 space-y-4">
                {problemPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/75 p-4"
                  >
                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                      <CircleDot className="h-4 w-4" />
                    </div>
                    <p className="text-base leading-7 text-slate-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              id="solution"
              className="scroll-mt-28 rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.25)] backdrop-blur-xl"
            >
              <SectionHeading
                eyebrow="Solution"
                title="A connected, premium platform built around patient confidence."
                description="The product strategy focused on reducing uncertainty at every step. Discovery became clearer, booking became immediate, and health records became accessible without sacrificing privacy or trust."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {solutionPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-teal-100 bg-teal-50/65 p-4 text-sm font-medium text-teal-900 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-teal-50"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                      <Check className="h-5 w-5" />
                    </div>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="A modern product system built for premium healthcare operations."
            description="Every capability was shaped to make clinical access feel more trustworthy, transparent, and efficient for both patients and providers."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.26)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-teal-100 hover:bg-white"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-100 to-emerald-50 text-teal-700 shadow-sm transition duration-300 group-hover:scale-105">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2.25rem] border border-white/80 bg-white/70 p-8 shadow-[0_25px_80px_-38px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-10 lg:p-12">
            <SectionHeading
              eyebrow="How It Works"
              title="A step-by-step care journey designed to remove friction."
              description="The experience guides patients from search to consultation through clear, reassuring interactions and real-time feedback."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-5">
              {workSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-[1.8rem] border border-slate-100 bg-slate-50/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-teal-100 hover:bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-[0.24em] text-teal-600">
                      {step.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="screenshots" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Screenshots"
            title="Healthcare UI concepts presented like polished product screenshots."
            description="Instead of generic placeholders, these visual cards mimic real flows across doctor search, scheduling, dashboards, records, and trust-building experiences."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {screenshotCards.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 shadow-[0_22px_72px_-36px_rgba(15,23,42,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-2"
              >
                <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${card.accent} p-5`}>
                  <div className="rounded-[1.5rem] border border-white/80 bg-white/88 p-4 shadow-lg backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          {card.label}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-950">{card.title}</p>
                      </div>
                      <div className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                        Live UI
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <div className="mb-2 h-2.5 w-20 rounded-full bg-slate-200" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-xl bg-white p-3 shadow-sm">
                            <div className="h-3 w-16 rounded-full bg-teal-100" />
                            <div className="mt-3 h-7 rounded-xl bg-teal-50" />
                          </div>
                          <div className="rounded-xl bg-white p-3 shadow-sm">
                            <div className="h-3 w-12 rounded-full bg-emerald-100" />
                            <div className="mt-3 h-7 rounded-xl bg-emerald-50" />
                          </div>
                        </div>
                      </div>

                      {card.bars.map((bar, index) => (
                        <div
                          key={bar}
                          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-slate-100" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">{bar}</p>
                              <p className="text-xs text-slate-400">Module {index + 1}</p>
                            </div>
                          </div>
                          <div className="h-2.5 w-16 rounded-full bg-teal-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700 p-8 text-white shadow-[0_25px_80px_-32px_rgba(13,148,136,0.6)] sm:p-10">
              <SectionEyebrow>Tech Stack</SectionEyebrow>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                Built on a modern stack for performance, security, and scale.
              </h2>
              <p className="mt-5 text-lg leading-8 text-teal-50/85">
                The implementation choices supported both product polish on the frontend and
                long-term operational flexibility behind the scenes.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {techStack.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[2rem] border border-white/80 bg-white/75 p-7 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.26)] backdrop-blur-xl transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-teal-50 text-teal-700">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-slate-950">{item.name}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Challenges & Solutions"
            title="Complex product constraints translated into calm, usable experiences."
            description="The platform needed to support demanding healthcare workflows while still feeling effortless for patients. Each challenge was treated as both a technical and design problem."
          />

          <div className="mt-10 space-y-5">
            {challengeRows.map((row) => (
              <article
                key={row.challenge}
                className="grid gap-5 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_70px_-36px_rgba(15,23,42,0.24)] backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:items-center"
              >
                <div className="rounded-[1.6rem] bg-slate-50/90 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Challenge</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{row.challenge}</h3>
                </div>
                <div className="rounded-[1.6rem] bg-teal-50/80 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-teal-600">Solution</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">{row.solution}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Results / Impact"
            title="The final experience improved speed, confidence, and long-term scalability."
            description="MediCare moved healthcare interactions closer to what patients already expect from the best digital products: clarity, responsiveness, and consistent trust."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {impactStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[2rem] border border-white/80 bg-white/75 p-7 text-center shadow-[0_20px_70px_-34px_rgba(15,23,42,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-teal-50 text-teal-700">
                  <stat.icon className="h-7 w-7" />
                </div>
                <p className="mt-6 text-4xl font-semibold text-slate-950">{stat.value}</p>
                <p className="mt-3 text-base text-slate-600">{stat.label}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-[0_20px_70px_-34px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-teal-600">Outcome summary</p>
                <h3 className="mt-4 font-serif text-3xl text-slate-950 sm:text-4xl">
                  Faster appointment booking, better patient experiences, stronger doctor access,
                  and a platform ready to scale.
                </h3>
              </div>
              <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-950 to-teal-900 p-6 text-white">
                <div className="flex items-center gap-2 text-emerald-300">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={item} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-white/85">
                  "The new introduction direction feels premium, clinically trustworthy, and much
                  closer to a real healthcare SaaS product than a generic marketing page."
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/12" />
                  <div>
                    <p className="font-medium">Product & Design Review</p>
                    <p className="text-sm text-white/60">MediCare platform team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="scroll-mt-28 pb-24 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-teal-200/60 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700 px-8 py-12 text-white shadow-[0_28px_100px_-40px_rgba(13,148,136,0.7)] sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <SectionEyebrow>Call to Action</SectionEyebrow>
                <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                  Ready to bring premium digital care to every patient touchpoint?
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-teal-50/85">
                  MediCare Healthcare Platform combines elegant product design with serious
                  healthcare functionality, creating a scalable foundation for trusted care.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-medium text-teal-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-teal-50"
                  >
                    Book Appointment
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-base font-medium text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                  >
                    Explore Doctors
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    title: "Trusted by patients",
                    text: "Clear profiles, social proof, and fast scheduling remove hesitation from care decisions.",
                    icon: Users,
                  },
                  {
                    title: "Built for secure growth",
                    text: "Privacy-first architecture supports long-term scale without compromising experience.",
                    icon: FileText,
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 text-white">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-teal-50/80">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
