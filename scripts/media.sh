#!/usr/bin/env bash
# P4 media pipeline (CLAUDE.md §5–6, docs/PLAN.md §3). Run in Git Bash from the repo root:
#   bash scripts/media.sh
# Sources: assets-src/clips/{A,B,C,D}.mp4 (Kling 3.0, 1928×1076, 24 fps, 121 frames)
# Output:  public/media/clips/<clip>/{d,m}/NNN.webp, public/media/posters/*.avif,
#          public/media/manifest.json, and a weight report.
set -euo pipefail

FFMPEG="${FFMPEG:-$(command -v ffmpeg || true)}"
if [ -z "$FFMPEG" ]; then
  FFMPEG="$LOCALAPPDATA/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg.exe"
fi
[ -x "$FFMPEG" ] || { echo "ffmpeg not found (set FFMPEG=...)" >&2; exit 1; }
ff() { "$FFMPEG" -hide_banner -loglevel error -y "$@"; }

SRC=assets-src/clips
OUT=public/media
FPS="${FPS:-15}"          # 12–15 fps is enough for scroll scrubbing (PLAN §3)
Q_DESKTOP="${Q_DESKTOP:-75}"
Q_PHONE="${Q_PHONE:-70}"

# Lift pure black (0,0,0) to the page background #08090B so the frame edge disappears.
GRADE="lutrgb=r='8+val*247/255':g='9+val*246/255':b='11+val*244/255'"
# Feather the frame edges to black (smoothstep over the outer 10% of the width / 8% of the height)
# before the lift, so the studio gradient never shows a rectangle against the page.
F="(st(0,clip(min(min(X,W-X)/(W*0.10),min(Y,H-Y)/(H*0.08)),0,1));ld(0)*ld(0)*(3-2*ld(0)))"
EDGE="geq=r='r(X,Y)*$F':g='g(X,Y)*$F':b='b(X,Y)*$F'"
# Phone: wide centre crop (the subject is wider than a 9:16 crop allows); black blends into the page.
PHONE_CROP="crop=1280:1076:320:0"   # x 320–1600 covers the K1 pedestal (333–1508) and the K3 stack (393–1575)

rm -rf "$OUT/clips" "$OUT/posters"
mkdir -p "$OUT/posters"

# clip -> devices (C is desktop only: no orbit on phones, §6 rule 9)
declare -A DEVICES=( [a]="d m" [b]="d m" [c]="d" [d]="d m" )
manifest="{\n  \"fps\": $FPS,\n  \"clips\": {"
first=1
for clip in a b c d; do
  src="$SRC/${clip^^}.mp4"
  entry="\n    \"$clip\": {"
  dfirst=1
  for dev in ${DEVICES[$clip]}; do
    dir="$OUT/clips/$clip/$dev"; mkdir -p "$dir"
    if [ "$dev" = d ]; then
      vf="fps=$FPS,format=rgb24,scale=1600:-2:flags=lanczos,$EDGE,$GRADE"; q=$Q_DESKTOP
    else
      vf="fps=$FPS,format=rgb24,$PHONE_CROP,scale=720:-2:flags=lanczos,$EDGE,$GRADE"; q=$Q_PHONE
    fi
    ff -i "$src" -vf "$vf" -c:v libwebp -quality "$q" -compression_level 6 -preset picture -an "$dir/%03d.webp"
    count=$(ls "$dir" | wc -l | tr -d ' ')
    # ffmpeg exits 1 without an output file; we only want the stream info it prints.
    dims=$( { "$FFMPEG" -hide_banner -i "$dir/001.webp" 2>&1 || true; } | grep -oE '[0-9]{3,4}x[0-9]{3,4}' | head -1)
    w=${dims%x*}; h=${dims#*x}
    [ $dfirst -eq 1 ] || entry+=","
    entry+="\n      \"$dev\": { \"count\": $count, \"width\": $w, \"height\": $h }"
    dfirst=0
  done
  entry+="\n    }"
  [ $first -eq 1 ] || manifest+=","
  manifest+="$entry"; first=0
done
manifest+="\n  }\n}\n"
printf "$manifest" > "$OUT/manifest.json"

# Posters = exact clip frames so poster and canvas match pixel for pixel:
# K1 = first frame of A, K3 = last frame of B, K5 = last frame of D.
poster() { # name src select(first|last)
  local name=$1 src=$2 which=$3 sel
  if [ "$which" = first ]; then sel=(-i "$src" -frames:v 1); else sel=(-sseof -0.05 -i "$src" -frames:v 1); fi
  ff "${sel[@]}" -vf "format=rgb24,scale=1600:-2:flags=lanczos,$EDGE,$GRADE,format=yuv444p" \
    -c:v libaom-av1 -still-picture 1 -crf 30 -cpu-used 4 "$OUT/posters/$name-d.avif"
  ff "${sel[@]}" -vf "format=rgb24,$PHONE_CROP,scale=720:-2:flags=lanczos,$EDGE,$GRADE,format=yuv444p" \
    -c:v libaom-av1 -still-picture 1 -crf 30 -cpu-used 4 "$OUT/posters/$name-m.avif"
}
poster k1 "$SRC/A.mp4" first
poster k3 "$SRC/B.mp4" last
poster k5 "$SRC/D.mp4" last

# Weight report
kb() { du -sk --apparent-size "$1" | cut -f1; }
echo "== weight report (fps=$FPS, q desktop=$Q_DESKTOP phone=$Q_PHONE)"
for clip in a b c d; do
  for dev in ${DEVICES[$clip]}; do
    d="$OUT/clips/$clip/$dev"
    printf "clip %s %-2s %3s frames  %5s KB\n" "$clip" "$dev" "$(ls "$d" | wc -l | tr -d ' ')" "$(kb "$d")"
  done
done
printf "desktop total (a b c d): %s KB\n" "$(( $(kb $OUT/clips/a/d) + $(kb $OUT/clips/b/d) + $(kb $OUT/clips/c/d) + $(kb $OUT/clips/d/d) ))"
printf "phone total   (a b d):   %s KB\n" "$(( $(kb $OUT/clips/a/m) + $(kb $OUT/clips/b/m) + $(kb $OUT/clips/d/m) ))"
ls -l "$OUT/posters" | awk 'NR>1 {printf "poster %-10s %6.1f KB\n", $9, $5/1024}'
