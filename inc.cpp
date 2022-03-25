#include <stdint.h>

extern "C" void console_log(uint32_t value);
extern uint8_t memory;

void print(uint32_t value) {
	console_log(value);
}

static uint32_t dec(uint32_t x) {
	return x - 1;
}

extern "C" uint32_t inc(uint32_t x) {
	return dec(x) + 2;
}

extern "C" void incmem() {
	
	uint8_t* ptr = &memory;

	ptr[0] += 1;
	ptr[1] += 10;
	ptr[2] += 100;
}