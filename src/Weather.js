import React, { Component } from 'react'; 
import MediaQuery from 'react-responsive';
import Tile from './Tile';
import Desktop from './Desktop';
import Slider from "react-slick";
import './Weather.css';



class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daily:{data: [{time: 0,
                      temperatureHigh: 0,
                      temperatureLow: 0,
                    icon: ''}],
              summary: ''},
      formatted_address: '',
      currently: {temperature: ''},
      hourly:{data:[0],
                summary: '',
                time: ''
              }
    };
    this.grabForecast(this.props.coords);
    this.grabZipInfo(this.props.zip);
  }

  grabZipInfo(zip) {
    fetch(`https://cors-anywhere.herokuapp.com/http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
      .then(response => response.json())
      .then(info => {
        this.setState(() => ({
          formatted_address: info.results[0].formatted_address.split(', ')
        }))
      });
  }

  grabForecast(coords) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5d3be07092ef4acee7b0432f8d7f8a2b/${coords}`)
    .then(response => response.json())
    .then(forecast => {this.setState(() => ({
                                  currently: forecast.currently,
                                  lat: forecast.latitude,
                                  lon: forecast.longitude,
                                  daily: forecast.daily,
                                  hourly: forecast.hourly,
                                }))});
  }

  render() {
    var sliderSettings = {
      dots: true,
      infinite: false,
      arrows: false,
      speed: 250,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className='weather'>
        <div className='top'>
          <span>{this.state.formatted_address[0]}</span>
          <span className='state-zip'>{this.state.formatted_address[1]}</span>
          <div className='summary'>{this.state.daily.summary}</div>
        </div>
        <div className='middle'>
          <MediaQuery maxDeviceWidth={924}>
            <Slider {...sliderSettings}>
              {this.state.daily.data.map((day, index) => 
                <Tile data={day} place={index} key={index}/> // This line doesn't work when wrapped in brackets. Why?
              )}
            </Slider>
          </MediaQuery>
          <MediaQuery minDeviceWidth={925}>
            <div className='desktop'>
              <Desktop {...this.state}/> 
            </div>
          </MediaQuery>
        </div>
      </div>
    );
  }
}

export default Weather;