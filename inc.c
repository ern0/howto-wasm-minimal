#include <stdint.h>
#define PRIVATE static
#define PUBLIC /* */

PRIVATE uint32_t dec(uint32_t x) {
	return x - 1;
}

PUBLIC uint32_t inc(uint32_t x) {
	return dec(x) + 2;
}
