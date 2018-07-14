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
import './MiniTile.css';

class MiniTile extends Component {
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
      case 'sleet' || 'snow':
        return snow;
      case 'wind':
        return wind;
      default:
        return clearDay;
    }
  }


  render() {
    return (
        <div className="minitile">
          <span className='mtday'>{this.props.place===0 ? 'Today' : (new Date(this.props.data.time*1000)).toString().substring(0,3)} </span>
            <div className='mtimg'>
              <img src={this.pickIcon(this.props.data.icon)} alt={this.props.data.icon}></img>
            </div>
            <div className='mttemps'>
              <div className='mttemp-hi'>
                  <span className='mtarrow'>↑</span>
                  <span className='mttemp'>{Math.floor(this.props.data.temperatureHigh)}</span>
                  <span className='mtfaren'>°f</span>
              </div>
              <div className='mttemp-lo'>
                  <span className='mtarrow'>↓</span>
                  <span className='mttemp'>{Math.floor(this.props.data.temperatureLow)}</span>
                  <span className='mtfaren'>°f</span>
              </div>
            </div>
        </div>
    );
  }
}

export default MiniTile;
