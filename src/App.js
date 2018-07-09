import React, { Component } from 'react'; 
import Weather from './Weather';
import Prompt from './Prompt';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';


class App extends Component {
  render() {
    return (
        <Router>
      <div className='App'>
          <Route exact path='/' component={Prompt}/>
          <Route path='/:coords/:zip' component={({match}) => <Weather coords={match.params.coords} zip={match.params.zip}/>}/>
      </div>
        </Router>
    );
  }
}

export default App;
