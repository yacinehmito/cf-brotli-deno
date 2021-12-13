const wasmInstance = new WebAssembly.Instance(WASM, {});
const wasm = wasmInstance.exports;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (
    cachegetUint8Memory0 === null ||
    cachegetUint8Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

/**
 * @param {Uint8Array} input
 * @param {number} buffer_size
 * @param {number} quality
 * @param {number} lgwin
 * @returns {Uint8Array}
 */
function compress(input, buffer_size, quality, lgwin) {
  try {
    const retptr = wasm.__wbindgen_export_0.value - 16;
    wasm.__wbindgen_export_0.value = retptr;
    const ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.compress(retptr, ptr0, len0, buffer_size, quality, lgwin);
    const r0 = getInt32Memory0()[retptr / 4 + 0];
    const r1 = getInt32Memory0()[retptr / 4 + 1];
    const v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_export_0.value += 16;
  }
}

/**
 * @param {Uint8Array} input
 * @param {number} buffer_size
 * @returns {Uint8Array}
 */
function decompress(input, buffer_size) {
  try {
    const retptr = wasm.__wbindgen_export_0.value - 16;
    wasm.__wbindgen_export_0.value = retptr;
    const ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.decompress(retptr, ptr0, len0, buffer_size);
    const r0 = getInt32Memory0()[retptr / 4 + 0];
    const r1 = getInt32Memory0()[retptr / 4 + 1];
    const v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_export_0.value += 16;
  }
}

async function handleRequest(request) {
  const blob = await request.blob();
  const uncompressed = new Uint8Array(await blob.arrayBuffer());
  const compressed = compress(uncompressed, 4096, 9, 20);
  return new Response(compressed, {
    headers: {
      "content-type": "application/octet-stream",
    },
  });
}

addEventListener("fetch", (event) => {
  return event.respondWith(handleRequest(event.request));
});
