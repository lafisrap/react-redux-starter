import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from '../../store'
import Home from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Home /></Provider>, div);
  const st = store.getState();
});
