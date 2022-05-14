import appContextMock from './appContextMock';
import { GroupedStockOrders, MatchingGroupedStockOrders } from '../../services/api-user.type';

const { matchingGrouped, grouped } = appContextMock;

const flatGrouped = (matchingGrouped: MatchingGroupedStockOrders, grouped: GroupedStockOrders) => {
  const list = [];
  const WORDS = ['best', 'second', 'third'];
  for (const [symbol, symbolArr] of Object.entries(grouped)) {
    let sum = 0;
    let total = 0;
    const matchingOrders = matchingGrouped[symbol]?.matchingOrders || [];
    matchingOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const matchingInfo = {
      price: +matchingOrders[0]?.price,
      orders: matchingOrders.filter((i) => i.price === +matchingOrders[0]?.price && i.fee > 0),
    };
    console.log('🚀matchingInfo', matchingInfo);
    const prices = matchingOrders.map((o) => o.price);
    matchingOrders.forEach((o) => {
      sum += o.price * o.quantity;
      total += o.quantity;
    });

    let toReturn = {
      matchingInfo,
      symbol,
      matchedInfo: {
        high: prices.length && Math.max(...prices),
        low: prices.length && Math.min(...prices),
        avg: total && sum / total,
        total,
      },
    };

    const buyPrices = Object.keys(symbolArr.buy || {}).sort((a, b) => +b - +a);
    const sellPrices = Object.keys(symbolArr.sell || {}).sort((a, b) => +a - +b);
    WORDS.forEach((word, i) => {
      toReturn = {
        ...toReturn,
        [`${word}Buy`]: {
          price: +buyPrices[i],
          orders: symbolArr.buy?.[buyPrices[i]] || [],
        },
        [`${word}Sell`]: {
          price: +sellPrices[i],
          orders: symbolArr.sell?.[sellPrices[i]] || [],
        },
      };
    });
    list.push(toReturn);
    // state[symbol]
  }
  console.log('🚀 ~ file: test.js ~ line 206 ~ list', list);
  return list;
};

// flatGrouped(matchingGrouped, grouped);
