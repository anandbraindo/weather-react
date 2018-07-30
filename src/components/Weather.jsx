import React, { Component } from 'react'; 
import Graph from "./Graph";
import Tile from "./Tile";


class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daily:{data: [{time: 0,
                      temperatureHigh: 0,
                      temperatureLow: 0,
                    icon: ''}],
              summary: ''},
      city_name: '',
      state_zip: '',
      currently: {temperature: ''},
      hourly:{data:[0],
                summary: '',
                time: ''
              }
    };
  }

  componentWillMount() {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5d3be07092ef4acee7b0432f8d7f8a2b/${this.props.coords}`)
      .then(response => response.json())
      .then(forecast => {
        this.setState(() => ({
          currently: forecast.currently,
          lat: forecast.latitude,
          lon: forecast.longitude,
          daily: forecast.daily,
          hourly: forecast.hourly,
        }))
      });
    fetch(`https://cors-anywhere.herokuapp.com/http://maps.googleapis.com/maps/api/geocode/json?address=${this.props.zip}`)
      .then(response => response.json())
      .then(geo => {
        this.setState(() => ({
          city_name: geo.results[0].formatted_address.split(", ")[0],
          state_zip: geo.results[0].formatted_address.split(", ")[1]
        }));
      });
  }

  render() {
    return (
      <div>
        <div className='jumbotron header'>
          <h1>{this.state.city_name}</h1>
          <h2>{this.state.state_zip}</h2>
          <h4>{this.state.daily.summary}</h4>
        </div>
        <div className='container weather'>
  
          <div className="row data">
            <div className="col desktop-tile">
              <div className="col-sm-2">
                <span className='desktop-temp'>{Math.round(this.state.currently.temperature)}<span className='far'>°f</span></span>
              </div>
              <div className="col-sm-10">
                <span className='desktop-summary cursive'>{this.state.hourly.summary}</span>
              </div>
            </div>
          </div>
  
          <div className="row graph">
              <Graph {...this.state.hourly} />
          </div>
  
          <div className="row seven-cols tiles">
            {this.state.daily.data.slice(1).map((day, index) =>
              <div className="col-sm-1 tile-container">
                <Tile data={day} place={index} key={index} /> 
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;