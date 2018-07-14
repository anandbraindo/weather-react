import React, { Component } from 'react';
import MiniTile from './MiniTile';
import {Line} from 'react-chartjs-2';
import './Desktop.css'


class Desktop extends Component {
  constructor(props){
    super();
  }

  parseTime(time) {
    let hour = (new Date(time*1000).getHours());
    hour = hour > 12 ? (hour % 12).toString() + ' PM' : (hour % 12).toString() + ' AM'
    return hour;
  }

  render() {
    let chartData = {
      labels: '',
      datasets: [{
        label: 'Hourly °f',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(244,72,66,1)',
        borderColor: 'rgba(244,72,66,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(244,72,66,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(244,72,66,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: ''
      }]
    };

    chartData.labels = this.props.hourly.data.slice(0,25).map((hour)=>{return this.parseTime(hour.time)});
    chartData.datasets[0].data = this.props.hourly.data.map((hour)=>{return hour.temperature});
    chartData.datasets[1] = {};
    chartData.datasets[1].label = '% Precipitation';
    chartData.datasets[1].backgroundColor = 'rgba(0, 148, 255,0.4)';
    chartData.datasets[1].borderColor = 'rgba(0, 148, 255,1)';
    chartData.datasets[1].pointHoverBackgroundColor = 'rgba(0, 148, 255,1)';
    chartData.datasets[1].pointBorderColor = 'rgba(0, 148, 255,1)';
    chartData.datasets[1].data = this.props.hourly.data.map((hour)=>{return Math.floor(hour.precipProbability*100)});

    return (
      <div className="desktop-tile">
        <div className="top-container">
          <div className="currently">
            <span className='desktop-temp'>It is currently {Math.round(this.props.currently.temperature)}°f</span>
            <span className='desktop-summary'>{this.props.hourly.summary}</span>
          </div>
        </div>
        <div className="chart">
          <Line data={chartData} height={120} />
        </div>
        <div className="mini-tiles">
          {this.props.daily.data.map((day, index) => {
                return <MiniTile data={day} place={index} key={index}/> // This line doesn't work when wrapped in brackets. Why?
          })}
        </div>
      </div>
    );
  }
}

export default Desktop;
