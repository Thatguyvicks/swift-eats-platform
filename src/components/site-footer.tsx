export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-20 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-black flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
            hilldash
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Food, groceries, pharmacy & drinks — delivered hot, fresh, on time.
          </p>
        </div>
        {[
          { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
          { title: "For Partners", links: ["Become a vendor", "Drive with us", "Business orders"] },
          { title: "Help", links: ["Support", "Safety", "Terms", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold mb-3">{col.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}><a className="hover:text-foreground transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hilldash. Delivered with care.
      </div>
    </footer>
  );
}
