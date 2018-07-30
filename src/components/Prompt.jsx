import React, { Component } from 'react'; 


class Prompt extends Component {
  pushCoords() {
    let zip = this.refs.zipInput.value;
    let errorMessage = 'where you wanna see weather tho?';
    if(zip===''){
      window.alert(errorMessage);
    }
    else if (/^\d{5}$/.test(zip)) { // Tests for exactly 5 digits in a row
      fetch(`https://cors-anywhere.herokuapp.com/http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`)
      .then(response => response.json())
      .then(loc => {
        this.props.history.push(`/${loc.results[0].geometry.location.lat},${loc.results[0].geometry.location.lng}/${zip}`);
      });
    }
    else
      window.alert(errorMessage);
  }

  listenForEnter(event) {
    if(event.key === 'Enter'){
      this.pushCoords();
    }
  }

  render() {
    return (
      <div className='container'>
          <div className="row">
            <div className="col prompt-container">
              <div className="jumbotron">Weather!</div>
              <input className='zip-input' onKeyPress={e => {this.listenForEnter(e)}} ref='zipInput' type='text' placeholder='enter zip'/>
              <button className='search-button' onClick={() => {this.pushCoords()}}>Search</button>
            </div>
          </div>
      </div>
    );
  }
}

export default Prompt;