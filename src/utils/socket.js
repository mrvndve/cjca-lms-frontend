import { 
  io, 
} from 'socket.io-client';

import { 
  socketServer, 
} from './constants';

const socket = io(socketServer);
socket.on("connection");

export const SocketConnect = () => {
  return socket;
}