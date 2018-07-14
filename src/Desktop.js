import React, { Component } from 'react';
import MiniTile from './MiniTile';
import {Line} from 'react-chartjs-2';
import './Desktop.css'


class Desktop extends Component {
  constructor(props){
    super();
  }

  parseTime(time) {
    return (new Date(time*1000).getHours())%12;
  }

  render() {
    let data = {
      labels: '',
      datasets: [{
        label: 'Hourly',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(244,72,66,0.4)',
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
        pointRadius: 1,
        pointHitRadius: 10,
        data: ''
      }]
    };

    data.labels = this.props.hourly.data.slice(0,25).map((hour)=>{return this.parseTime(hour.time)});
    data.datasets[0].data = this.props.hourly.data.map((hour)=>{return hour.temperature});

    return (
      <div className="desktop-tile">
        <div className="top-container">
          <div className="currently">
            <span className='desktop-temp'>It is currently {Math.round(this.props.currently.temperature)}°f</span>
            <span className='desktop-summary'>{this.props.hourly.summary}</span>
          </div>
        </div>
        <div className="chart">
          <Line data={data} height={120} />
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
