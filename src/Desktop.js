import React, { Component } from 'react';
import MiniTile from './MiniTile';
import Graph from './Graph';
import './Desktop.css'


class Desktop extends Component {
  constructor(props){
    super();
  }

  render() {
    return (
      <div className="desktop-tile">
        <div className="top-container">
          <div className="currently">
            <span className='desktop-temp'>{Math.round(this.props.currently.temperature)}<span className='far'>°f</span></span>
            <span className='desktop-summary'>{this.props.hourly.summary}</span>
          </div>
        </div>
        <div className="graph">
          <Graph {...this.props.hourly}/>
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
