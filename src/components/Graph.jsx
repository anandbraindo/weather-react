import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


class Graph extends Component {
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
        label: 'Temp °f',
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
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(244,72,66,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: ''
      }]
    };

    const chartOptions = {
      tooltips: {
          mode: 'index',
          intersect: false,
        }
    }

    chartData.labels = this.props.data.slice(0,25).map((hour)=>{return this.parseTime(hour.time)});
    chartData.datasets[0].data = this.props.data.map((hour)=>{return hour.temperature});
    chartData.datasets[1] = {};
    chartData.datasets[1].label = 'Rain Chance';
    chartData.datasets[1].backgroundColor = 'rgba(0, 148, 255,0.4)';
    chartData.datasets[1].borderColor = 'rgba(0, 148, 255,1)';
    chartData.datasets[1].pointHoverBackgroundColor = 'rgba(0, 148, 255,1)';
    chartData.datasets[1].pointBorderColor = 'rgba(0, 148, 255,1)';
    chartData.datasets[1].pointRadius = 0;
    chartData.datasets[1].data = this.props.data.map((hour)=>{return Math.floor(hour.precipProbability*100)});
    chartData.datasets[2] = {};
    chartData.datasets[2].label = 'Cloud Cover';
    chartData.datasets[2].pointRadius = 0;
    chartData.datasets[2].data = this.props.data.map((hour)=>{return Math.floor(hour.cloudCover*100)});
    return (
        <div className="chart">
          <Line data={chartData} options={chartOptions} height={120} />
        </div>
    );
  }
}

export default Graph;
