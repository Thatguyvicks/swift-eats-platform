import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bike, Check, Clock, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/track")({
  component: Track,
  head: () => ({ meta: [{ title: "Tracking your order — Forka" }] }),
});

const stages = [
  { key: "confirmed", label: "Order confirmed", time: "Just now" },
  { key: "preparing", label: "Kitchen is cooking", time: "2 min" },
  { key: "pickup", label: "Courier picked up", time: "12 min" },
  { key: "arriving", label: "Arriving soon", time: "20 min" },
];

function Track() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStage((s) => Math.min(s + 1, stages.length - 1)), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Map */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] rounded-3xl overflow-hidden border border-border/60 bg-secondary">
          <FakeMap stage={stage} />
        </div>

        {/* Status */}
        <aside className="bg-card border border-border/60 rounded-3xl p-6">
          <div className="text-xs text-muted-foreground">Order #4129</div>
          <h1 className="font-display text-3xl font-black mt-1">{stages[stage].label}</h1>
          <div className="mt-1 flex items-center gap-1.5 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" /> Arrival in ~{20 - stage * 4} min
          </div>

          <ol className="mt-6 space-y-4">
            {stages.map((s, i) => (
              <li key={s.key} className="flex gap-3">
                <div className={`mt-0.5 w-6 h-6 rounded-full grid place-items-center shrink-0 ${i <= stage ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < stage ? <Check className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${i <= stage ? "" : "text-muted-foreground"}`}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 p-4 rounded-2xl bg-secondary flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center">
              <Bike className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold leading-tight">Marco · your courier</div>
              <div className="text-xs text-muted-foreground">Black scooter · Plate AB-2189</div>
            </div>
            <button className="w-9 h-9 rounded-full bg-background grid place-items-center"><Phone className="w-4 h-4" /></button>
          </div>

          <Link to="/orders" className="mt-5 block text-center text-sm text-muted-foreground hover:text-foreground">View order details →</Link>
        </aside>
      </div>
    </div>
  );
}

function FakeMap({ stage }: { stage: number }) {
  const progress = stage / (stages.length - 1);
  return (
    <div className="absolute inset-0">
      {/* "map" background */}
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.88 0.02 70)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.62 0.21 30)" />
            <stop offset="1" stopColor="oklch(0.78 0.16 70)" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="oklch(0.96 0.02 75)" />
        <rect width="400" height="400" fill="url(#grid)" />
        {/* roads */}
        <path d="M 0 280 Q 100 260 200 270 T 400 250" stroke="oklch(0.92 0.015 70)" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M 60 0 L 80 400" stroke="oklch(0.92 0.015 70)" strokeWidth="16" fill="none" />
        <path d="M 320 0 L 300 400" stroke="oklch(0.92 0.015 70)" strokeWidth="16" fill="none" />
        {/* route */}
        <path id="r" d="M 70 320 Q 160 280 220 220 T 330 90" stroke="url(#route)" strokeWidth="4" fill="none" strokeDasharray="6 6" />
        {/* destination */}
        <g transform="translate(330 90)">
          <circle r="10" fill="oklch(0.62 0.21 30)" />
          <circle r="20" fill="oklch(0.62 0.21 30)" opacity="0.2" />
        </g>
        {/* origin */}
        <g transform="translate(70 320)">
          <circle r="8" fill="oklch(0.20 0.02 50)" />
        </g>
      </svg>

      {/* courier dot animated along route */}
      <motion.div
        className="absolute"
        animate={{
          left: `${17 + progress * 65}%`,
          top: `${80 - progress * 60}%`,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground text-background grid place-items-center shadow-pop">
          <Bike className="w-5 h-5" />
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-background/90 backdrop-blur border border-border/60 rounded-2xl p-3 flex items-center gap-2 text-sm">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="font-medium">221B Baker Street</span>
        <span className="text-muted-foreground ml-auto">Live</span>
      </div>
    </div>
  );
}
