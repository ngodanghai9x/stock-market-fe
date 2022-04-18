import React, { createContext, ReactElement, useEffect, useState, useCallback, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { ActionTypes, RoleIdType } from '../constants';
import { StockOrder } from '../services/api-admin.type';
import { AppContext } from './AppContext';
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
  const { store, dispatch } = useContext(AppContext);

  const isIgnoreSocket = useCallback(
    (stockOrder: StockOrder): boolean => {
      if ([RoleIdType.admin, RoleIdType.moderator].includes(user.roleId)) return true;
      if (stockOrder.userId === user.userId) return true;
      return false;
    },
    [user.roleId, user.userId]
  );

  useEffect(() => {
    socket.on('connect', () => {
      console.log('my socket id ', socket.id); // x8WIv7-mJelg7on_ALbx
    });

    // emit USER_ONLINE event
    // socket.emit('USER_ONLINE', userId);

    // subscribe to socket events
    socket.on('AddStockOrder', (stockOrder) => {
      if (isIgnoreSocket(stockOrder)) return;
      dispatch({ type: ActionTypes.AddStockOrder, payload: stockOrder });
    });

    socket.on('EditStockOrder', (stockOrder) => {
      if (isIgnoreSocket(stockOrder)) return;
      dispatch({ type: ActionTypes.EditStockOrder, payload: stockOrder });
    });

    socket.on('DeleteStockOrder', (stockOrder) => {
      if (isIgnoreSocket(stockOrder)) return;
      dispatch({ type: ActionTypes.DeleteStockOrder, payload: stockOrder });
    });

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      // socket.off('JOIN_REQUEST_ACCEPTED', handleInviteAccepted);
    };
  }, [dispatch, isIgnoreSocket]);

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
