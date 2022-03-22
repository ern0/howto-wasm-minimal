function wasmInit() {

	importObject = {
		imports: {
			imported_func: function(arg) {
				console.log(arg);
			}
		},

		env: { 
			console_log: console_log,
			__memory_base: 0,
			__table_base: 0,
			__stack_pointer: new WebAssembly.Global({value:"i32", mutable:true} ,0),
			__linear_memory: new WebAssembly.Memory({initial: 1}),
		}

	}; // importObject

	request = new XMLHttpRequest();
	request.open("GET", "inc.wasm");
	request.responseType = "arraybuffer";
	request.send();

	request.onload = function() {
		bytes = request.response;
		WebAssembly.instantiate(bytes, importObject).then( 
			function(results) {
				wasm = results.instance.exports;

				wasmTest();

			} // function
		); // then
	}; // request.onload()

} // initWasm()


function wasmTest() {

		console.log( wasm.inc(99) );

		try {
			console.log( "fail, should not call private:", results.instance.exports.dec(99) );
		} catch (e) {
			console.log("pass, calling private occurs exception")
		}

		wasm.test(33);

}

function console_log(value) {
	console.log("log: ", value);
}