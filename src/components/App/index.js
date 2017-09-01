import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.svg';
import Home from '../Home';
import About from '../About';
import { getFood } from '../../modules/food';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    props.getFood('Milk');
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFood
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(App);
