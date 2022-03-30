@echo off

clang++ ^
	--target=wasm32 ^
	-nostdlib ^
	-O3 ^
	-o C:\Windows\TEMP\inc.o ^
	-c ^
	inc.cpp
	
wasm-ld ^
	--no-entry ^
	--export-all ^
	--lto-O3 ^
	--allow-undefined ^
	--import-memory ^
	C:\Windows\TEMP\inc.o ^
	-o inc.wasm
