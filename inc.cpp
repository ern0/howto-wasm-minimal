#include "wasm-tricks.hpp"

uint8_t data[222];
import void console_log(uint32_t value);


private uint32_t dec(uint32_t x) {
	return x - 1;
}


public uint32_t inc(uint32_t x) {
	return dec(x) + 2;
}


public void print(uint32_t value) {
	console_log(value);
}

public void set_memory(uint8_t a, uint8_t b) {

	data[0] = a;
	data[1] = b;
}