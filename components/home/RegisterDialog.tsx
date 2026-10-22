"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function RegisterDialog({ event, cta, className }: { event: string; cta: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function open() {
    setState("idle");
    ref.current?.showModal();
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Enter your gamertag or name.";
    if (!emailRe.test(email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    window.setTimeout(() => setState("done"), 1200);
  }

  const field =
    "w-full bg-void px-4 py-3 text-snow ring-1 ring-inset ring-snow/15 placeholder:text-steel/70 transition focus:outline-none focus:ring-cyan aria-[invalid=true]:ring-[#ff5a7a]";

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {cta}
        <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
      </button>
      <dialog
        ref={ref}
        aria-labelledby={`${uid}-title`}
        className="chamfer m-auto w-[min(92vw,30rem)] bg-void-3 p-0 text-snow ring-1 ring-cyan/30 backdrop:bg-void/80 backdrop:backdrop-blur-sm [--cut:20px]"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <div className="p-7 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <p className="hud mb-2 text-cyan">{"// "}{cta}</p>
              <h2 id={`${uid}-title`} className="font-display text-2xl leading-tight font-bold uppercase">
                {event}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-10 shrink-0 place-items-center ring-1 ring-snow/20 ring-inset transition hover:bg-lime hover:text-void"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {state === "done" ? (
              <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="status">
                <p className="flex items-center gap-3 font-display text-xl font-bold text-lime uppercase">
                  <Check className="size-5" aria-hidden /> Spot reserved
                </p>
                <p className="mt-3 text-fog">
                  Thanks, {name.split(" ")[0]}. On the live platform, confirmation and next steps would be emailed to {email}.
                </p>
                <p className="hud mt-4 text-steel">Demo build — no data was sent.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate className="space-y-4" exit={{ opacity: 0 }}>
                <div>
                  <label htmlFor={`${uid}-name`} className="hud mb-2 block text-steel">
                    Gamertag / name
                  </label>
                  <input
                    id={`${uid}-name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                    autoComplete="nickname"
                    className={field}
                    placeholder="e.g. KAIRO"
                  />
                  {errors.name && (
                    <p id={`${uid}-name-err`} role="alert" className="mt-1.5 text-xs text-[#ff8aa1]">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className="hud mb-2 block text-steel">
                    Email
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                    autoComplete="email"
                    className={field}
                    placeholder="you@domain.gg"
                  />
                  {errors.email && (
                    <p id={`${uid}-email-err`} role="alert" className="mt-1.5 text-xs text-[#ff8aa1]">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-team`} className="hud mb-2 flex justify-between text-steel">
                    Team name <span className="normal-case">optional</span>
                  </label>
                  <input id={`${uid}-team`} value={team} onChange={(e) => setTeam(e.target.value)} className={field} placeholder="Solo queue is fine" />
                </div>
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="chamfer mt-2 flex w-full items-center justify-center gap-2 bg-lime px-6 py-3.5 font-display text-sm font-bold tracking-[0.14em] text-void uppercase transition-colors [--cut:12px] hover:bg-snow disabled:opacity-70"
                >
                  {state === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                  {state === "loading" ? "Transmitting" : "Confirm"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </dialog>
    </>
  );
}
