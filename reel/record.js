() => {
  // Reel driver: boot stage + warm frames during intro, wait intro end + 3 s,
  // then a paced scroll: teardown, 6 inspect steps (with holds), reassemble, sections.
  window.__rec = { phase: "start", t0: performance.now() };
  const log = (phase) => (window.__rec.phase = phase);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const desktop = innerWidth >= 1024;

  const scrollTween = (to, ms, onFrame) =>
    new Promise((resolve) => {
      const from = scrollY;
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min((now - t0) / ms, 1);
        window.scrollTo({ top: Math.round(from + (to - from) * ease(t)), behavior: "instant" });
        onFrame?.(t);
        if (t < 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });

  const run = async () => {
    // Boot the stage engine without skipping the intro (Shift is not a scroll key).
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Shift" }));

    // Warm every frame the stage will need into the HTTP cache.
    const warm = (async () => {
      try {
        const m = await (await fetch("/media/manifest.json")).json();
        const dev = desktop ? "d" : "m";
        const urls = [];
        for (const [c, info] of Object.entries(m.clips)) {
          if (!info[dev]) continue;
          for (let i = 1; i <= info[dev].count; i++)
            urls.push(`/media/clips/${c}/${dev}/${String(i).padStart(3, "0")}.webp`);
        }
        let k = 0;
        await Promise.all(
          Array.from({ length: 6 }, async () => {
            while (k < urls.length) await fetch(urls[k++]).catch(() => {});
          }),
        );
        window.__rec.frames = urls.length;
      } catch (e) {
        window.__rec.warmErr = String(e);
      }
    })();

    log("intro");
    await wait(1500);
    const t = performance.now();
    while (document.documentElement.dataset.intro !== "done" &&performance.now() - t < 25000) await wait(100);
    window.__rec.introEnd = Math.round(performance.now() - window.__rec.t0);
    window.__rec.introAt = performance.now();
    log("hold");
    await Promise.all([wait(1500), warm]);

    const layers = document.getElementById("layers");
    const header = document.querySelector("header.sticky");
    const tabbar = document.querySelector('nav[aria-label="Sections"]');
    const top = layers.getBoundingClientRect().top + scrollY;
    const s = top - (header?.offsetHeight ?? 0);
    const e = top + layers.offsetHeight - (innerHeight - (tabbar?.offsetHeight ?? 0));
    const y = (p) => Math.round(s + p * (e - s));
    const B_END = 0.33, HOLD_END = 0.88, STEP = (HOLD_END - B_END) / 6;

    // Desktop: sweep the pointer to orbit the stack (clip C) during inspect.
    const orbit = (x) =>
      desktop && window.dispatchEvent(new PointerEvent("pointermove", { clientX: x * innerWidth, clientY: innerHeight / 2 }));

    log("to-stage");
    await scrollTween(y(0), 1600);
    await wait(200);
    log("teardown");
    await scrollTween(y(B_END - 0.005), 1600);
    await wait(300);
    log("inspect");
    for (let i = 0; i < 6; i++) {
      const a = i / 6, b = (i + 1) / 6;
      await scrollTween(y(B_END + (i + 0.5) * STEP), 500, (t) => orbit(0.15 + 0.7 * (a + (b - a) * t)));
      await wait(300);
    }
    log("assemble");
    await scrollTween(y(HOLD_END + 0.005), 800, () => orbit(0.85));
    await scrollTween(y(1), 2400);
    await wait(300);
    log("sections");
    // content-visibility sections grow as they render: chase the live bottom.
    const maxY = () => document.documentElement.scrollHeight - innerHeight;
    await new Promise((resolve) => {
      const V = 0.8; // px per ms at cruise
      let pos = scrollY, last = performance.now(), t0 = last;
      const step = (now) => {
        const dt = now - last; last = now;
        const left = maxY() - pos;
        const ramp = Math.min(1, (now - t0) / 600); // ease in
        const brake = Math.min(1, Math.max(0.06, left / 400)); // ease out near bottom
        pos = Math.min(maxY(), pos + V * dt * ramp * brake);
        window.scrollTo({ top: Math.round(pos), behavior: "instant" });
        if (maxY() - pos > 1) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
    window.__rec.endAt = performance.now();
    log("done");
    window.__rec.total = Math.round(performance.now() - window.__rec.t0);
  };
  run().catch((err) => {
    window.__rec.err = String(err);
    log("done");
  });
  return "started";
}
