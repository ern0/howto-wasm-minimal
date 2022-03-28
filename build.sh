#!/bin/bash
set -e

clang++ -v \
	--target=wasm32 \
	-nostdlib \
	-O3 \
	-fuse-ld /usr/local/opt/llvm/bin/wasm-ld \
	-Wl,--no-entry \
	-Wl,--export-all \
	-Wl,--lto-O3 \
	-Wl,--allow-undefined \
	-Wl,--import-memory \
	-o inc.wasm \
	inc.cpp

hexdump inc.wasm | head -n 1
#wasm-objdump -x inc.wasm
