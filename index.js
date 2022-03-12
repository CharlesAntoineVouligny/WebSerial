
// First check if the browser is supported
if (!("serial" in navigator)) {
    // The Web Serial API is not supported.
    document.getElementById("warningLabel").innerHTML = "Try with Google Chrome or Microsoft Edge! Your current browser in unsupported."
  }

  if ("serial" in navigator) {
    console.log("Awesome, The serial port is supported.")
    // The Web Serial API is supported.
  }

  var port;
  var buffy = new ArrayBuffer(1);
  var writer;
  buffy[0]=10;
  async function test() {
      const requestOptions = {
        // Filter on devices with the Arduino USB vendor ID.
        //filters: [{ vendorId: 0x2341 }],
      };
  
      // Request an Arduino from the user.
      port = await navigator.serial.requestPort(requestOptions);
  
      // Open and begin reading.
      await port.open({ baudrate: 9600 });
      //const reader = port.in.getReader();
      const reader = port.readable.getReader();
      writer = port.writable.getWriter();
      //const writer = port.writable.getWriter();
      //writer.write(buffy);
      while (true) {
        const {done, data} = await reader.read();
        if (done) break;
        console.log(data);
      }
  } // end of function