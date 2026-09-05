#!/bin/bash
# Frames -> looping web video with a soft bloom added in post.
set -e
SP="$(cd "$(dirname "$0")" && pwd)"
IN="${FRAMES_DIR:-$SP/anim}/frame_%04d.png"
DEST="$(cd "$(dirname "$0")/../.." && pwd)/assets"
BLOOM="split[a][b];[b]gblur=sigma=26[c];[a][c]blend=all_mode=screen:all_opacity=0.45,scale=1280:720,format=yuv420p"
ffmpeg -y -v error -framerate 24 -i "$IN" -vf "$BLOOM" -c:v libx264 -preset slow -crf 24 -movflags +faststart -an "$DEST/ambient.mp4"
ffmpeg -y -v error -framerate 24 -i "$IN" -vf "$BLOOM" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -an "$DEST/ambient.webm"
ls -la "$DEST"/ambient.*
