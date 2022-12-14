#!/bin/bash
set -e

clang++ \
	--target=wasm32 \
	-nostdlib \
	-O3 \
	-o /tmp/bytebeat.o \
	-c \
	bytebeat.cpp

wasm-ld \
	--no-entry \
	--export-all \
	--lto-O3 \
	--allow-undefined \
	--import-memory \
	/tmp/bytebeat.o \
	-o bytebeat.wasm

rm -rf bytebeat.wasm.tmp*
hexdump bytebeat.wasm | head -n 1
#wasm-objdump -x inc.wasm
