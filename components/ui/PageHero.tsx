"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  parent?: {
    name: string;
    href: string;
  };
}

export default function PageHero({ title, description, badge, parent }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden bg-background">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumbs */}
          <motion.nav 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 mb-10 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/50"
          >
            <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            
            {parent && (
              <>
                <Link href={parent.href} className="hover:text-primary transition-colors">
                  {parent.name}
                </Link>
                <ChevronRight className="w-3 h-3 opacity-30" />
              </>
            )}
            
            <span className="text-primary/60">{title}</span>
          </motion.nav>

          {badge && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-6 border border-primary/20"
            >
              {badge}
            </motion.span>
          )}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-5xl sm:text-7xl font-serif font-medium mb-10 text-balance leading-[1.1] tracking-tight text-primary-dark"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
      
      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </section>
  );
}
