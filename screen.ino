#include <LiquidCrystal.h>
LiquidCrystal lcd(8, 9, 4, 5, 6, 7);
#define btnRIGHT  0
#define btnUP     1
#define btnDOWN   2
#define btnLEFT   3
#define btnSELECT 4
#define btnNONE   5
int adc_key_in  = 0;
int read_LCD_buttons(){
 adc_key_in = analogRead(0);
 if (adc_key_in > 1000) return 5;      
 if (adc_key_in < 50)   return 0;  
 if (adc_key_in < 250)  return 1; 
 if (adc_key_in < 450)  return 2; 
 if (adc_key_in < 650)  return 3; 
 if (adc_key_in < 850)  return 4;  
 return 5;
}
void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);
}
char* Tips[]={"Less red meat", "Saves water", "Taps on", "Wastes Water!", "Recycling", "Lowers pollution", "Cars make", "Greenhouse gases", "Packaging = bad", "End in landfills"};
int button = read_LCD_buttons();

void loop() {
  lcd.clear();
  for (int i = 0; i<10; i +=2){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.write(Tips[i]);
    lcd.setCursor(0,1);
    lcd.print(Tips[i+1]);
    button = read_LCD_buttons();
    Serial.write(button);
    
  while(button == btnNONE){
  button= read_LCD_buttons();
  Serial.write(button);
  }
  }
}
