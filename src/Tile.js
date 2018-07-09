import React, { Component } from 'react';
import clearDay from './images/clear-day.svg';
import clearNight from './images/clear-night.svg';
import cloudy from './images/cloudy.svg';
import fog from './images/fog.svg';
import partlyCloudyDay from './images/partly-cloudy-day.svg';
import partlyCloudyNight from './images/partly-cloudy-night.svg';
import rain from './images/rain.svg';
import snow from './images/snow.svg';
import wind from './images/wind.svg';
import './Tile.css';

class Tile extends Component {

  pickIcon(icon) {
    switch (icon) {
      case 'clear-day':
        return clearDay;
      case 'clear-night':
        return clearNight;
      case 'cloudy':
        return cloudy;
      case 'fog':
        return fog;
      case 'partly-cloudy-day':
        return partlyCloudyDay;
      case 'partly-cloudy-night':
        return partlyCloudyNight;
      case 'rain':
        return rain;
      case 'sleet':
        return snow;
      case 'snow':
        return snow;
      case 'wind':
        return wind;
      default:
        return clearDay;
    }

  }

  render() {
    return (
      <div className="tile">
        <span className='day'>{this.props.day}</span>
        <div className='img'>
          <img src={this.pickIcon(this.props.icon)} alt={this.props.icon}></img>
        </div>
        <span className='summary'>{this.props.summary}</span>
        <div className='temp-hi'>
          <span>
            <span className='arrow'>↑</span>
            <span className='temp'>{this.props.tempHi}</span>
            <span className='faren'>°f</span>
          </span>
        </div>
        <div className='temp-lo'>
          <span>
            <span className='arrow'>↓</span>
            <span className='temp'>{this.props.tempLo}</span>
            <span className='faren'>°f</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Tile;
