const int buttonPin1 = 1;
const int buttonPin2 = 2;
const int buttonPin3 = 3;
const int buttonPin4 = 4;
const int buttonPin5 = 5;
const int buttonPin6 = 6;

const int ledPin = 13;

const int anaPin1 = A1;
const int anaPin2 = A2;
const int anaPin3 = A3;
//...

int analog1 = 0;
int analog2 = 0;
int analog3 = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);
  pinMode(buttonPin4, INPUT);
  pinMode(buttonPin5, INPUT);
  pinMode(buttonPin6, INPUT);
  pinMode(ledPin, OUTPUT);
  
  Serial.begin(9600);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  analog1 = analogRead(anaPin1);
  delay(100);
  analog2 = analogRead(anaPin2);
  delay(100);
  analog3 = analogRead(anaPin3);
  delay(100);

  Serial.println(analog1,analog2,analog3);
  
  //for testing
  //Serial.println("Analog 1:",analog1,"\nAnalog 2:",analog2,"\nAnalog 3",analog3,"\n---------------")
  
  
}
