import React, { createContext, ReactElement, useEffect, useState, useCallback, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { StockOrder } from '../services/api-admin.type';
import { AuthContext } from './auth/AuthContext';

const SOCKET_ENDPOINT = process.env.REACT_APP_API_HOST || '';
export interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  AddStockOrder: (order: StockOrder) => void;
  EditStockOrder: (order: StockOrder) => void;
  DeleteStockOrder: (order: StockOrder) => void;
}

export interface ClientToServerEvents {
  hello: (helloData: string) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_ENDPOINT);
export const SocketContext = createContext<{
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}>({
  socket: null,
});

export const SocketProvider = (props: { children: ReactElement }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('my socket id ', socket.id); // x8WIv7-mJelg7on_ALbx
    });

    // emit USER_ONLINE event
    // socket.emit('USER_ONLINE', userId);

    // subscribe to socket events
    socket.on('AddStockOrder', (stockOrder) => {
      if (stockOrder.userId === user.userId) return;
      console.log('🚀 ~ file: SocketContext.tsx ~ line 34 ~ socket.on ~ stockOrder', stockOrder);
    });

    socket.on('EditStockOrder', (stockOrder) => {
      if (stockOrder.userId === user.userId) return;
      console.log('🚀 ~ file: SocketContext.tsx ~ line 34 ~ socket.on ~ stockOrder', stockOrder);
    });

    socket.on('DeleteStockOrder', (stockOrder) => {
      if (stockOrder.userId === user.userId) return;
      console.log('🚀 ~ file: SocketContext.tsx ~ line 34 ~ socket.on ~ stockOrder', stockOrder);
    });

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      // socket.off('JOIN_REQUEST_ACCEPTED', handleInviteAccepted);
    };
  }, [user.userId]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {};
