#!/bin/bash
set -e

cat \
	inc.cpp  \
	| grep "^\/\/\/ allow-undefined\:" \
	| cut -d" " -f3 \
	> /tmp/import.lst

clang++ \
	--target=wasm32 \
	-nostdlib \
	-O3 \
	-Wl,--no-entry \
	-Wl,--export-all \
	-Wl,--lto-O3 \
	-Wl,--allow-undefined-file=/tmp/import.lst \
	-Wl,--import-memory \
	-o inc.wasm \
	inc.cpp

rm -f /tmp/import.lst
rm -f inc.wasm.tmp*
hexdump inc.wasm | head -n 1
#wasm-objdump -x inc.wasm
