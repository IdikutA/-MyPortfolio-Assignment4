import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import './App.css'; /* to immport the CSS file for styling the App component-Shataer Abulizi */
const App = () => {
 return (
   <Router>
     <MainRouter />
   </Router>
 );
};

export default App;
