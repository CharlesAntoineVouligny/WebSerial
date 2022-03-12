https://fidisys.com/blog/serial-port-devices/

if ("serial" in navigator) {
  console.log("Awesome, The serial port is supported.")
  // The Web Serial API is supported.
}

async function connect() {
  // Prompts user for device
  const port = await navigator.serial.requestPort();
  
  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 });


  // Listen to data coming from the serial device.
  const textDecoder = new TextDecoderStream();
  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
  const reader = textDecoder.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      reader.releaseLock();
      break;
    }
    // value is a string will be streaming here.
    console.log(value);
  }
}
