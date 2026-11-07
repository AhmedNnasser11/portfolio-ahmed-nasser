# Higgsfield asset progress

Rule: every generate call needs Ahmed's OK (CLAUDE.md 0.6). Check `higgsfield generate cost …` first.

| # | Asset | Model | Settings | Credits | Balance | Job id | File | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | K1 closed laptop | nano_banana_pro | 16:9, 2k (2752×1536) | 2 | 108 | f1aea2d6-a679-45d4-81a4-285767d1d73d | keyframes/K1.png | done, accepted |
| 2a | K2 lid open (try 1) | nano_banana_pro + ref K1 | 16:9, 2k | 2 | 106 | f20a5d66-b923-4aa7-9873-3e953940b596 | keyframes/K2_try1.png | rejected: camera rotated ~30°, readable fake UI text |
| 2 | K2 lid open | nano_banana_pro + ref K1, "edit this exact image" prompt | 16:9, 2k | 2 | 104 | 0df9c752-b79d-45f4-8360-04e7eac5f7e7 | keyframes/K2.png | done, accepted (matches K1 pedestal/angle, no text) |
| 3 | K3 exploded | nano_banana_pro + refs K2, K1 | 16:9, 2k | 2 | 102 | 7b66e704-86bc-45fd-83bb-93383117aae0 | keyframes/K3.png | done, accepted (6 layers in order; gauges sit on the real lid) |
| 4a | K4 orbit 35° (try 1) | nano_banana_pro + ref K3 | 16:9, 2k | 2 | 100 | d3937f17-28c4-4983-9294-a3dd668ab7a4 | keyframes/K4_try1_noorbit.png | rejected: no orbit (≈ identical to K3) |
| 4 | K4 orbit 35° | 3d_jutsu_angles + ref K3 | 16:9, 2k (2720×1536) | 2.5 | 95.5 | 08becc64-c216-45ba-9c3b-031ee233a263 | keyframes/K4.png | done, accepted (real orbit, same 6 layers) |
| 5 | K5 phone | nano_banana_pro + ref K3 (same camera as K3, for clip D K3→K5) | 16:9, 2k | 2 | 98 | b538cc33-937c-4fcf-a024-baef8a43d3ee | keyframes/K5.png | done, accepted (phone in centre third → clean 9:16 crop) |

## Clips (Kling 3.0 `pro`, 5 s, start + end image, sound off; output 1928×1076, 24 fps, 121 frames)

| Clip | Frames | Credits | Balance | Job id | File | Status |
|---|---|---|---|---|---|---|
| B explode | K2 → K3 | 8.75 | 86.75 | b4e47893-acc7-4da9-9ffb-0338e420c5fd | clips/B.mp4 | accepted |
| A lid opens | K1 → K2 | 8.75 | 78 | 943c21e6-6212-4d49-af05-1aa8c53b27ae | clips/A.mp4 | accepted |
| D fold to phone | K3 → K5 | 8.75 | 69.25 | ad1b3236-604e-4381-9f29-1b36beedafc6 | clips/D.mp4 | accepted (mid-clip the stack flattens into a slab, then becomes the phone) |
| C orbit (desktop) | K3 → K4 | 8.75 | 60.5 | e28b94a5-d95a-417e-89d1-ef931bdf0fc6 | clips/C.mp4 | accepted. Frame-difference check in P4: the orbit is monotonic over all 121 frames, so the full clip is used |

**P3 total: 49.5 credits spent (14.5 keyframes + 35 clips). Balance 60.5.**

## Notes
- Lesson: Nano Banana Pro keeps camera/framing only with an explicit "Edit this exact image … keep X the same" prompt. It cannot orbit the camera; use `3d_jutsu_angles` for angle changes.
- K1: subject is wider than the centre third (laptop ≈ 25–71 % of the frame width), so a 9:16 centre crop cuts it. Phone posters/clips need 9:16 keyframes: re-generate at 9:16 with the 16:9 frame as image reference (≈ 2 credits each) or use `reframe`. Decide in P4.
- Background is near-black, not exactly #08090B; grade it in P4 (ffmpeg) so the edge disappears into the page.
