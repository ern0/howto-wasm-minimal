document.addEventListener("DOMContentLoaded", main, false);


function wasmLoad(fileName) {

	var memory = new WebAssembly.Memory({ initial: 100, maximum: 1000 });
	heap = new Uint8Array(memory.buffer);

	var imports = {
		env: {
			console_log: function(arg) { console.log(arg); },
			memory: memory,
		}
	};

	var request = new XMLHttpRequest();
	request.open("GET", fileName);
	request.responseType = "arraybuffer";
	request.send();

	request.onload = function() {

		var wasmSource = request.response;
		var wasmModule = new WebAssembly.Module(wasmSource);
		var wasmInstance = new WebAssembly.Instance(wasmModule, imports);
		wasm = wasmInstance.exports;

		wasmLoadDone();
	
	} // XMLHttpRequest.onload()
} // loadWasm()


function wasmSimpleTest() {

	console.log( wasm.inc(99) );

	heap[0] = 99; heap[1] = 99; heap[2] = 99;
	wasm.incmem();
	console.log( heap[0], heap[1], heap[2] );

} // wasmSimpleTest()


function imageLoad() {

	img = new Image();
	img.crossOrigin = 'anonymous';
	img.src = "volt.jpg";
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		img.style.display = "none";
		imageLoadDone();
	};

} // imageLoad()


function prepareCanvas() {
	
	var title = document.getElementById("title");
	title.innerHTML = img.width + " x " + img.height;
	
	ctx.width = img.width;
	ctx.width = img.height * 2;

	imageProcMode = 0;
}


function imageProc() {

	imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	count = canvas.width * canvas.height * 4;

	for (var i = 0; i < count; i++) {
		heap[i] = imageData.data[i];
	}
	
	switch (imageProcMode) {
		case 0:
			wasm.gray(canvas.width, canvas.height);
			break;
		case 1: 
			wasm.swaprg(canvas.width, canvas.height);
			break;
		default:
			imageProcMode = -1;
	}
	imageProcMode++;

	for (var i = 0; i < count; i++) {
		imageData.data[i] = heap[i];
	}
	ctx.putImageData(imageData, 0, img.height);

}

//===============================================================
function main() { 
	wasmLoad("inc.wasm"); 
}
function wasmLoadDone() {
	wasmSimpleTest();
	imageLoad();
}
function imageLoadDone() {
	prepareCanvas();
	carousel();
}
function carousel() {
	imageProc();
	setTimeout(carousel,1000);
}
