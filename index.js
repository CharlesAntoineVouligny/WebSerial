// https://fidisys.com/blog/serial-port-devices/

// https://github.com/mmiscool/serialTerminal.com

if ("serial" in navigator) {
  console.log("Awesome, the serial port is supported.")
}

var port, textEncoder, writableStreamClosed, writer;
let connectedFlag = false;

  async function connectSerial() {
      try {
          // Prompt user to select any serial port.
          port = await navigator.serial.requestPort();
          await port.open({ baudRate: document.getElementById("cmdLine").value });
          listenToPort();

          textEncoder = new TextEncoderStream();
          writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

          writer = textEncoder.writable.getWriter();
      } catch {
          alert("Serial Connection Failed");
      }

      connected();
  }

  function connected() {
    //Update UI
    connectedFlag = true;
    document.getElementById("cmdLine").value = "";
    document.getElementById("cmdLine").placeholder = "Send data";
    document.getElementById("cmdButton").onclick = sendSerialLine;
    document.getElementById("cmdButton").innerHTML = "Send";

  }
 
  async function sendSerialLine() {
      dataToSend = document.getElementById("cmdLine").value;
      // if (document.getElementById("addLine").checked == true) dataToSend = dataToSend + "\r\n";
      // if (document.getElementById("echoOn").checked == true) appendToTerminal("> " + dataToSend);
      await writer.write(dataToSend);
      document.getElementById("cmdLine").value = "";
      //await writer.releaseLock();
  }

  async function listenToPort() {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      // Listen to data coming from the serial device.
      while (true) {
          const { value, done } = await reader.read();
          if (done) {
              // Allow the serial port to be closed later.
              //reader.releaseLock();
              break;
          }
          // value is a string.
          appendToTerminal(value);
      }
  }

  const serialResultsDiv = document.getElementById("serialResults");

  async function appendToTerminal(newStuff) {
      serialResultsDiv.innerHTML += newStuff;
      if (serialResultsDiv.innerHTML.length > 3000) serialResultsDiv.innerHTML = serialResultsDiv.innerHTML.slice(serialResultsDiv.innerHTML.length - 3000);

      //scroll down to bottom of div
      serialResultsDiv.scrollTop = serialResultsDiv.scrollHeight;
  }

  document.getElementById("cmdLine").addEventListener("keyup", async function (event) {
      if(!connectedFlag && event.key === 13) {
          connectSerial();
      }
    
      if (event.keyCode === 13) {
          sendSerialLine();
      }
  })

