/**
 * P2 placeholder for the K1 poster (closed laptop on a pedestal).
 * Replaced by the real AVIF <picture> after P3/P4. Pure SVG: no request, no JS.
 */
export function LaptopPoster({
  className = "",
  idPrefix = "lp",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const lid = `${idPrefix}-lid`;
  const rim = `${idPrefix}-rim`;
  const floor = `${idPrefix}-floor`;
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label="Closed laptop on a black pedestal (placeholder for the product render)"
      className={className}
    >
      <defs>
        <linearGradient id={lid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1e27" />
          <stop offset="1" stopColor="#0e1015" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e9bff" stopOpacity="0" />
          <stop offset=".5" stopColor="#6e9bff" stopOpacity=".9" />
          <stop offset="1" stopColor="#6e9bff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={floor} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#6e9bff" stopOpacity=".16" />
          <stop offset="1" stopColor="#6e9bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="320" cy="318" rx="250" ry="34" fill={`url(#${floor})`} />
      <path
        d="M150 268 L490 268 L470 304 L170 304 Z"
        fill="#0e1015"
        stroke="rgba(255,255,255,.09)"
      />
      <path d="M150 268 L490 268" stroke={`url(#${rim})`} strokeWidth="1.5" />
      <path
        d="M196 246 L420 214 L478 240 L252 274 Z"
        fill={`url(#${lid})`}
        stroke="rgba(255,255,255,.14)"
      />
      <path
        d="M252 274 L478 240 L478 246 L252 281 Z"
        fill="#08090b"
        stroke="rgba(255,255,255,.09)"
      />
      <path d="M196 246 L252 274 L252 281 L196 252 Z" fill="#0b0c10" />
      <path d="M196 246 L420 214" stroke={`url(#${rim})`} strokeWidth="1.2" />
    </svg>
  );
}
