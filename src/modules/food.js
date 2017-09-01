import axios from 'axios';

export const GET_FOOD = 'food/GET_FOOD';

const initialState = {
  food: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOOD:
      return {
        ...state,
        food: action.payload
      };

    default:
      return state;
  }
};

export const getFood = q => {
  console.log(1, 'response');
  return dispatch => {
    console.log(2, 'response');
    axios
      .get(`${process.env.REACT_APP_API_URI}/food?q=${q}`)
      .then(response => {
        console.log(response);
        dispatch({
          type: GET_FOOD,
          payload: response
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};
