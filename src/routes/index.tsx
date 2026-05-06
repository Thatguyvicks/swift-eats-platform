import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import hero from "@/assets/hero-food.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categories, stores } from "@/data/stores";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Forka — Food, delivered with care" },
      { name: "description", content: "Order from the best local kitchens. Live tracking. Zero stress." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-20 pb-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              New in your neighbourhood — 14 kitchens this week
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance"
            >
              Real food.<br />
              <span className="text-primary italic">Real fast.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-lg text-lg text-muted-foreground"
            >
              From neighborhood favourites to hidden gems — order in a tap and watch it
              come to your door, live on the map.
            </motion.p>

            {/* Address bar */}
            <motion.form
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex flex-col sm:flex-row gap-2 p-2 bg-card rounded-2xl shadow-soft border border-border/60 max-w-xl"
            >
              <div className="flex-1 flex items-center gap-2 px-3">
                <MapPin className="w-5 h-5 text-primary" />
                <input
                  defaultValue="221B Baker Street"
                  className="w-full bg-transparent py-2.5 outline-none text-sm sm:text-base"
                  placeholder="Enter your delivery address"
                />
              </div>
              <Link
                to="/browse"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-primary-foreground font-semibold shadow-pop hover:scale-[1.02] active:scale-[0.99] transition"
              >
                Find food <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.form>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Avg. 24 min delivery</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Contact-free option</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> 4.9 across 12k orders</div>
            </div>
          </div>

          {/* hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-primary/10 rounded-[2.5rem] blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-soft border border-border/40 aspect-[4/5] sm:aspect-square">
              <img src={hero} alt="Fresh meal flat lay" className="w-full h-full object-cover" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="absolute -left-4 sm:-left-8 bottom-8 bg-card rounded-2xl shadow-soft p-3 pr-4 flex items-center gap-3 border border-border/60"
            >
              <div className="w-9 h-9 rounded-full bg-primary/15 grid place-items-center">
                <Star className="w-4 h-4 text-primary fill-primary" />
              </div>
              <div className="text-sm">
                <div className="font-semibold leading-tight">Order #4129 delivered</div>
                <div className="text-muted-foreground text-xs">in 18 min · 5★ from Maya</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 mt-6 md:mt-10">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-3xl font-bold">Cravings, sorted</h2>
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to="/browse" className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                  <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="mt-2 text-sm font-semibold">{c.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 mt-14">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-3xl font-bold">Loved nearby</h2>
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground">All restaurants →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stores.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to="/store/$slug" params={{ slug: s.slug }} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={s.cover} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {s.tags.slice(0, 1).map((t) => (
                      <span key={t} className="px-2 py-1 text-[11px] font-semibold rounded-full bg-background/90 backdrop-blur">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold leading-tight">{s.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.cuisine}</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-foreground" /> {s.rating}
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-3">
                  <span>{s.eta}</span><span>·</span><span>{s.fee} delivery</span><span>·</span><span>{s.distance}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROMO STRIP */}
      <section className="mx-auto max-w-7xl px-6 mt-16">
        <div className="rounded-3xl bg-foreground text-background overflow-hidden relative p-8 sm:p-12 grid md:grid-cols-2 gap-6 items-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-background/60">Forka One</div>
            <h3 className="mt-2 font-display text-4xl font-black leading-tight">
              Free delivery on orders over <span className="text-primary">$15</span>.
            </h3>
            <p className="mt-3 text-background/80 max-w-md">
              Join Forka One and unlock unlimited free delivery, members-only menus and early access to new restaurants.
            </p>
          </div>
          <div className="relative md:justify-self-end">
            <Link to="/browse" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop">
              Try free for 30 days <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
