import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Route, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import Home from '../Stocks';
import UserArea from './UserArea';
import ModalSignup from '../Modals/Signup';
import ModalSignin from '../Modals/Signin';
import StocksConnector from '../StocksConnector';

import './index.css';

const App = props => {
  // with ES6 import
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
              <NavItem eventKey={1} href="#">
                Home
              </NavItem>
            </LinkContainer>
          </Nav>
          <StocksConnector />
          <UserArea />
        </Navbar.Collapse>
        <ModalSignin />
        <ModalSignup />
      </Navbar>
      <main>
        <Route exact path="/" component={Home} />
      </main>
    </div>
  );
};

export default withRouter(App);
