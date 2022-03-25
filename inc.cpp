#include <stdint.h>

/// allow-undefined: console_log
extern "C" void console_log(uint32_t value);

void print(uint32_t value) {
	console_log(value);
}

static uint32_t dec(uint32_t x) {
	return x - 1;
}

extern "C" uint32_t inc(uint32_t x) {
	return dec(x) + 2;
}

/// allow-undefined: memory
extern uint8_t* memory;

extern "C" void incmem() {
	memory[0]++;
}