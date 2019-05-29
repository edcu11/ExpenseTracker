/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import cookie from 'react-cookies'; 
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/api/";

let token = cookie.load("token");
if (token && token.length) {
	axios.defaults.headers.common['Authorization'] = token;
}

// store
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store.store);

render(
	<App store={store.store} persistor={store.persistor} history={history} />
	, document.getElementById('app'));

