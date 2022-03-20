#!/bin/bash

clang --target=wasm32-unknown-wasi -c inc.c -o inc.wasm
