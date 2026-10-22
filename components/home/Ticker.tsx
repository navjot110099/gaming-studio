const items = [
  "VOIDFALL Masters — Seoul — Nov 14–17",
  "$500,000 prize pool",
  "Season 07: Operation Blackout is live",
  "NEON DRIFT: ZERO — Update 0.9 out now",
  "ECHO PROTOCOL enters Alpha",
  "NXV Open Series #4 — registration open",
];

export function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-cyan/20 bg-cyan py-3 text-void" aria-label="Latest news">
      <ul className="flex w-max animate-ticker items-center hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center font-display text-sm font-bold tracking-[0.12em] uppercase">
            <span className="px-6">{t}</span>
            <span className="text-void/50">{"///"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
