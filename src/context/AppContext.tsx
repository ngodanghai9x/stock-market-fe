import React, { Children, createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import { ActionTypes } from '../constants';
import { StockOrder } from '../services/api-admin.type';
import { getAllOrder } from '../services/api-user.service';
import { GroupedStockOrders, Purchase } from '../services/api-user.type';
import appContextMock from './mock/appContext';

// const initialState = { HNG: {} } as GroupedStockOrders;
const initialState = appContextMock.grouped as GroupedStockOrders;
const initializeState = (store: GroupedStockOrders) => store;
type Action = {
  type: ActionTypes;
  payload: StockOrder | null;
  initialState?: GroupedStockOrders;
};

// An interface for our state
type State = GroupedStockOrders;

function reducer(state: State, action: Action): State {
  console.log('Prev state: ', state);
  const stockOrder = action.payload || ({} as StockOrder);
  const purchase: Purchase = stockOrder.isBuy ? 'buy' : 'sell';
  const { stockSymbol: symbol, price } = stockOrder;

  switch (action.type) {
    case ActionTypes.Initialize: {
      return action.initialState || {};
    }
    case ActionTypes.AddStockOrder: {
      return {
        ...state,
        [symbol]: {
          ...(state[symbol] || {}),
          [purchase]: {
            ...(state[symbol][purchase] || {}),
            [price]: [...(state[symbol][purchase][price] || []), stockOrder],
          },
        },
      };
    }
    case ActionTypes.EditStockOrder: {
      const clonePrices = [...(state[symbol][purchase][price] || [])];
      const orderIndex = clonePrices.findIndex((so) => so.orderId === stockOrder.orderId);
      clonePrices.splice(orderIndex, 1, stockOrder);

      return {
        ...state,
        [symbol]: {
          ...(state[symbol] || {}),
          [purchase]: {
            ...(state[symbol][purchase] || {}),
            [price]: clonePrices,
          },
        },
      };
    }
    case ActionTypes.DeleteStockOrder: {
      return {
        ...state,
        [symbol]: {
          ...(state[symbol] || {}),
          [purchase]: {
            ...(state[symbol][purchase] || {}),
            [price]: (state[symbol][purchase][price] || []).filter((so) => so.orderId !== stockOrder.orderId),
          },
        },
      };
    }
    default:
      throw new Error();
  }
}

function withLogger(dispatch: React.Dispatch<Action>): React.Dispatch<Action> {
  return function (action: Action) {
    console.log('Action:', action);
    return dispatch(action);
  };
}

export const AppContext = createContext<{
  store: GroupedStockOrders;
  dispatch: React.Dispatch<Action>;
}>({
  store: initialState,
  dispatch: (a: Action) => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { grouped },
      } = await getAllOrder();
      dispatch({
        type: ActionTypes.Initialize,
        initialState: grouped,
        payload: null,
      });
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        store: state,
        dispatch: withLogger(dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
