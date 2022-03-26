#include <stdint.h>

extern "C" void console_log(uint32_t value);
extern uint8_t memory;

static void print(uint32_t value) {
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

extern "C" void gray(int width, int height) {

	uint8_t* ptr = &memory;

	for (int i = 0; i < width * height * 4; i += 4) {

		uint32_t sum = ptr[i] + ptr[i+1] + ptr[i+2];
		uint32_t avg = sum / 3;
		ptr[i] = avg;
		ptr[i+1] = avg;
		ptr[i+2] = avg;

	}
}