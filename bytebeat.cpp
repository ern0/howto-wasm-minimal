#include <stdint.h>


inline uint32_t divnz(uint32_t a,uint32_t b) {
	if (b == 0) return a;
	return a / b;
} // divnz()

inline uint32_t modnz(uint32_t a,uint32_t b) {
	if (b == 0) return a;
	return a % b;
} // modnz()

extern "C" uint32_t bytebeat(uint32_t t) {

	uint32_t drum = divnz(3300,modnz(t,2000)) * 17;

	uint32_t bassline = ( modnz(t,2000*4) < (2000*1.2) ? t*4 : 0 );

	uint32_t tunfm = (t*4) | ( 4*t * (( divnz(t,2000*8) & 3) + 5) );
	uint32_t tune = ( modnz(t,2000) > (2000*0.55) ? tunfm : 0 ); 

	return drum | bassline | tune;

} // byteBeat()
