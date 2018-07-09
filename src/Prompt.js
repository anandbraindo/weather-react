import React, { Component } from 'react'; 
import './Prompt.css';


class Prompt extends Component {
  pushCoords() {
    let zip = document.querySelector('.zip-input').value;
    if(zip===''){
      return;
    }
    fetch(`https://cors-anywhere.herokuapp.com/http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
      .then(response => response.json())
      .then(loc => {
        this.props.history.push(`/${loc.results[0].geometry.location.lat},${loc.results[0].geometry.location.lng}/${zip}`);
      });
  }
  render() {
    return (
      <div className='prompt'>
          <h1>Probably Accurate Weather</h1>
          <input className='zip-input'type='text'/>
          <button className='search-button' onClick={() => {this.pushCoords()}}>Search</button>
          <div className='dis'>
            <span>(zipcodes only please!)</span>
          </div>
      </div>
    );
  }
}

export default Prompt;