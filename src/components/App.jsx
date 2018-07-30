import React, { Component } from 'react'; 
import {BrowserRouter, Route} from 'react-router-dom';
import Weather from './Weather';
import Prompt from './Prompt';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app-router'>
          <Route exact path='/' component={Prompt}/>
          <Route path='/:coords/:zip' component={({match}) => <Weather {...match.params}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
