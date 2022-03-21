#!/bin/bash
set -e

clang \
	--target=wasm32 \
	-nostdlib \
	-O3 \
	-Wl,--no-entry \
	-Wl,--export-all \
	-Wl,--lto-O3 \
	-o inc.wasm \
	inc.c

rm -rf inc.wasm.tmp*
hexdump inc.wasm | head -n 1
#wasm-objdump -x inc.wasm
