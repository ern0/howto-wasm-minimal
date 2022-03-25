function console_log(value) {
	console.log("log: ", value);
}

function wasmInit() {

	//memory = new WebAssembly.Memory({initial:10, maximum:100});

	WebAssembly.instantiateStreaming(fetch('inc.wasm'), { 
		
		//js: { mem: memory } ,
		
		env: { 
			console_log: function(arg) { console.log(arg); }
		}

	}).then(obj => {

		wasm = obj.instance.exports;
		wasmTest();

	});
}


function wasmTest() {

		console.log( wasm.inc(99) );
		wasm.print(33);
		
}


document.addEventListener("DOMContentLoaded", wasmInit, false);