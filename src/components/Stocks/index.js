import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addQuote, removeQuote } from '../../modules/stocks';

let counter1 = 1;
let counter2 = 1;

class Stocks extends Component {
  componentDidMount() {}

  addQuote() {
    const { addQuote } = this.props;

    addQuote({
      name: 'TEST' + counter1++
    });
  }

  removeQuote() {
    const { removeQuote } = this.props;

    removeQuote({
      name: 'TEST' + counter2++
    });
  }

  render() {
    const { quotes } = this.props;

    //if (!quotes || !quotes.length) return <div className="spinner">No quotes.</div>;

    return (
      <div className="Stocks_Container">
        {quotes.map((quote, i) => (
          <div className="test" key={i}>
            {quote.name}
          </div>
        ))}
        <button onClick={() => this.addQuote()}>Add Quote</button>
        <button onClick={() => this.removeQuote()}>Remove Quote</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quotes: state.stocks.quotes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addQuote,
      removeQuote
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);
