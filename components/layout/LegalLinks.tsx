"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";

const docs = {
  Privacy: [
    "We collect the minimum data needed to run our games, tournaments and newsletter: account identifiers, match telemetry and the email you give us.",
    "Telemetry is used to balance gameplay and detect cheating. We never sell personal data. Request a copy or deletion any time at privacy@nexusvoid.gg.",
  ],
  Terms: [
    "Use of Nexus//Void games and services is subject to our End User License Agreement and Code of Conduct.",
    "Tournament participation requires agreement to the official ruleset for each event, including anti-cheat and fair-play requirements.",
  ],
  "Code of Conduct": [
    "Play hard, play fair. Harassment, hate speech, cheating and match-fixing result in account and tournament bans.",
    "Report players in-game or via our Discord moderation team — every report is reviewed by a human.",
  ],
} as const;

type Doc = keyof typeof docs;

export function LegalLinks() {
  const ref = useRef<HTMLDialogElement>(null);
  const [doc, setDoc] = useState<Doc>("Privacy");
  return (
    <>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {(Object.keys(docs) as Doc[]).map((d) => (
          <li key={d}>
            <button
              type="button"
              onClick={() => {
                setDoc(d);
                ref.current?.showModal();
              }}
              className="transition-colors hover:text-cyan"
            >
              {d}
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={ref}
        aria-labelledby="legal-title"
        className="chamfer m-auto w-[min(92vw,34rem)] bg-void-3 p-0 text-snow ring-1 ring-cyan/30 backdrop:bg-void/80 backdrop:backdrop-blur-sm [--cut:20px]"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <div className="p-8">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <p className="hud mb-2 text-cyan">{"// "}Legal</p>
              <h2 id="legal-title" className="font-display text-3xl font-bold uppercase">
                {doc}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-10 place-items-center ring-1 ring-snow/20 ring-inset transition hover:bg-lime hover:text-void"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="space-y-4 leading-relaxed text-fog">
            {docs[doc].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
