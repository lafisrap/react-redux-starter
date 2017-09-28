import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Bars from '../Bars';

import './index.css';

class Home extends Component {
  render() {
    return (
      <section id="Home_section">
        <Panel>
          <Bars />
        </Panel>
      </section>
    );
  }
}

export default Home;
