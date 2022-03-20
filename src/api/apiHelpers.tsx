import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export interface ApiDay {
  date_epoch: number;
  date: string;
  day: {
    maxwind_kph: number;
    daily_chance_of_rain: number;
    avgtemp_c: number;
    condition: { icon: string; text: string };
    mintemp_c: number;
    maxtemp_c: number;
    avghumidity: number;
    totalprecip_mm: number;
  };
}

export const getCurrentWeather = async (city: string) =>
  await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=yes`
  );

export const getHistoryWeather = async (city: string, date: string) =>
  await axios.get(
    `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`
  );

export const createData = (forecastArray: ApiDay[]) => {
  if (forecastArray.length === 0) return [];

  return forecastArray.map((day: ApiDay) => {
    return {
      dayOfWeek: new Date(day.date_epoch * 1000).toLocaleDateString('en-En', {
        weekday: 'long',
      }),
      date: day.date,
      wind: day.day.maxwind_kph,
      temp: day.day.avgtemp_c,
      chanceOfRain: day.day.daily_chance_of_rain,
      humidity: day.day.avghumidity,
      precip: day.day.totalprecip_mm,
      icon: day.day.condition.icon,
      desc: day.day.condition.text,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
    };
  });
};
