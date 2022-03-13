// Non-interrupting delay
unsigned long previousMillis = 0;

const long interval = 1000;

void setup() {
  // initialize both serial ports:
  Serial.begin(9600);
  pinMode(13, OUTPUT);
 
}

void loop() {
  
  if (Serial.available()) {
    char incoming = Serial.read();
    switch(incoming) {
      case 'H' : 
        digitalWrite(13, HIGH);
        break;
       case 'L' :
        digitalWrite(13, LOW);
        break;
    }
  } else {
      // Print a little bit of data for devellopment purposes
      unsigned long currentMillis = millis();

      if (currentMillis - previousMillis >= interval) {
        // save the last time you sent data
        previousMillis = currentMillis;
        Serial.print(F("Hello World!\r\n"));
        
  }

        
  }

 
}
