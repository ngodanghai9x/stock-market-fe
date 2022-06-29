import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AssetInfo } from './AssetInfo';
import { AuthContext } from '../../../context/auth/AuthContext';
import { AppContext } from '../../../context';
import { numberWithCommas } from '../../../lib/utils';
import { PriceItem } from '../../../services/api-user.type';

enum CurrentTab {
  Asset = 'Asset',
  Debts = 'Debts',
  LoanAmount = 'LoanAmount',
}

const TABS = [
  {
    title: 'Tài sản',
    key: CurrentTab.Asset,
  },
  {
    title: 'Nợ',
    key: CurrentTab.Debts,
  },
  {
    title: 'Khoản',
    key: CurrentTab.LoanAmount,
  },
];

const DebtsTab = () => {
  const {
    userInfo: { user, citizenIdentity },
  } = React.useContext(AppContext);
  const debt = user.money - user.lockedMoney;

  return (
    <div>
      <div className="my-4 ml-4">
        <p>Tổng nợ: {debt < 0 ? debt : 0}</p>
      </div>
      <div className="flex  text-white px-4 border-y">
        <div className="flex-1 border-r py-4 flex justify-between">
          <span>Nợ gốc ký quỹ</span>
          <span className="block mr-4">--</span>
        </div>
        <div className="flex-1  py-4 ml-4 flex justify-between">
          <span>Nợ lãi ký quỹ</span>
          <span>--</span>
        </div>
      </div>
      <div className="flex  text-white px-4 border-y">
        <div className="flex-1 border-r py-4 flex justify-between">
          <span>Nợ dự kiến</span>
          <span className="block mr-4">--</span>
        </div>
        <div className="flex-1  py-4 ml-4 flex justify-between">
          <span>Nợ phí lưu kí và khác</span>
          <span>--</span>
        </div>
      </div>
      <div className="flex  text-white px-4 border-y">
        <div className="flex-1 border-r py-4 flex justify-between">
          <span>Tỷ lệ ký quỹ (Rtt)</span>
          <span className="block mr-4">--</span>
        </div>
        <div className="flex-1  py-4 ml-4 flex justify-between">
          <span>Số tiền phải nộp</span>
          <span>{debt < 0 ? debt : 0}</span>
        </div>
      </div>
    </div>
  );
};

const LoanAmountTab = () => {
  return <div className="flex justify-center items-center h-[85%]">Hiện không có khoản vay</div>;
};

const Asset = ({ itemList }: { itemList: PriceItem[] }) => {
  const [currentTab, setCurrentTab] = React.useState<CurrentTab>(CurrentTab.Asset);

  const { user: authUser } = React.useContext(AuthContext);
  const {
    userInfo: { user, citizenIdentity },
  } = React.useContext(AppContext);
  const [marketHistory, setMarketHistory] = React.useState({});

  const fetchData = React.useCallback(async () => {
    // const { grouped, matchingGrouped, history } = await getAllOrder();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col bg-trueGray-800 text-white border-t row-span-2 h-full w-full">
      <div className="flex flex-1 w-full">
        <div className=" border-gray-400 border-r-4 w-1/6 max-h-[415px] overflow-y-scroll">
          <p className="font-semibold m-2 text-center">Thông tin tiền</p>
          <div className="flex justify-between px-4 border-y py-2">
            <span>Sức mua</span>
            <span>{numberWithCommas(user.money)}</span>
          </div>
          {/* <div className="flex justify-between px-4 border-y py-2">
            <span>Sức mua</span>
            <span>-</span>
          </div> */}
          <div className="">
            <Accordion sx={{ backgroundColor: '#171717', color: 'white', py: '2px' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} aria-controls="panel1a-content">
                <Typography>Tài khoản</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4 }}>
                <div className="flex justify-between py-2 ">
                  <span>Tiền mặt</span>
                  <span>{numberWithCommas(user.money)}</span>
                </div>
                <div className="flex justify-between py-2 ">
                  <span>Tiền phong tỏa</span>
                  <span>{numberWithCommas(user.lockedMoney || 0)}</span>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex mx-2">
            {TABS.map((tab, i) => (
              <button
                className={`px-4 py-2 border-b font-semibold	 min-w-[90px] ${
                  currentTab === tab.key ? 'border-myYellow text-myYellow ' : ''
                }`}
                key={tab.key + i + 'Asset'}
                onClick={() => setCurrentTab(tab.key)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          {currentTab === CurrentTab.Debts && <DebtsTab />}
          {currentTab === CurrentTab.Asset && <AssetInfo itemList={itemList} />}
          {currentTab === CurrentTab.LoanAmount && <LoanAmountTab />}
        </div>
      </div>
    </div>
  );
};

export default Asset;
