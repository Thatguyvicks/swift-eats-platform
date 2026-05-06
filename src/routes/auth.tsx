import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/state/auth";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  validateSearch: (s: Record<string, unknown>) => ({ redirect: (s.redirect as string) || "/" }),
  head: () => ({ meta: [{ title: "Sign in — Hilldash" }] }),
});

function AuthPage() {
  const { user, signIn, signUp, loading } = useAuth();
  const search = Route.useSearch();
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav({ to: search.redirect });
  }, [loading, user, nav, search.redirect]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setBusy(true);
    const res = mode === "in"
      ? await signIn(email, password)
      : await signUp(email, password, fullName);
    setBusy(false);
    if (res.error) setErr(res.error);
  };

  return (
    <div className="min-h-screen bg-background grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-foreground text-background relative overflow-hidden">
        <Link to="/" className="font-display text-3xl font-black flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" /> hilldash
        </Link>
        <div>
          <h2 className="font-display text-5xl font-black leading-tight">
            Anything you crave.<br/><span className="text-primary italic">Delivered live.</span>
          </h2>
          <p className="mt-4 text-background/70 max-w-md">
            Food, groceries, pharmacy & drinks from local stores. Real-time tracking from kitchen to door.
          </p>
        </div>
        <div className="text-xs text-background/50">© Hilldash {new Date().getFullYear()}</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={submit} className="w-full max-w-sm">
          <Link to="/" className="lg:hidden mb-8 inline-flex items-center gap-2 font-display text-2xl font-black">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" /> hilldash
          </Link>
          <h1 className="font-display text-4xl font-black">{mode === "in" ? "Welcome back" : "Create account"}</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            {mode === "in" ? "Sign in to continue ordering." : "It takes less than a minute."}
          </p>

          <div className="mt-7 space-y-3">
            {mode === "up" && (
              <Field label="Full name">
                <input required value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </Field>
            )}
            <Field label="Email">
              <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </Field>
            <Field label="Password">
              <input required type="password" minLength={6}
                autoComplete={mode === "in" ? "current-password" : "new-password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </Field>
          </div>

          {err && <p className="mt-3 text-sm text-destructive">{err}</p>}

          <button disabled={busy}
            className="mt-5 w-full rounded-full bg-primary text-primary-foreground font-semibold py-3.5 shadow-pop hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60">
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
          </button>

          <div className="mt-5 text-sm text-center text-muted-foreground">
            {mode === "in" ? "New to Hilldash?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setErr(null); }}
              className="text-primary font-semibold">
              {mode === "in" ? "Create an account" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}
