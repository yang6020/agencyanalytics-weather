import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

import "./Weather.css";
import { Props } from "../../App";
import {
  Config,
  WeatherState,
  WeatherIconResponse,
  WeatherDay,
} from "../../types";

let config: Config = require("../../config.json");

class Weather extends React.Component<Props> {
  city0: React.Ref<HTMLAnchorElement> | undefined = React.createRef();
  city1: React.Ref<HTMLAnchorElement> | undefined = React.createRef();
  city2: React.Ref<HTMLAnchorElement> | undefined = React.createRef();
  state: WeatherState = {
    today: {
      temp: {
        day: 0,
      },
      weather: [],
      weekday: "",
      dt: 0,
    },
    selectedCity: "",
    cities: config.cities,
    days: [],
  };

  getDay(dt: number): string {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[new Date(dt * 1000).getDay()];
  }

  async getWeather() {
    const url = window.location.href.split("/");
    const city = url[url.length - 1] || this.state.cities[0];
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}
`
      )
      .then((response) => {
        const { lon, lat } = response.data.coord;
        return axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lon=${lon}&lat=${lat}&exclude=current,minutely,hourly,alerts&units=metric&appid=${config.API_KEY}`
        );
      })
      .then((res) => {
        const daysArray: WeatherDay[] = [];
        const relevantDays: WeatherDay[] = res.data.daily.slice(0, 5);
        relevantDays.forEach((day: WeatherDay) => {
          const weather: WeatherIconResponse = {
            description: day.weather[0].description,
            icon: day.weather[0].icon,
            id: day.weather[0].id,
            main: day.weather[0].main,
          };
          daysArray.push({
            temp: {
              day: day.temp.day,
            },
            weather: [weather],
            weekday: this.getDay(day.dt),
            dt: day.dt,
          });
        });

        this.setState({
          today: daysArray.shift(),
          days: daysArray,
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  initialFocus() {
    const url = window.location.href.split("/");
    const city = url[url.length - 1] || this.state.cities[0];
    this.setState({ selectedCity: city });
    const cityIndex = this.state.cities.indexOf(city);
    if (
      !url[url.length - 1] &&
      this.city0 !== null &&
      typeof this.city0 !== "function"
    ) {
      this.city0?.current?.focus();
    } else {
      const ref: React.Ref<HTMLAnchorElement> | undefined = this[
        ("city" + cityIndex) as keyof Weather
      ] as React.Ref<HTMLAnchorElement> | undefined;

      if (ref != null && typeof ref !== "function") {
        ref.current?.focus();
      }
    }
  }

  componentDidMount() {
    this.initialFocus();
    this.getWeather();
  }

  componentDidUpdate() {
    const url = window.location.href.split("/");
    const city = url[url.length - 1] || this.state.cities[0];
    if (city !== this.state.selectedCity) {
      this.getWeather();
      this.setState({ selectedCity: city });
    }
  }

  render() {
    const { days, today } = this.state;
    return (
      <div id="page">
        <div id="weather">
          <div className="weather-header">
            {this.state.cities.map((city, i) => (
              <Link
                ref={
                  this[("city" + i) as keyof Weather] as
                    | React.Ref<HTMLAnchorElement>
                    | undefined
                }
                style={{ textDecoration: "none" }}
                to={`/${city}`}
              >
                <h4>{city.toUpperCase()}</h4>
              </Link>
            ))}
          </div>
          <div className="weather-body">
            <div id="main-card-container">
              <div id="date">Today</div>
              <div id="weather-information">
                <div className="main-card-icon">
                  <img
                    id="icon"
                    src={`http://openweathermap.org/img/wn/${today?.weather[0]?.icon}@2x.png`}
                    alt="weather=icon"
                  />
                </div>
                <div className="main-card-info">
                  <h1 id="temperature">
                    {Math.ceil(today.temp.day)}
                    {"\u00b0"}
                  </h1>
                  <div className="info">{today?.weather[0]?.main}</div>
                </div>
              </div>
            </div>

            <div id="bottom-row-cards">
              {days.map((day: WeatherDay, i: number) => (
                <div className="small-card-container">
                  <div id="top-small-card" className="small-card">
                    {day?.weekday}
                  </div>
                  <img
                    className="small-card-weather-icon"
                    src={`http://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`}
                    alt="weather=icon"
                  />
                  <div id={`small-card-${i}`} className=" bottom-small-card">
                    {Math.ceil(day?.temp?.day)}
                    {"\u00b0"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
