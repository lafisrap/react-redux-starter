import io from 'socket.io-client';
import { ADDED_QUOTE, REMOVED_QUOTE } from './modules/stocks';

const socket = io(process.env.REACT_APP_SOCKET_URI);

socket.on('connect', () => console.log('Connected to WebSocket server...'));
socket.on('disconnect', () =>
  console.log('Disonnected from WebSocket server.')
);

export const init = store => {
  socket.on('added_quote', payload =>
    store.dispatch({ type: ADDED_QUOTE, payload: JSON.parse(payload) })
  );
  socket.on('removed_quote', payload =>
    store.dispatch({ type: REMOVED_QUOTE, payload: JSON.parse(payload) })
  );
};

export const emit = (type, payload) => socket.emit(type, payload);
