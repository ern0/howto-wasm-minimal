#include <stdint.h>
#define EXPORT __attribute__(( visibility("default") )) 

EXPORT uint32_t inc(uint32_t x) {
	return x + 1;
}
