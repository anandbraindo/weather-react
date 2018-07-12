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
      case 'sleet' || 'snow':
        return snow;
      case 'wind':
        return wind;
      default:
        return clearDay;
    }
  }

  parseTime(utc) {
    return this.ampm(new Date(utc*1000).toString().substring(16,21).replace(/^0+/, ''));
  }

  ampm(time) {
    if(parseInt(time.split(':')[0], 10) > 12){
      return (parseInt(time.split(':')[0], 10) % 12).toString() + ':' + time.split(':')[1] + ' PM'
    }
    else {
      return time += ' AM'
    }
  }

  render() {
    let tileContent;

    if (this.state.flipped) {
      tileContent = <div className='flipped'>
                      <div><span><span className='cursive'>Chance of rain:  </span> {Math.floor(this.props.data.precipProbability*100)}%</span></div>
                      <div><span><span className='cursive'>Cloud cover:  </span> {Math.floor(this.props.data.cloudCover*100)}%</span></div>
                      <div><span><span className='cursive'>Humidity:  </span> {Math.floor(this.props.data.humidity*100)}%</span></div>
                      <div><span><span className='cursive'>Sunrise:  </span> {this.parseTime(this.props.data.sunriseTime)}</span></div>
                      <div><span><span className='cursive'>Sunset:  </span> {this.parseTime(this.props.data.sunsetTime)}</span></div>
                    </div>
    }
    else{
      tileContent = <div className='unflipped'>
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
