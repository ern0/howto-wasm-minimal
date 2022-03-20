#!/bin/bash
set -e

clang \
	--target=wasm32 \
	-nostdlib \
	-Wl,--no-entry \
	-Wl,--export-all \
	-o inc.wasm \
	inc.c

wasm-objdump -x inc.wasm