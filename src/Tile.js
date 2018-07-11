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
  constructor() {
    super()
    this.state = {
        flipped: false
    };
  }

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
    let tileContent;

    if (this.state.flipped) {
      tileContent = <div>
                      <div>{this.props.data.precipProbability}</div>
                      <div>{this.props.data.cloudCover}</div>
                      <div>{this.props.data.humidity}</div>
                      <div>{this.props.data.sunriseTime}</div>
                      <div>{this.props.data.sunsetTime}</div>
                      <div>{this.props.data.temperatureHighTime}</div>
                      <div>{this.props.data.temperatureLowTime}</div>
                    </div>
    }
    else{
      tileContent = <div>
                      <span className='day'>{this.props.place===0 ? 'Today' : (new Date(this.props.data.time*1000)).toString().substring(0,3)} </span>
                      <div className='img'>
                          <img src={this.pickIcon(this.props.data.icon)} alt={this.props.data.icon}></img>
                      </div>
                      <div className='temps'>
                        <div className='temp-hi'>
                            <span className='arrow'>↑</span>
                            <span className='temp'>{Math.floor(this.props.data.temperatureHigh)}</span>
                            <span className='faren'>°f</span>
                        </div>
                        <div className='temp-lo'>
                            <span className='arrow'>↓</span>
                            <span className='temp'>{Math.floor(this.props.data.temperatureLow)}</span>
                            <span className='faren'>°f</span>
                        </div>
                      </div>
                      <div className='summary'>
                        <span>{this.props.data.summary}</span>
                      </div>
                      <div className='more'>
                        <span>more info</span>
                      </div>
                    </div>
      
    }

    return (
      <button className="tile-button-container" onClick={() => {this.setState(() => ({flipped: !this.state.flipped}))}}>
        <div className="tile">
          {tileContent}
        </div>
      </button>
    );
  }
}

export default Tile;
