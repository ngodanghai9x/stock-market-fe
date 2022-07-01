import React, { useState } from 'react';
import Asset from './Asset';
import OrderBook from './OrderBook';
import History from './History';
import CloseIcon from '@mui/icons-material/Close';
import { PriceItem } from '../../../services/api-user.type';

enum CurrentTab {
  OrderBook = 'OrderBook',
  Asset = 'Asset',
  History = 'History',
}

const TABS = [
  {
    title: 'Sổ lệnh',
    key: CurrentTab.OrderBook,
  },
  {
    title: 'Tài sản',
    key: CurrentTab.Asset,
  },
  {
    title: 'Lịch sử',
    key: CurrentTab.History,
  },
];

const MoneyInfo = ({ itemList }: { itemList: PriceItem[] }) => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>(CurrentTab.OrderBook);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  return (
    <div className="text-white row-span-2" style={{ height: 'fit-content' }}>
      {isOpenDetail && (
        <div className="flex flex-col bg-trueGray-800 relative h-full">
          <div className="flex-1 border-t h-full">
            <div className="absolute right-4 top-5">
              <button onClick={() => setIsOpenDetail(false)}>
                <CloseIcon sx={{ color: 'white' }} />
              </button>
            </div>
            <div className="h-full ">
              {currentTab === CurrentTab.OrderBook && <OrderBook />}
              {currentTab === CurrentTab.Asset && <Asset itemList={itemList} />}
              {currentTab === CurrentTab.History && <History />}
            </div>
          </div>
        </div>
      )}
      <div className="flex border-t px-2 py-3 fixed w-full bottom-0">
        <ul className="flex" onClick={() => setIsOpenDetail(true)}>
          {TABS.map((tab, i) => (
            <li
              key={tab.key + `MoneyInfo` + i}
              className={`even:border-x even:px-4 even:mx-4 ${currentTab === tab.key ? ' text-myYellow ' : ''}`}
            >
              <button onClick={() => setCurrentTab(tab.key)}>{tab.title}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoneyInfo;
