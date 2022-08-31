import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import WeatherCard from "../WeatherCard";
// import WeatherCard from "../WeatherCards";
import "./Weather.css";

interface WeatherProps {
  city: string;
}

interface DayWeather {
  temperature: string;
  day: string;
  iconCode: string;
}

class Weather extends React.Component<WeatherProps> {
  state = {
    today: {
      day: "Wed",
      temperature: "HOT",
      iconCode: "1234",
    },
    // TODO: Remove hardcoded data"
    days: [
      {
        day: "Thurs",
        temperature: "HOT",
        iconCode: "1234",
      },
      {
        day: "Fri",
        temperature: "HOT",
        iconCode: "1234",
      },
      {
        day: "Sun",
        temperature: "HOT",
        iconCode: "1234",
      },
      {
        day: "Mon",
        temperature: "HOT",
        iconCode: "1234",
      },
    ],
    city: this.props.city || "ottawa",
  };

  async getWeather() {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&appid=71aa90602ef193eb45ac9df763e6f010&units=metric`
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        // this.setState({ days: response.data });
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate() {
    this.getWeather();
  }

  render() {
    const { days } = this.state;
    return (
      <div id="page">
        <div id="weather">
          <div className="weather-header">
            <Link style={{ textDecoration: "none" }} to="/ottawa">
              <h4>OTTAWA</h4>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/moscow">
              <h4>MOSCOW</h4>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/tokyo">
              <h4>TOKYO</h4>
            </Link>
          </div>
          <div className="weather-body">
            <div id="main-card">
              <WeatherCard temperature="" date={new Date()} />
            </div>
            <div id="bottom-row-cards">
              {/* TODO: ROWS on MOBILE */}
              {days.map((day: DayWeather, i: number) => (
                <div className="small-card-container">
                  <div className="small-card">
                    {day.day}
                  </div>
                  <div className="small-card">
                    {day.temperature}
                  </div>
                  <div id={`small-card-${i}`} className="small-card">
                    {day.iconCode}
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
