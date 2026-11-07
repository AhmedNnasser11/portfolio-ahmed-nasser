// Sliding window of decoded frames (CLAUDE.md §6 rule 4): only frames within
// ±radius of the target stay decoded; everything else is closed.
// https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap/close

const MAX_IN_FLIGHT = 4;

export class BitmapWindow {
  private bitmaps = new Map<number, ImageBitmap>();
  private pending = new Set<number>();
  private queue: number[] = [];
  private center = 0;
  private destroyed = false;

  constructor(
    private urls: string[],
    private radius: number,
  ) {}

  get(i: number): ImageBitmap | undefined {
    return this.bitmaps.get(i);
  }

  /** Closest decoded frame to `i` (searching outward), so a miss never blanks the canvas. */
  nearest(i: number): ImageBitmap | undefined {
    for (let d = 0; d <= this.radius; d++) {
      const a = this.bitmaps.get(i - d) ?? this.bitmaps.get(i + d);
      if (a) return a;
    }
    return undefined;
  }

  setCenter(i: number) {
    this.center = i;
    const lo = Math.max(0, i - this.radius);
    const hi = Math.min(this.urls.length - 1, i + this.radius);
    for (const [k, bmp] of this.bitmaps) {
      if (k < lo || k > hi) {
        bmp.close();
        this.bitmaps.delete(k);
      }
    }
    // Nearest frames first.
    const want: number[] = [];
    for (let d = 0; d <= this.radius; d++) {
      for (const k of d === 0 ? [i] : [i + d, i - d]) {
        if (k >= lo && k <= hi && !this.bitmaps.has(k) && !this.pending.has(k)) want.push(k);
      }
    }
    this.queue = want;
    this.pump();
  }

  private pump() {
    while (!this.destroyed && this.pending.size < MAX_IN_FLIGHT && this.queue.length) {
      const k = this.queue.shift()!;
      this.pending.add(k);
      this.load(k).finally(() => {
        this.pending.delete(k);
        this.pump();
      });
    }
  }

  private async load(k: number) {
    try {
      const res = await fetch(this.urls[k]);
      const blob = await res.blob();
      const bmp = await createImageBitmap(blob);
      // Decoded after leaving the window (or after destroy): close it right away.
      if (this.destroyed || Math.abs(k - this.center) > this.radius) {
        bmp.close();
        return;
      }
      this.bitmaps.get(k)?.close();
      this.bitmaps.set(k, bmp);
    } catch {
      // Network/decode error: the engine keeps showing the nearest frame.
    }
  }

  destroy() {
    this.destroyed = true;
    this.queue = [];
    for (const bmp of this.bitmaps.values()) bmp.close();
    this.bitmaps.clear();
  }
}
