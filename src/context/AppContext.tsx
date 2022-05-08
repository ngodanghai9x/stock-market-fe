import React, {
  Children,
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ActionTypes } from '../constants';
import { StockOrder } from '../services/api-admin.type';
import { getAllOrder, getUserById } from '../services/api-user.service';
import {
  GetUser,
  GroupedHistory,
  GroupedStockOrders,
  MatchingGroupedStockOrders,
  Purchase,
} from '../services/api-user.type';
import { AuthContext } from './auth/AuthContext';
import appContextMock from './mock/appContextMock';

// const initialState = { HNG: {} } as GroupedStockOrders;
const initialState = appContextMock.grouped as GroupedStockOrders;
const initializeState = (store: GroupedStockOrders) => store;
type Action = {
  type: ActionTypes;
  payload: StockOrder | null;
  initialState?: GroupedStockOrders;
};

const initUserInfo = {
  user: {},
  citizenIdentity: null,
  storage: {},
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
  userInfo: GetUser;
  dispatch: React.Dispatch<Action>;
  fetchData: () => Promise<void>;
  fetchUser: () => Promise<void>;
}>({
  store: initialState,
  marketHistory: {},
  matchingGrouped: {},
  userInfo: initUserInfo as GetUser,
  dispatch: (a: Action) => {},
  fetchData: async () => {},
  fetchUser: async () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);
  const [matchingState, setMatchingState] = useState<MatchingGroupedStockOrders>({});
  const [marketHistory, setMarketHistory] = useState<GroupedHistory>({});
  const [userInfo, setUserInfo] = useState<GetUser>(initUserInfo as GetUser);

  const {
    user: { userId },
  } = useContext(AuthContext);

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

  const fetchUser = useCallback(async () => {
    const { user, citizenIdentity, storage } = await getUserById(userId);
    setUserInfo({
      user: {
        ...user,
        birthday: user.birthday && new Date(user.birthday),
      },
      citizenIdentity,
      storage,
    });
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AppContext.Provider
      value={{
        store: state,
        matchingGrouped: matchingState,
        marketHistory,
        userInfo,
        dispatch: withLogger(dispatch),
        fetchData,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
