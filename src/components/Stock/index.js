import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { emitMessage } from 'react-websockets-component';
import { removeStock } from '../../modules/stocks';

import './index.css';

class Stock extends Component {
  removeStock() {
    const { removeStock, stock } = this.props;
    const { symbol } = stock;

    removeStock({ symbol });

    emitMessage('removeStock', symbol);
  }

  render() {
    const { stock } = this.props;
    const { data, symbol, name } = stock;
    const lastDate = (data && data[data.length - 1][0]) || null;
    const lastClose = (data && data[data.length - 1][1]) || null;
    //if (!stocks || !stocks.length) return <div className="spinner">No stocks.</div>;

    return (
      <div className="Stock_Container">
        <h3 className="Stock_Name">{`${name}`}</h3>
        <div className="Stock_Symbol">{`Symbol: ${symbol}`}</div>
        <div className="Stock_LastClose">{`Last close (${lastDate}): ${lastClose}`}</div>
        <Button
          onClick={() => this.removeStock()}
          className="Stock_Button pull-right"
          bsSize="xsmall"
          bsStyle="danger"
        >
          <FontAwesome name="trash" />
        </Button>
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
      removeStock
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
