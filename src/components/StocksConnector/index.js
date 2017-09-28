import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addStock, removeStock } from '../../modules/stocks';
import ReactWebsocketsComponent from 'react-websockets-component';

import './index.css';

class StocksConnector extends Component {
  constructor(props) {
    super(props);

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
    const { stocks, addStock, startDate, endDate } = this.props;

    if (!stocks.find(stock => stock.symbol === symbol)) {
      addStock({ symbol, startDate, endDate });
    }
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
      <div>
        <ReactWebsocketsComponent
          uri={process.env.REACT_APP_SOCKET_URI}
          onConnect={data => this.connect(data)}
          onDisconnect={data => this.disconnect(data)}
          onAddStock={data => this.addStock(data)}
          onRemoveStock={data => this.removeStock(data)}
          onClientsConnected={data => this.clientsConnected(data)}
        />
        <span className="StocksConnector">
          {`${clientsConnected} ${clientsConnected === 1
            ? 'client'
            : 'clients'} connected.`}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks.stocks,
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
