export interface Config {
  cities: string[];
  API_KEY: string;
}

export interface WeatherState {
  today: WeatherDay;
  selectedCity: string;
  cities: string[];
  days: WeatherDay[];
  error: boolean
}

export interface WeatherDay {
  weather: WeatherIconResponse[];
  temp: {
    day: number;
  };
  dt: number;
  weekday: string;
}

export interface WeatherIconResponse {
  description?: string;
  icon?: string;
  id?: number;
  main?: string;
}
