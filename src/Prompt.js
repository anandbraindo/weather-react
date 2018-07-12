import React, { Component } from 'react'; 
import './Prompt.css';


class Prompt extends Component {
  pushCoords() {
    let zip = this.refs.zipInput.value;
    if(zip===''){
      window.alert('gimme a zip yo');
    }
    else if (/^\d{5}$/.test(zip)) { // Tests for exactly 5 digits in a row
      fetch(`https://cors-anywhere.herokuapp.com/http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
      .then(response => response.json())
      .then(loc => {
        this.props.history.push(`/${loc.results[0].geometry.location.lat},${loc.results[0].geometry.location.lng}/${zip}`);
      });
    }
    else
      window.alert('where you wanna see weather tho?');
  }

  render() {
    return (
      <div className='prompt'>
          <h1>Weather!</h1>
          <input className='zip-input' ref='zipInput' type='text' placeholder='enter zip'/>
          <button className='search-button' onClick={() => {this.pushCoords()}}>Search</button>
      </div>
    );
  }
}

export default Prompt;