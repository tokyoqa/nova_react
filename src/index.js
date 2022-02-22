import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Identification from './Components/Identification';
import Main from './Components/Main'
import Idcard from './Components/Idcard';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Idcard/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
