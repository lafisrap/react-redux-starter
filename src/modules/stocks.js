import moment from 'moment';

export const ADD_STOCK = 'stock/ADD_STOCK';
export const REMOVE_STOCK = 'stock/REMOVE_STOCK';
export const UPDATE_STOCK_DATA = 'stock/UPDATE_STOCK_DATA';

const QUANDL_API = 'https://www.quandl.com/api/v3/datasets/WIKI/';

const initialState = {
  stocks: [],
  startDate: moment().subtract(1, 'year'),
  endDate: moment()
};

export default (state = initialState, action) => {
  let stock, index;

  switch (action.type) {
    case ADD_STOCK:
      stock = state.stocks.find(
        stock => stock.symbol === action.payload.symbol
      );
      index = state.stocks.indexOf(stock);

      // Don't add if it is already there
      if (index > -1) return state;

      return {
        ...state,
        stocks: [...state.stocks, action.payload]
      };

    case UPDATE_STOCK_DATA:
      stock = state.stocks.find(
        stock => stock.symbol === action.payload.symbol
      );
      index = state.stocks.indexOf(stock);

      // Don't update if stock is not there
      if (index === -1) return state;

      // Shorten the name
      const bracketPos = Math.max(action.payload.name.search(/\(/) - 1, 0);
      action.payload.name = action.payload.name.slice(0, bracketPos);

      return {
        ...state,
        stocks: [
          ...state.stocks.slice(0, index),
          action.payload,
          ...state.stocks.slice(index + 1)
        ]
      };

    case REMOVE_STOCK:
      stock = state.stocks.find(
        stock => stock.symbol === action.payload.symbol
      );
      index = state.stocks.indexOf(stock);

      // Don't remove if it is not there
      if (index === -1) return state;

      return {
        ...state,
        stocks: [
          ...state.stocks.slice(0, index),
          ...state.stocks.slice(index + 1)
        ]
      };

    default:
      return state;
  }
};

export const addStock = stock => {
  return dispatch => {
    dispatch({
      type: ADD_STOCK,
      payload: stock
    });
    loadQuotes(stock, response => updateStockData(dispatch, stock, response));
  };
};

export const removeStock = options => {
  return dispatch => {
    dispatch({
      type: REMOVE_STOCK,
      payload: options
    });
  };
};

const loadQuotes = ({ symbol, startDate, endDate }, done) => {
  fetch(
    `${QUANDL_API}${symbol}.json?start_date=${startDate.format(
      'YYYY-MM-DD'
    )}&end_date=${endDate.format(
      'YYYY-MM-DD'
    )}&order=asc&column_index=4&transformation=rdiff`
  )
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then(response => done(response))
    .catch(error => {
      console.error(error);
    });
};

const updateStockData = (dispatch, stock, response) => {
  const { data, name, description } = response.dataset;
  dispatch({
    type: UPDATE_STOCK_DATA,
    payload: {
      ...stock,
      data,
      name,
      description
    }
  });
};
