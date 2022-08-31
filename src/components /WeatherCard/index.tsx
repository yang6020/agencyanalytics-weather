import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./WeatherCards.css";

interface WeatherCardProps {
  date: Date;
  temperature: string;
}

class WeatherCard extends React.Component<WeatherCardProps> {
  state = {
    // TODO: fix date and temp
    date: this.props.date,
    temperature: this.props.temperature,
  };

  componentDidUpdate() {}

  render() {
    const { date, temperature } = this.state;
    return <div>test</div>;
  }
}

export default WeatherCard;
