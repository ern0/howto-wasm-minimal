function console_log(value) {
	console.log("log: ", value);
}

function wasmInit() {

	//memory = new WebAssembly.Memory({initial: 10, maximum:100});


	importObject = {

		//js: { 
			//mem: memory
		//},
		env: { 
			console_log: function(arg) { console.log(arg); }
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
		
		console.log(wasm);
		
		var mem = new Uint32Array(wasm.data.buffer);
		mem[0] = 0;
		mem[1] = 1;
		console.log(mem[0], mem[1]);

		wasm.set_memory(11,22);
		console.log(mem[0], mem[1]);
		wasm.set_memory(111,222);
		console.log(mem[0], mem[1]);
}


document.addEventListener("DOMContentLoaded", wasmInit, false);