import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addStock, removeStock } from '../../modules/stocks';
import { connectWebsocket } from '../../websockets';

import './index.css';

const SERVICES = [
  'connect',
  'disconnect',
  'addStock',
  'removeStock',
  'clientsConnected'
];

class StocksConnector extends Component {
  constructor(props) {
    super(props);

    connectWebsocket({
      uri: process.env.REACT_APP_SOCKET_URI,
      services: SERVICES.map(service => {
        return { service, callback: this[service].bind(this) };
      })
    });

    this.state = {
      clientsConnected: 0
    };
  }

  connect() {
    console.log('Connected to WebSockets server.');
  }

  disconnect() {
    console.log('Disconnected from WebSockets server.');
  }

  addStock(symbol) {
    const { addStock, startDate, endDate } = this.props;

    addStock({ symbol, startDate, endDate });
  }

  removeStock(symbol) {
    const { removeStock } = this.props;

    removeStock({ symbol });
  }

  clientsConnected(clientsConnected) {
    this.setState({ clientsConnected });
  }

  render() {
    const { clientsConnected } = this.state;

    return (
      <span className="StocksConnector">{`${clientsConnected} ${clientsConnected ===
      1
        ? 'client'
        : 'clients'} connected.`}</span>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.stocks.startDate,
  endDate: state.stocks.endDate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addStock,
      removeStock
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StocksConnector);
