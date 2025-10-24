# 🌤️ Weather Forecast Extension
This is a lightweight and intuitive tool that provides real-time weather updates for yesterday, today, and tomorrow.
With a clean interface and reliable forecast data, this extension helps users plan their day by quickly viewing temperature, humidity, wind speed, and overall weather conditions at a glance.

## ✨ Features 
  - 🌎 Global Forecasts – Get weather updates for any city worldwide.

  - 📅 Three-Day View – Displays the forecast for yesterday, today, and tomorrow.

  - 🌡️ Temperature Toggle – Easily switch between Celsius (°C) and Fahrenheit (°F).

  - 🌤️ Weather Icon – Visual representation of the current weather condition.

  - 💧 Humidity – Shows the current atmospheric humidity.

  - 🌬️ Wind Speed – Displays real-time wind speed readings.

  - 📍 Automatic Location Detection – Fetches weather based on the user’s location (if permitted).

  - 💡 Clean, Lightweight UI – Minimalist design optimized for quick access and readability.

## 📁 Project Structure

```
Weather-Extension/
│
├── manifest.json           # Extension configuration
├── background.js           # backgorund service
├── index.html              # Main popup UI
├── index.js                # Handles weather fetching and logic
├── style.css               # Popup styling
├── icon.png                # Extension icon
│
├── assets/                 # Images, icons, and weather graphics
│   │
│   ├── weather_code/       # Weather condition icons
│   │   │   
│   │   ├── cloudy.png      # Cloudy weather icon
│   │   ├── rainy.png       # Rainy weather icon
│   │   ├── snow.png        # Snowy weather icon
│   │   ├── sun.png         # Sunny weather icon
│   │   └── windy.png       # Windy weather icon
|   |
│   ├── drops.svg           # Humidity icon
│   ├── location.svg        # Location icon
│   └── wind.svg            # Wind icon
│   
├── data/
│   └──worldcities.csv      # a dataset that maps every city to its langitude and latitude    
│
└── README.md               # Documentation (this file)
```
