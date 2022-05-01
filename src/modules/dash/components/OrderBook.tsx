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
import { getUserOrders } from '../../../services/api-user.service';
import { StockOrder, StockOrderMatching } from '../../../services/api-admin.type';
import { formatDate } from '../../../lib/utils';

const tableHeadings = [
  'Mã',
  'Loại lệnh',
  'Giao dịch',
  'KL đặt',
  'KL khớp',
  'Giá đặt',
  'Giá khớp',
  'Ngày đặt',
  'Trạng thái',
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#262626',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
    borderTop: 0,
  },
}));

const OrderBook = () => {
  const { user } = React.useContext(AuthContext);
  const [list, setList] = React.useState<StockOrder[]>([]);

  const fetchData = React.useCallback(async () => {
    const { total, orders } = await getUserOrders(user.userId);
    setList(orders);
  }, [user]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const otherData = React.useMemo(() => {
    let quantity = 0,
      price = 0,
      matchedQuantity = 0,
      matchedPrice = 0;
    list.forEach((order) => {
      price += order.price;
      quantity += order.quantity;
      order.orderMatchings?.forEach((m) => {
        matchedQuantity += m.quantity;
        matchedPrice += m.price;
      });
    });

    return {
      price,
      quantity,
      matchedQuantity,
      matchedPrice,
    };
  }, [list]);

  return (
    <div>
      <div className="flex m-4">
        <span className="font-semibold block mr-4">Sổ lệnh</span>
        <ul className="flex">
          <li className="px-4 border-b text-red-500 border-red-500">
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
            <span>KL đặt: {otherData.quantity}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>GT đặt: {otherData.price}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>KL khớp: {otherData.matchedQuantity}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>GT khớp: {otherData.matchedPrice}</span>
          </li>
        </ul>
      </div>
      <div>
        <TableContainer component={Paper} sx={{ backgroundColor: 'black', maxHeight: '250px' }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeadings.map((tableHeading) => (
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: '600',
                      backgroundColor: 'gray',
                      '&:nth-child(2)': {
                        borderLeft: '1px solid lightgray',
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
                const orderMatchings = row?.orderMatchings?.length
                  ? row?.orderMatchings
                  : ([{}] as StockOrderMatching[]);
                return orderMatchings.map((order) => {
                  return (
                    <StyledTableRow key={row.orderId}>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {row.stockSymbol} ({row.orderId})
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                          borderLeft: '1px solid lightgray',
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
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {order.quantity}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {order.price}
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
                        {row.isDone ? 'Hoàn thành' : 'Chờ khớp'}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                });
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OrderBook;
