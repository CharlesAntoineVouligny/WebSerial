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
}



