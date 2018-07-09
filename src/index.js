import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
var fixed = document.getElementById('root');

fixed.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
