import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import food from './food';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  counter,
  food,
  user
});
