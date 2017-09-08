import axios from 'axios';

export const GET_BARS = 'food/GET_BARS';
export const BOOK_BAR = 'food/BOOK_BAR';

const initialState = {
  bars: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BARS:
      return {
        ...state,
        bars: action.payload
      };

    case BOOK_BAR:
      const { barid, book, username } = action.payload;
      const { bars } = state;

      const bar = bars.find(bar => barid === bar.id);

      // Add or delete booking
      bar.bookedby = bar.bookedby || [];
      if (book) {
        bar.bookedby.push(username);
      } else {
        const index = bar.bookedby.indexOf(username);
        if (index > -1) bar.bookedby.splice(index, 1);
      }

      return {
        ...state,
        bars: bars.slice()
      };
    default:
      return state;
  }
};

export const getBars = location => {
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/getbars?location=${location}`)
      .then(response => {
        if (!response.error) {
          dispatch({
            type: GET_BARS,
            payload: response.data
          });
        } else {
          console.log(response.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const bookBar = (barid, book, user) => {
  return dispatch => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/${book ? 'bookbar' : 'unbookbar'}`,
        { barid }
      )
      .then(response => {
        if (!response.error) {
          const { username } = user;
          dispatch({
            type: BOOK_BAR,
            payload: { barid, book, username }
          });
        } else {
          console.error(response.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
};
