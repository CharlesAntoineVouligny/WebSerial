https://fidisys.com/blog/serial-port-devices/

if ("serial" in navigator) {
  console.log("Awesome, The serial port is supported.")
  // The Web Serial API is supported.
}

async function test() {
    const port = await navigator.serial.requestPort();
}

