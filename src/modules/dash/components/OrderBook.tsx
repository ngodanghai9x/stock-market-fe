import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../../../context/auth/AuthContext';
import { cancelStockOrder, getUserOrders } from '../../../services/api-user.service';
import { StockOrder, StockOrderMatching } from '../../../services/api-admin.type';
import { formatDate, formatOrderStatus, numberWithCommas } from '../../../lib/utils';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { STORAGE } from '../../../constants';
import { AppContext } from '../../../context';

const tableHeadings = [
  'Mã',
  'Loại lệnh',
  'Giao dịch',
  'KL đặt',
  'KL khớp',
  'Giá đặt',
  'Ngày đặt',
  'Trạng thái',
  'Số hiệu lệnh',
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: '#434343',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderColor: '#434343',
  '&:nth-of-type(odd)': {
    backgroundColor: '#171717',
  },
  '&:hover': {
    backgroundColor: '#808080',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
    borderTop: 0,
  },
}));

const OrderBook = () => {
  const {
    userInfo: { user },
    fetchUser,
    fetchData: fetchPrices,
  } = React.useContext(AppContext);
  const [list, setList] = React.useState<StockOrder[]>([]);

  const fetchData = React.useCallback(async () => {
    const { total, orders } = await getUserOrders(user.userId);
    setList(orders);
  }, [user.userId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const otherData = React.useMemo(() => {
    let mapOrder = {} as Record<string, { orderQuantity: number; orderPrice: number }>;
    let quantity = 0,
      price = 0,
      matchedQuantity = 0,
      matchedPrice = 0;

    list.forEach((order) => {
      price += order.price;
      quantity += order.quantity;

      let orderQuantity = 0,
        orderPrice = 0;

      order.orderMatchings?.forEach((m) => {
        orderQuantity += m.quantity;
        orderPrice += m.price;
        matchedQuantity += m.quantity;
        matchedPrice += m.price;
      });

      mapOrder[order.orderId] = {
        orderQuantity,
        orderPrice,
      };
    });

    return {
      price,
      quantity,
      matchedQuantity,
      matchedPrice,
      mapOrder,
    };
  }, [list]);

  const cancelOrder = async (order: StockOrder) => {
    const otpTrading = localStorage.getItem(STORAGE.otpTrading) || '';
    if (!otpTrading) {
      // setIsOpenModal(true);
      // fetchOTP();
      toast(`Bạn cần nhập mã OTP trước khi hủy lệnh`);
      return;
    }
    /*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
    const isConfirm = confirm(
      `Bạn đang hủy lệnh ${order.isBuy ? 'MUA' : 'BÁN'} ${order.stockSymbol} (Số hiệu ${order.orderId})`
    );
    if (isConfirm) {
      const res = await cancelStockOrder(order.orderId, otpTrading);
      if (res.status === 200) {
        fetchPrices();
        fetchUser();
        fetchData();
      }
      toast(res.message);
    }
  };

  return (
    <div className="h-full">
      <div className="flex m-4">
        <span className="font-semibold block mr-4">Sổ lệnh</span>
        <ul className="flex">
          <li className="px-4 border-b text-myYellow border-myYellow">
            <button>Thường</button>
          </li>
          <li className="px-4 border-b opacity-70">
            <button disabled>Điều khiện</button>
          </li>
        </ul>
      </div>
      <div className="m-2">
        <ul className="flex">
          <li>
            <span>KL đặt: {numberWithCommas(otherData.quantity)}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>GT đặt: {numberWithCommas(otherData.price)}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>KL khớp: {numberWithCommas(otherData.matchedQuantity)}</span>
          </li>
          {/* <li className="ml-3 border-l pl-3">
            <span>GT khớp: {numberWithCommas(otherData.matchedPrice)}</span>
          </li> */}
        </ul>
      </div>
      <div>
        <TableContainer component={Paper} sx={{ backgroundColor: '#171717', maxHeight: '250px' }}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeadings.map((tableHeading) => (
                  <TableCell
                    key={'orderBook' + tableHeading}
                    sx={{
                      color: 'white',
                      fontWeight: '600',
                      backgroundColor: '#363636',
                      boxShadow: '0 2px 4px 0 #000000cc',
                      '&:nth-child(2)': {
                        borderLeft: '1px solid #434343',
                      },
                    }}
                    align="center"
                  >
                    {tableHeading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => {
                // const orderMatchings = row?.orderMatchings?.length
                //   ? row?.orderMatchings
                //   : ([{}] as StockOrderMatching[]);
                // return orderMatchings.map((order) => {
                return (
                  <StyledTableRow key={'orderBook' + row.orderId}>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {row.stockSymbol}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                        borderLeft: '1px solid #434343',
                      }}
                    >
                      {row.orderTypeId === 1 && 'Lệnh thường'}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {row.isBuy ? 'Mua' : 'Bán'}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {numberWithCommas(row.quantity)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {numberWithCommas(otherData.mapOrder[row.orderId]?.orderQuantity)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {numberWithCommas(row.price)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {formatDate(row.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {formatOrderStatus(row)}
                      {!row.isDone && <CancelIcon sx={{ mx: 2, cursor: 'pointer' }} onClick={() => cancelOrder(row)} />}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: 'white',
                      }}
                    >
                      {row.orderId}
                    </StyledTableCell>
                  </StyledTableRow>
                );
                // });
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OrderBook;
