import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, ShieldCheck, Sparkles, Star, TrendingUp } from "lucide-react";
import hero from "@/assets/hero-food.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categories, stores, verticals } from "@/data/stores";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Hilldash — Food, groceries & more, delivered" },
      { name: "description", content: "Order food, groceries, pharmacy & drinks from local stores. Live tracking. Zero stress." },
    ],
  }),
});

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return { text: "Good morning", suggestion: "Start your day right — breakfast nearby" };
  if (h < 16) return { text: "Lunch time", suggestion: "Quick bites under 25 min" };
  if (h < 21) return { text: "Hungry?", suggestion: "Dinner trending in your area" };
  return { text: "Late-night cravings?", suggestion: "Open now, delivered fast" };
}

function Index() {
  const g = greeting();
  const popular = [...stores].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const topRated = [...stores].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 md:pt-16 pb-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              {g.text} — {g.suggestion}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance"
            >
              Anything you crave.<br />
              <span className="text-primary italic">At your door.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-lg text-lg text-muted-foreground"
            >
              Food, groceries, pharmacy and drinks from the best local stores.
              Order in a tap, watch it arrive live on the map.
            </motion.p>

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
                Find stores <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.form>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Avg. 24 min delivery</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Contact-free option</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> 4.9 across 12k orders</div>
            </div>
          </div>

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

      {/* VERTICALS */}
      <section className="mx-auto max-w-7xl px-6 mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {verticals.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/v/$vertical" params={{ vertical: v.slug }}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/50 hover:shadow-soft transition"
              >
                <span className="text-3xl">{v.emoji}</span>
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">{v.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{v.tagline}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 mt-12">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-3xl font-bold">Cravings, sorted</h2>
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to="/v/$vertical" params={{ vertical: c.vertical }} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
                  <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold text-center">{c.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-6 mt-12 grid md:grid-cols-2 gap-4">
        <div className="rounded-3xl p-6 bg-primary/10 border border-primary/20 flex items-center gap-4">
          <div className="text-4xl">🎁</div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider font-bold text-primary">First order</div>
            <div className="font-display text-xl font-bold mt-0.5">$10 off + free delivery</div>
            <div className="text-sm text-muted-foreground">Code WELCOME10 — auto-applied</div>
          </div>
        </div>
        <div className="rounded-3xl p-6 bg-foreground text-background flex items-center gap-4">
          <div className="text-4xl">⚡</div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider font-bold text-primary">Hilldash One</div>
            <div className="font-display text-xl font-bold mt-0.5">Unlimited free delivery</div>
            <div className="text-sm text-background/70">Try free for 30 days</div>
          </div>
        </div>
      </section>

      {/* POPULAR NEAR YOU */}
      <Carousel title="Popular near you" subtitle="What everyone's ordering today" stores={popular} icon={TrendingUp} />

      {/* TOP RATED */}
      <Carousel title="Top rated" subtitle="Hand-picked, customer-loved" stores={topRated} icon={Star} />

      <SiteFooter />
    </div>
  );
}

function Carousel({
  title, subtitle, stores: list, icon: Icon,
}: {
  title: string;
  subtitle: string;
  stores: typeof stores;
  icon: typeof Star;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 mt-14">
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-bold">
            <Icon className="w-3.5 h-3.5" /> {subtitle}
          </div>
          <h2 className="font-display text-3xl font-bold mt-1">{title}</h2>
        </div>
        <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">View all →</Link>
      </div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s, i) => (
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
  );
}
