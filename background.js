// reading the csv file and transforming it into js object

const getCities = async () => {
  const response = await fetch("data/worldcities.csv");

  const text = await response.text();
  const lines = text.split("\n").slice(1);
  const result = lines.map((line) => line.split(","));

  return result;
};

// fetching from the openmeteo api

const fetchOpenMeteo = async (lat, long, scale) => {
  const url =
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${lat}&longitude=${long}` +
    `&daily=weather_code,temperature_2m_mean,wind_speed_10m_mean,relative_humidity_2m_mean` +
    `&forecast_days=3&past_days=1&timezone=auto` +
    (scale === "Cscale" ? "" : "&temperature_unit=fahrenheit");

  const response = await fetch(url);

  const data = await response.json();

  return data;
};

export { getCities, fetchOpenMeteo };
