if (!("serial" in navigator)) {
    // The Web Serial API is not supported.
    document.getElementById("warningLabel").innerHTML = "Try with Google Chrome or Microsoft Edge! Your current browser in unsupported."
  }

  