import React, { Component } from 'react'; 
import Tile from './Tile';
import Slider from "react-slick";
import './index.css';



const RowOfTiles = (props) => {
  var sliderSettings = {
      dots: true,
      infinite: false,
      arrows:false,
      speed: 250,
      slidesToShow: 1,
      slidesToScroll: 1
  };
  
  return (
  <Slider {...sliderSettings}>
        {props.daily.data.map((day, index) => 
        <Tile day={(new Date(day.time*1000)).toString().substring(0,3)} 
              tempHi={Math.floor(day.temperatureHigh)} 
              tempLo={Math.floor(day.temperatureLow)}
              icon={day.icon}
              summary={day.summary}
              key={index}/>
        )}
  </Slider>
  );
}



class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daily:{data: [{time: 0,
                      temperatureHigh: 0,
                      temperatureLow: 0,
                    icon: ''}],
              summary: ''},
      fa: ''
    };
    this.grabForecast(this.props.coords);
    this.grabZipInfo(this.props.zip);
  }

  grabZipInfo(zip) {
    fetch(`https://cors-anywhere.herokuapp.com/http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
      .then(response => response.json())
      .then(info => {
        this.setState(() => ({
          fa: info.results[0].formatted_address.split(', ')
        }))
      });
  }

  grabForecast(coords) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5d3be07092ef4acee7b0432f8d7f8a2b/${coords}`)
    .then(response => response.json())
    .then(forecast => { console.log(forecast.daily)
      this.setState(prevState => ({
                                  currently: forecast.currently,
                                  lat: forecast.latitude,
                                  lon: forecast.longitude,
                                  daily: forecast.daily,
                                  hourly: forecast.hourly,
                                }))});
  }

  render() {
    return (
      <div className='weather'>
        <div className='top'>
          <span>{this.state.fa[0]}</span>
          <span className='state-zip'>{this.state.fa[1]}</span>
          <div className='summary'>{this.state.daily.summary}</div>
        </div>
        <div className='middle'>
          <RowOfTiles daily={this.state.daily}/>
        </div>
      </div>
    );
  }
}

export default Weather;
