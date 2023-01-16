(module
  (type (;0;) (func))
  (type (;1;) (func (param i32) (result i32)))
  (import "env" "memory" (memory (;0;) 2))
  (func $__wasm_call_ctors (type 0))

  (func $bytebeat (type 1) (param i32) (result i32)
    (local i32 i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        i32.const 2000
        i32.rem_u
        local.tee 1
        br_if 0 (;@2;)
        i32.const 56100
        local.set 2
        br 1 (;@1;)
      end
      i32.const 3300
      local.get 1
      i32.div_u
      i32.const 17
      i32.mul
      local.set 2
    end
    local.get 0
    i32.const 16000
    i32.div_u
    i32.const 3
    i32.and
    i32.const 5
    i32.add
    local.get 0
    i32.const 2
    i32.shl
    local.tee 3
    i32.mul
    local.get 3
    i32.or
    local.get 3
    i32.const 0
    local.get 0
    i32.const 8000
    i32.rem_u
    i32.const 2400
    i32.lt_u
    select
    local.get 1
    i32.const 1100
    i32.gt_u
    select
    local.get 2
    i32.or)

    
  (global $__stack_pointer (mut i32) (i32.const 66560))
  (global (;1;) i32 (i32.const 1024))
  (global (;2;) i32 (i32.const 1024))
  (global (;3;) i32 (i32.const 1024))
  (global (;4;) i32 (i32.const 66560))
  (global (;5;) i32 (i32.const 0))
  (global (;6;) i32 (i32.const 1))
  (export "__wasm_call_ctors" (func $__wasm_call_ctors))
  (export "bytebeat" (func $bytebeat))
  (export "__dso_handle" (global 1))
  (export "__data_end" (global 2))
  (export "__global_base" (global 3))
  (export "__heap_base" (global 4))
  (export "__memory_base" (global 5))
  (export "__table_base" (global 6)))
