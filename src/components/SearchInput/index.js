import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import { emitMessage } from 'react-websockets-component';
import { addStock } from '../../modules/stocks';
import SYMBOLS from './nasdaq.json';

import './index.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      symbol: null
    };
  }

  getValidationState() {
    const { value } = this.state;

    if (SYMBOLS.indexOf(value) > -1) {
      return 'success';
    } else {
      return 'error';
    }
  }

  addStock() {
    const { addStock, startDate, endDate } = this.props;
    const { symbol } = this.state;

    addStock({
      symbol,
      startDate,
      endDate
    });

    emitMessage('addStock', symbol);

    this.setState({ value: '', symbol: null });
  }

  onChange(e) {
    let { value } = e.target;

    value = value.toUpperCase();

    this.setState({ value });

    if (SYMBOLS.indexOf(value) > -1) this.setState({ symbol: value });
    else this.setState({ symbol: null });
  }

  render() {
    return (
      <form>
        <Row>
          <Col lg={10}>
            <FormGroup
              controlId="formSearchInput"
              validationState={this.getValidationState()}
              className="SearchInput_FromControl"
            >
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Type an NASDAQ stock symbol ... e.g. GOOG"
                onChange={e => this.onChange(e)}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
          <Col lg={2}>
            <Button
              onClick={() => this.addStock()}
              disabled={!this.state.symbol}
            >
              Add Symbol
            </Button>
          </Col>
        </Row>
      </form>
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
      addStock
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
