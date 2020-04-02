import React from 'react';
import logo from './logo.svg';
import './App.css';
import Root from './comps/Root';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { createBrowserHistory } from "history";
const hist = createBrowserHistory();


function App() {
  return (
    <Router history={hist}>
      <Root />
    </Router>
  );
}

export default App;
