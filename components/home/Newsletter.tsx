"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Img } from "@/components/ui/Img";
import { SectionLabel, SectionTitle } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>(["Patch notes"]);
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  function toggle(t: string) {
    setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!emailRe.test(email.trim())) return setError("That doesn't look like a valid email address.");
    if (topics.length === 0) return setError("Pick at least one channel to subscribe to.");
    setError("");
    setState("loading");
    window.setTimeout(() => setState("done"), 1200);
  }

  return (
    <section id="newsletter" className="relative overflow-hidden border-t border-cyan/20" aria-labelledby="newsletter-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Img id="1626379945538-6c8824dd898f" alt="" fill sizes="100vw" className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/90 to-void/60" />
      </div>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-32">
        <div className="lg:col-span-6">
          <SectionLabel index="06" label="Transmission" />
          <SectionTitle id="newsletter-title">
            Get the signal <span className="text-lime">first.</span>
          </SectionTitle>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg text-fog">
              Patch notes, playtest invites and ticket drops — before they hit socials. One transmission a fortnight.
              Zero spam.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <AnimatePresence mode="wait" initial={false}>
            {state === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="chamfer bg-lime p-8 text-void [--cut:20px]"
                role="status"
              >
                <p className="flex items-center gap-3 font-display text-2xl font-bold uppercase">
                  <Check className="size-6" aria-hidden /> Transmission received
                </p>
                <p className="mt-2 text-void/80">
                  You&rsquo;re subscribed to {topics.join(", ").toLowerCase()}. (Demo — nothing was actually sent.)
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
                <fieldset>
                  <legend className="hud mb-3 text-steel">Channels</legend>
                  <div className="flex flex-wrap gap-2">
                    {["Patch notes", "Esports", "Playtests", "Merch drops"].map((t) => {
                      const on = topics.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(t)}
                          className={`hud px-3 py-2 ring-1 ring-inset transition-colors ${
                            on ? "bg-cyan text-void ring-cyan" : "text-fog ring-snow/20 hover:ring-cyan/60"
                          }`}
                        >
                          {on ? "■ " : "□ "}
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label htmlFor={`${id}-email`} className="hud mt-6 mb-3 block text-steel">
                  Email address
                </label>
                <div className="chamfer flex bg-void-3 ring-1 ring-snow/15 ring-inset transition focus-within:ring-cyan [--cut:14px]">
                  <span className="hud grid place-items-center pl-4 text-cyan" aria-hidden>
                    &gt;_
                  </span>
                  <input
                    id={`${id}-email`}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-err` : undefined}
                    placeholder="player@domain.gg"
                    className="min-w-0 flex-1 bg-transparent px-3 py-4 font-mono text-sm text-snow placeholder:text-steel/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="flex items-center gap-2 bg-lime px-5 font-display text-sm font-bold tracking-[0.12em] text-void uppercase transition-colors hover:bg-snow disabled:opacity-70"
                  >
                    {state === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                    <span className="hidden sm:inline">{state === "loading" ? "Sending" : "Subscribe"}</span>
                    <span className="sr-only sm:hidden">Subscribe</span>
                  </button>
                </div>
                <p id={`${id}-err`} role={error ? "alert" : undefined} className={`mt-3 min-h-5 text-sm ${error ? "text-[#ff8aa1]" : "text-steel"}`}>
                  {error || "Unsubscribe any time."}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
