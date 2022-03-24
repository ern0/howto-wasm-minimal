function console_log(value) {
	console.log("log: ", value);
}

function wasmInit() {

	mem = new WebAssembly.Memory({initial: 10});

	importObject = {

		env: { 
			console_log: function(arg) { console.log(arg); },

		'memoryBase': 0,
		'tableBase': 0,
		'memory': new WebAssembly.Memory({initial: 256}),
		'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'})

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

} // wasmInit()


function wasmTest() {

		console.log( wasm.inc(99) );

		try {
			console.log( "fail, should not call private:", results.instance.exports.dec(99) );
		} catch (e) {
			console.log("pass, calling private occurs exception")
		}

		wasm.print(33);
		mem[0] = 11;
		mem[1] = 22;
		wasm.print_mem();

		console.log(mem[0], mem[1]);
}


document.addEventListener("DOMContentLoaded", wasmInit, false);