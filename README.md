# howto-wasm-minimal

*How to create minimal wasm module - PoC*


## Goals

- use no Emscripten or any libs
- simple toolchain, 
  compile to wasm in a single step 
- wasm may use memory prepared by JavaScript
- do something relative compute-intensive
- do something visible


## Mystic issue

Symptom: on *some* systems, the linker
may hang, or produce output file with 
correct size but full of zeros 
(that's why build script contains a
hexdump as last step).

Solution: update your linker.

More info: https://stackoverflow.com/questions/71573019/cant-compile-to-wasm-on-linux


## Install

You need CLANG and CLANG's linker (LLD).
Tested on versions 13 and 14.

Debian nightly pacakges: https://apt.llvm.org/

On MacOS, you should install CLANG from homebrew.
More info on Mac troubleshooting: https://til.simonwillison.net/webassembly/compile-to-wasm-llvm-macos

On Windows, you may use Chocolatey
package manager to install CLANG: https://chocolatey.org/


## Summary

## Why WASM?

Writing web app in any language
which is not JavaScript is just 
pure joy.

## Try it

The color change and the blur effect is a
WASM module, written in C:

http://linkbroker.hu/stuff/howto-wasm-minimal/
