import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

// we need to trigger the persistency logic at initialization and
// need to pass the relevant data to it (Alt instance, storage, storage name)
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

persist(alt, storage, 'app');


ReactDOM.render(<App />, document.getElementById('app'));
