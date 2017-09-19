import io from 'socket.io-client';

let socket = null;

export const connectWebsocket = ({ uri, services }) => {
  socket = io(uri);
  services.forEach(service => socket.on(service.service, service.callback));
};

export const emitMessage = (type, payload) => socket.emit(type, payload);
