import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Housing from './Housing';
import DATA from './static/dummy-data'

//const axios = require("axios");
//
//const options = {
//  method: 'GET',
//  url: 'https://unofficial-redfin.p.rapidapi.com/properties/list',
//  params: {
//    region_id: '953',
//    region_type: '6',
//    uipt: '1,2,3,4,7,8',
//    status: '9',
//    sf: '1,2,3,5,6,7',
//    num_homes: '50'
//  },
//  headers: {
//    'X-RapidAPI-Host': 'unofficial-redfin.p.rapidapi.com',
//    'X-RapidAPI-Key': '0mfFFcqHVJmshRlsTSVRR6PusiUbp1O1AnajsnZpBbj7saZNx4'
//  }
//};
//
//axios.request(options).then(function (response) {
//	console.log(response.data);
//}).catch(function (error) {
//	console.error(error);
//});

//const DATA = [
//  { id: "todo-0", name: "Eat", completed: true },
//  { id: "todo-1", name: "Sleep", completed: false },
//  { id: "todo-2", name: "Repeat", completed: false }
//];

ReactDOM.render(
  <React.StrictMode>
    <Housing properties={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);
