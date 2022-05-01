import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AssetInfo } from './AssetInfo';
import { AuthContext } from '../../../context/auth/AuthContext';

enum CurrentTab {
  Asset = 'Asset',
  Debts = 'Debts',
  LoanAmount = 'LoanAmount',
}

const TABS = [{
  title: 'Tài sản',
  key: CurrentTab.Asset
}, {
  title: 'Nợ',
  key: CurrentTab.Debts
}, {
  title: 'Khoản',
  key: CurrentTab.LoanAmount
}]

const DebtsTab = () => {
  return (<div>
    <div className='my-4 ml-4'>
      <p>Tổng nợ: 206</p>
    </div>
    <div className='flex  text-white px-4 border-y'>
      <div className='flex-1 border-r py-4 flex justify-between'>
        <span>Nợ gốc ký quỹ</span>
        <span className='block mr-4'>0</span>
      </div>
      <div className='flex-1  py-4 ml-4 flex justify-between'>
        <span>Nợ lãi ký quỹ</span>
        <span>0</span>
      </div>
    </div>
    <div className='flex  text-white px-4 border-y'>
      <div className='flex-1 border-r py-4 flex justify-between'>
        <span>Nợ gốc ký quỹ</span>
        <span className='block mr-4'>0</span>
      </div>
      <div className='flex-1  py-4 ml-4 flex justify-between'>
        <span>Nợ lãi ký quỹ</span>
        <span>0</span>
      </div>
    </div>
    <div className='flex  text-white px-4 border-y'>
      <div className='flex-1 border-r py-4 flex justify-between'>
        <span>Nợ gốc ký quỹ</span>
        <span className='block mr-4'>0</span>
      </div>
      <div className='flex-1  py-4 ml-4 flex justify-between'>
        <span>Nợ lãi ký quỹ</span>
        <span>0</span>
      </div>
    </div>
  </div>)
}

const Asset = () => {
  const [currentTab, setCurrentTab] = React.useState<CurrentTab>(CurrentTab.Debts);

  const { user } = React.useContext(AuthContext);
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
          <div className='flex justify-between px-4 border-y py-2'>
            <span>Sức mua</span>
            <span>-</span>
          </div>
          <div className='flex justify-between px-4 border-y py-2'>
            <span>Sức mua</span>
            <span>-</span>
          </div>
          <div className=''>
            <Accordion sx={{ backgroundColor: '#262626', color: 'white', py: '2px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Tài khoản TCBS</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4 }}>
                <div className='flex justify-between py-2 '>
                  <span>Tiền mặt</span>
                  <span>0</span>
                </div>
                <div className='flex justify-between py-2 '>
                  <span>Tiền mặt</span>
                  <span>0</span>
                </div>
                <div className='flex justify-between py-2 '>
                  <span>Tiền mặt</span>
                  <span>0</span>
                </div>
                <div className='flex justify-between py-2 '>
                  <span>Tiền mặt</span>
                  <span>0</span>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className='flex-1'>
          <div className="flex mx-2">
            {TABS.map(tab => <button className={`px-4 py-2 border-b font-semibold	 min-w-[90px] ${currentTab === tab.key ? 'border-red-500 text-red-500 ' : ''}`} key={tab.key} onClick={() => setCurrentTab(tab.key)}>{tab.title}</button>)}
          </div>
          {currentTab === CurrentTab.Debts && <DebtsTab />}
          {currentTab === CurrentTab.Asset && <AssetInfo />}
        </div>
      </div>
    </div>
  )
}

export default Asset