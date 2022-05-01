import React, {
  Children,
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ActionTypes } from '../constants';
import { StockOrder } from '../services/api-admin.type';
import { getAllOrder } from '../services/api-user.service';
import { GroupedHistory, GroupedStockOrders, MatchingGroupedStockOrders, Purchase } from '../services/api-user.type';
import appContextMock from './mock/appContextMock';

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
  marketHistory: GroupedHistory;
  matchingGrouped: MatchingGroupedStockOrders;
  dispatch: React.Dispatch<Action>;
  fetchData: () => Promise<void>;
}>({
  store: initialState,
  marketHistory: {},
  matchingGrouped: {},
  dispatch: (a: Action) => {},
  fetchData: async () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);
  const [matchingState, setMatchingState] = useState<MatchingGroupedStockOrders>({});
  const [marketHistory, setMarketHistory] = useState<GroupedHistory>({});

  const fetchData = useCallback(async () => {
    const { grouped, matchingGrouped, history } = await getAllOrder();
    setMatchingState(matchingGrouped);
    setMarketHistory(history);
    dispatch({
      type: ActionTypes.Initialize,
      initialState: grouped,
      payload: null,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AppContext.Provider
      value={{
        store: state,
        matchingGrouped: matchingState,
        marketHistory,
        dispatch: withLogger(dispatch),
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
