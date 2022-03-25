document.addEventListener("DOMContentLoaded", function() {

	memory = new WebAssembly.Memory({
		initial: 1,
		maximum: 10
	});
	heap = new Uint8Array(memory.buffer);

	imports = {
		env: {
			memory: memory,
			console_log: function(arg) { console.log(arg); }
		}
	};

	request = new XMLHttpRequest();
	request.open("GET", "inc.wasm");
	request.responseType = "arraybuffer";
	request.send();

	request.onload = function() {

  	wasmSource = request.response;
		wasmModule = new WebAssembly.Module(wasmSource);
		wasmInstance = new WebAssembly.Instance(wasmModule, imports);

    console.log( wasmInstance.exports.inc(99) );

		heap[0] = 99;
		heap[1] = 99;
		heap[2] = 99;
		wasmInstance.exports.incmem();
		console.log( heap[0], heap[1], heap[2] );
	
	} // XMLHttpRequest.onload()

}, false); // document.DOMContentLoaded()