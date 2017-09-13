export const ADD_QUOTE = 'stock/ADD_QUOTE';
export const REMOVE_QUOTE = 'stock/REMOVE_QUOTE';
export const ADDED_QUOTE = 'stock/ADDED_QUOTE';
export const REMOVED_QUOTE = 'stock/REMOVED_QUOTE';

const initialState = {
  quotes: []
};

export default (state = initialState, action) => {
  let quote, index;

  switch (action.type) {
    case ADD_QUOTE:
    case ADDED_QUOTE:
      quote = state.quotes.find(quote => quote.name === action.payload.name);
      index = state.quotes.indexOf(quote);

      // Don't add if it is already there
      if (index > -1) return state;

      return {
        ...state,
        quotes: [...state.quotes, action.payload]
      };

    case REMOVE_QUOTE:
    case REMOVED_QUOTE:
      quote = state.quotes.find(quote => quote.name === action.payload.name);
      index = state.quotes.indexOf(quote);
      console.log(6, 'REMOVE_QUOTE', index, quote);

      // Don't remove if it is not there
      if (index === -1) return state;

      return {
        ...state,
        quotes: [
          ...state.quotes.slice(0, index),
          ...state.quotes.slice(index + 1)
        ]
      };

    default:
      return state;
  }
};

export const addQuote = quote => {
  return (dispatch, setState, { emit }) => {
    emit('add-quote', JSON.stringify(quote));
    dispatch({
      type: ADD_QUOTE,
      payload: quote
    });
  };
};

export const removeQuote = quote => {
  return (dispatch, setState, { emit }) => {
    emit('remove-quote', JSON.stringify(quote));
    dispatch({
      type: REMOVE_QUOTE,
      payload: quote
    });
  };
};
