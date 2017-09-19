import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addStock, removeStock } from '../../modules/stocks';
import { emitMessage } from '../../websockets';

let counter1 = 1;
let counter2 = 1;
const stocks = ['AAPL', 'MSFT', 'GOOG', 'FB'];

class Stocks extends Component {
  addStock() {
    const { addStock, startDate, endDate } = this.props;

    addStock({
      symbol: stocks[counter1],
      startDate,
      endDate
    });

    emitMessage('addStock', stocks[counter1]);

    counter1++;
  }

  removeStock() {
    const { removeStock } = this.props;

    removeStock({
      symbol: stocks[counter2]
    });

    emitMessage('removeStock', stocks[counter2]);

    counter2++;
  }

  render() {
    const { stocks } = this.props;

    //if (!stocks || !stocks.length) return <div className="spinner">No stocks.</div>;

    return (
      <div className="Stocks_Container">
        {stocks.map((stock, i) => (
          <div className="test" key={i}>
            {`${stock.symbol}, ${stock.name}`}
          </div>
        ))}
        <button onClick={() => this.addStock()}>Add Stock</button>
        <button onClick={() => this.removeStock()}>Remove Stock</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);
