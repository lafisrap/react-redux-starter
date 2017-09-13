import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import bars from './bars';
import stocks from './stocks';

export default combineReducers({
  routing,
  user,
  stocks,
  bars
});
