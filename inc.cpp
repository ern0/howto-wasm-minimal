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

extern "C" void swaprg(int width, int height) {
	uint8_t* ptr = &memory;
	for (int i = 0; i < width * height * 4; i += 4) {

		uint32_t r = ptr[i];
		ptr[i] = ptr[i+1];
		ptr[i+1] = r;

	}
}

extern "C" void swap_red(int width, int height, int color_mask) {
	uint8_t* ptr = &memory;
	for (int i = 0; i < width * height * 4; i += 4) {

		uint32_t r = ptr[i];

		if ((color_mask & 0x04) == 0) {
			if (color_mask & 0x02) {
				ptr[i] = ptr[i + 1];
			} else {
				ptr[i] = ptr[i + 2];
			}
		}
		if (color_mask & 0x02) ptr[i + 1] = r;
		if (color_mask & 0x01) ptr[i + 2] = r;
	}
}

extern "C" void blur(int width, int height) {

	uint8_t* tgt = &memory;
	uint8_t* src = tgt + (width * height * 4);

	for (int i = 0; i < (width * height * 4); i++) {
		src[i] = tgt[i];
	}

	for (int row = 1; row < height - 1; row++) {
		for (int col = 1; col < width; col++) {

			int r = 0;
			int g = 0;
			int b = 0;

			int i = (((row + 0) * width) + (col + 0)) * 4; 
			r += 4 * src[i + 0];
			g += 4 * src[i + 1];
			b += 4 * src[i + 2];

			i = (((row + 1) * width) + (col + 0)) * 4; 
			r += 2 * src[i + 0];
			g += 2 * src[i + 1];
			b += 2 * src[i + 2];

			i = (((row - 1) * width) + (col + 0)) * 4; 
			r += 2 * src[i + 0];
			g += 2 * src[i + 1];
			b += 2 * src[i + 2];

			i = (((row + 0) * width) + (col + 1)) * 4; 
			r += 2 * src[i + 0];
			g += 2 * src[i + 1];
			b += 2 * src[i + 2];

			i = (((row + 0) * width) + (col - 1)) * 4; 
			r += 2 * src[i + 0];
			g += 2 * src[i + 1];
			b += 2 * src[i + 2];

			i = (((row - 1) * width) + (col - 1)) * 4; 
			r += 1 * src[i + 0];
			g += 1 * src[i + 1];
			b += 1 * src[i + 2];

			i = (((row + 1) * width) + (col - 1)) * 4; 
			r += 1 * src[i + 0];
			g += 1 * src[i + 1];
			b += 1 * src[i + 2];

			i = (((row - 1) * width) + (col + 1)) * 4; 
			r += 1 * src[i + 0];
			g += 1 * src[i + 1];
			b += 1 * src[i + 2];

			i = (((row + 1) * width) + (col + 1)) * 4; 
			r += 1 * src[i + 0];
			g += 1 * src[i + 1];
			b += 1 * src[i + 2];

			i = (((row + 0) * width) + (col + 0)) * 4; 
			tgt[i + 0] = r / 16;
			tgt[i + 1] = g / 16;
			tgt[i + 2] = b / 16;

		}
	}
}