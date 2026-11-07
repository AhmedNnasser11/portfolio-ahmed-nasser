import { layers } from "@/content/layers";

// Centre of each layer in the K3 frame (clip B last frame), as % of the frame.
// Measured on public/media/posters/k3-d.avif.
const SPOTS = [
  { x: 27.5, y: 36 },
  { x: 39, y: 36 },
  { x: 48, y: 35 },
  { x: 58, y: 35 },
  { x: 64.5, y: 34 },
  { x: 76, y: 34 },
];

/**
 * Desktop-only labels on the exploded stack (CLAUDE.md §1; no labels on phones,
 * §6 rule 9). Each is a 44px+ button: it jumps to that layer's step (engine,
 * data-jump) and opens its live demo (data-demo). The box matches the frame's
 * contain-fit geometry via container query units (globals.css).
 */
export function LayerHotspots() {
  return (
    <div className="stage-hotspots" aria-label="Layers on the stack">
      {layers.map((layer, i) => (
        <button
          key={layer.id}
          type="button"
          className="stage-hotspot"
          data-jump={i}
          data-demo={layer.id}
          style={{ left: `${SPOTS[i].x}%`, top: `${SPOTS[i].y}%` } as React.CSSProperties}
        >
          <span aria-hidden="true" className="stage-hotspot-dot" />
          <span className="stage-hotspot-label">
            {layer.number} {layer.name}
          </span>
        </button>
      ))}
    </div>
  );
}
