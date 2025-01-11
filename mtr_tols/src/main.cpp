#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h> 

#define DHTPIN D2 
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);

String wifissid = "Galaxy A7228F5";
String wifipass = "uspc9886i";
String postUrl = "http://192.168.22.231:4000/api/data/insert";

void connectToWifi();
void httpGET();
void httpPOST(float temperature, float humidity, float pressure);

void setup() {
  Serial.begin(9600); // Gunakan baud rate yang stabil
  connectToWifi();
  dht.begin();
  delay(2000);
}

void loop() {
  // Baca nilai dari sensor 
 float temperature = dht.readTemperature(); 
 float humidity = dht.readHumidity();  
 float pressure = ((rand() % 300) + 200) / 10.0; 

  // Pastikan pembacaan sensor berhasil 
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Kirim data melalui POST 
  httpPOST(temperature, humidity, pressure);

  // Tunggu sebelum membaca dan mengirim lagi 
  delay(10000);
}

void httpPOST(float temperature, float humidity, float pressure) {
  Serial.println("POST...");
  HTTPClient http;
  String response;

  WiFiClient client;
  http.begin(client, postUrl);
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> buff;
  String jsonParams; 

  buff["deviceId"] = 1; 
  buff["temperature"] = temperature; 
  buff["humidity"] = humidity; 
  buff["pressure"] = pressure;

  serializeJson(buff, jsonParams);
  Serial.println(jsonParams);

  int httpCode = http.POST(jsonParams);

  if (httpCode > 0) {
    response = http.getString();
    Serial.println(httpCode);
    Serial.println(response);
  } else {
    Serial.print("Error on sending POST: ");
    Serial.println(httpCode);
    Serial.println(http.errorToString(httpCode));
  }

  http.end(); // Hapus sumber daya
}

void httpGET() {
  String getUrl = "http://172.20.10.3:4000/api/data/alltime";
  HTTPClient http;
  String response;

  WiFiClient client;
  http.begin(client, getUrl); // Gunakan WiFiClient dan URL sebagai parameter
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.GET(); // Lakukan request

  if (httpCode > 0) { // Cek kode yang dikembalikan
    response = http.getString();
    Serial.println(httpCode);
    Serial.println(response);
  } else {
    Serial.println("Error on HTTP request");
    Serial.println(httpCode); // Tambahkan ini untuk melihat kode error
  }

  http.end(); // Hapus sumber daya
}

void connectToWifi() {
  Serial.println("Connecting to WiFi...");

  WiFi.begin(wifissid, wifipass);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    Serial.print(".");
    delay(500);
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi Connected");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("MAC Address: ");
    Serial.println(WiFi.macAddress());
  } else {
    Serial.println("Failed to connect to WiFi");
  }
}
