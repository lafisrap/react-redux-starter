import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import Home from '../Home';
import About from '../About';
import { getFood } from '../../modules/food';
import { showSignup, showSignin } from '../../modules/user';
import ModalSignup from '../Modals/Signup';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    props.getFood('Milk');
  }

  render() {
    const { signedIn, user, showSignin, showSignup } = this.props;
    const userArea = signedIn
      ? <Nav pullRight>
          {user && user.username}
        </Nav>
      : <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={() => showSignin(true)}>
            Sign in
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={() => showSignup(true)}>
            Sign up
          </NavItem>
        </Nav>;

    return (
      <div className="App">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img src={logo} className="App-logo" alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1} href="/">
                  Home
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/about-us">
                <NavItem eventKey={2} href="/about-us">
                  About
                </NavItem>
              </LinkContainer>
              <NavDropdown
                eventKey={3}
                title="Dropdown"
                id="basic-nav-dropdown"
              >
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            {userArea}
          </Navbar.Collapse>
          <ModalSignup />
        </Navbar>

        <Link to="/">AAAAAAAAAAAAAAAAAA</Link>
        <Link to="/about-us">BBBBBBBBBBBBBBBB</Link>

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

const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFood,
      showSignup,
      showSignin
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
