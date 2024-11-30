#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

String wifissid = "BAGAS HOME";
String wifipass = "09022003";
String postUrl = "http://192.168.1.8:4000/api/data/insert";

void connectToWifi();
void httpGET();
void httpPOST();

void setup() {
  Serial.begin(9600); // Gunakan baud rate yang stabil
  connectToWifi();
  httpPOST();
  // httpGET();
}

void loop() {
  // Your loop code
}

void httpPOST() {
  Serial.println("POST...");
  HTTPClient http;
  String response;

  WiFiClient client;
  http.begin(client, postUrl); // Gunakan WiFiClient dan URL sebagai parameter

  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> buff;
  String jsonParams; 

  buff["deviceId"] = 1;
  buff["temperature"] = 11; // Menghasilkan nilai acak dari 1 sampai 50
  buff["humidity"] = 12;
  buff["pressure"] = 13;

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
  String getUrl = "http://192.168.1.1:4000/api/data/alltime";
  HTTPClient http;
  String response;
  
  WiFiClient client;
  http.begin(client, getUrl); // Gunakan WiFiClient dan URL sebagai parameter

  // Tambahkan header jika diperlukan
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
  Serial.println("Connecting to WiFi..");

  WiFi.begin(wifissid, wifipass);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    Serial.print(".");
    delay(500);
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi Connected");
    Serial.println(WiFi.localIP());
    Serial.println(WiFi.macAddress());
    Serial.println(WiFi.SSID());
    Serial.println(WiFi.channel());
    Serial.println(WiFi.gatewayIP());
    Serial.println(WiFi.dnsIP());
  } else {
    Serial.println("Failed to connect to WiFi");
  }
}
