import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import food from './food';

export default combineReducers({
  routing: routerReducer,
  counter,
  food
});
