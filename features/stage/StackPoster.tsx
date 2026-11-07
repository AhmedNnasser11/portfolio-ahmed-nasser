/**
 * P2 placeholder for the K3 poster (screen exploded into six floating layers).
 * Replaced by the real AVIF <picture> / canvas stage in P4–P5.
 */
const PANELS = [
  { stroke: "rgba(242,243,245,.5)", fill: "rgba(17,20,27,.92)" },
  { stroke: "rgba(110,155,255,.7)", fill: "rgba(14,16,21,.9)", dash: "6 5" },
  { stroke: "rgba(143,179,255,.5)", fill: "rgba(14,16,21,.9)" },
  { stroke: "rgba(110,155,255,.45)", fill: "rgba(14,16,21,.88)" },
  { stroke: "rgba(199,166,255,.5)", fill: "rgba(14,16,21,.88)" },
  { stroke: "rgba(110,155,255,.8)", fill: "rgba(11,12,16,.95)" },
];

export function StackPoster({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-label="A website taken apart into six floating layers (placeholder for the product render)"
      className={className}
    >
      <defs>
        <radialGradient id="sp-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#6e9bff" stopOpacity=".18" />
          <stop offset="1" stopColor="#6e9bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="320" cy="420" rx="240" ry="36" fill="url(#sp-glow)" />
      {PANELS.map((p, i) => {
        // front panel (i = 0) lowest, back circuit board (i = 5) highest
        const y = 330 - i * 50;
        return (
          <path
            key={i}
            d={`M150 ${y} L380 ${y - 40} L500 ${y + 4} L270 ${y + 44} Z`}
            fill={p.fill}
            stroke={p.stroke}
            strokeWidth="1.4"
            strokeDasharray={p.dash}
          />
        );
      }).reverse()}
      <circle cx="325" cy="82" r="5" fill="#6e9bff" />
    </svg>
  );
}
