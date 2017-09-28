import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stock from '../Stock';
import Chart from '../Chart';
import SearchInput from '../SearchInput';
import moment from 'moment';

import './index.css';

class Stocks extends Component {
  convertToChartData(stocks) {
    if (!stocks || !stocks.length) return null;

    const names = stocks.reduce((acc, stock) => {
      const { data, name } = stock;

      if (!data) return acc;

      return acc.concat(name);
    }, []);

    let data = null;
    if (stocks[0].data) {
      data = stocks[0].data.map(d => {
        const date = d[0];
        const obj = { date };
        names.map(name => {
          const stock = stocks.find(stock => stock.name === name);
          const rate = stock.data.find(d => d[0] === date);
          obj[name] = (rate && rate[1]) || null;
        });

        return obj;
      });
    }

    console.log(4, names, data);

    return { names, data };
  }

  render() {
    const { stocks } = this.props;
    const chartData = this.convertToChartData(stocks);
    const chart =
      chartData && chartData.names && chartData.names.length ? (
        <Chart chartData={chartData} />
      ) : (
        <div>No chart data available.</div>
      );

    console.log(
      7,
      chartData,
      chartData && chartData.names && chartData.names.length
    );

    return (
      <div className="Stocks_Container">
        {chart}
        <SearchInput />
        <div className="Stocks_List">
          {stocks.map(stock => <Stock key={stock.symbol} stock={stock} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks.stocks
});

export default connect(mapStateToProps)(Stocks);
