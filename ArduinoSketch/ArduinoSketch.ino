void setup() {
  // initialize both serial ports:
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  
}

void loop() {
  
  if (Serial.available()) {
    char incoming = Serial.read();
    switch(incoming) {
      case 'A' : 
        digitalWrite(13, HIGH);
        break;
       case 'B' :
        digitalWrite(13, LOW);
        break;
    }
  }

 
}
