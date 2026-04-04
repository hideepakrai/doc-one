"use client";

import { ReactNode } from "react";

export default function ChartCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
      <div className="mb-5">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="h-[320px]">{children}</div>
    </section>
  );
}
