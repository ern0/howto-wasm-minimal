#!/bin/bash
set -e

clang++ \
	--target=wasm32 \
	-nostdlib \
	-O3 \
	-o /tmp/inc.o \
	-c \
	inc.cpp
	
wasm-ld \
	--no-entry \
	--export-all \
	--lto-O3 \
	--allow-undefined \
	--import-memory \
	/tmp/inc.o \
	-o inc.wasm

hexdump inc.wasm | head -n 1
#wasm-objdump -x inc.wasm
