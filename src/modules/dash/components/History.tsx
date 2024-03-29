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
import { getUserHistory, getUserOrders } from '../../../services/api-user.service';
import { StockOrder, StockOrderMatching } from '../../../services/api-admin.type';
import { formatDate, formatOrderStatus, numberWithCommas } from '../../../lib/utils';

const tableHeadings = [
  'Mã',
  'Ngày GD',
  'Lệnh',
  'KL đặt',
  'Giá đặt',
  'KL khớp',
  'Giá khớp',
  'GT khớp',
  'Phí',
  'Giá vốn',
  'GT vốn',
  'Lãi/lỗ',
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

const History = () => {
  const { user } = React.useContext(AuthContext);
  const [list, setList] = React.useState<StockOrder[]>([]);

  const fetchData = React.useCallback(async () => {
    const { total, orders } = await getUserHistory(user.userId);
    setList(orders);
  }, [user.userId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const otherData = React.useMemo(() => {
    // let mapOrder = {} as Record<string, { orderQuantity: number; orderPrice: number }>;
    let fee = 0,
      gtMua = 0,
      matchedQuantity = 0,
      matchedPrice = 0;

    list.forEach((order) => {
      if (order.isBuy) {
        gtMua += order.quantity * order.price;
      }
      // let orderQuantity = 0,
      //   orderPrice = 0;

      order.orderMatchings?.forEach((m) => {
        fee += m.fee;
        // orderQuantity += m.quantity;
        // orderPrice += m.price;
        matchedQuantity += m.quantity;
        matchedPrice += m.price;
      });

      // mapOrder[order.orderId] = {
      //   orderQuantity,
      //   orderPrice,
      // };
    });

    return {
      fee,
      gtMua,
      matchedQuantity,
      matchedPrice,
      // mapOrder,
    };
  }, [list]);

  return (
    <div className="h-full">
      <div className="flex m-4">
        <span className="font-semibold block mr-4">Lịch sử</span>
        <ul className="flex">
          <li className="px-4 border-b text-myYellow border-myYellow">
            <button>Lệnh thường</button>
          </li>
          <li className="px-4 border-b opacity-70">
            <button disabled>Lệnh điều khiện</button>
          </li>
        </ul>
      </div>
      <div className="m-2">
        <ul className="flex">
          <li>
            <span>KL khớp: {numberWithCommas(otherData.matchedQuantity)}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>GT khớp: {numberWithCommas(otherData.matchedPrice)}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>Phí: {numberWithCommas(otherData.fee)}</span>
          </li>
          <li className="ml-3 border-l pl-3">
            <span>GT mua: {numberWithCommas(otherData.gtMua)}</span>
          </li>
        </ul>
      </div>
      <div>
        <TableContainer component={Paper} sx={{ backgroundColor: '#171717', maxHeight: '250px' }}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeadings.map((tableHeading, i) => (
                  <TableCell
                    key={tableHeading + i + `History`}
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
                const orderMatchings = row?.orderMatchings?.length
                  ? row?.orderMatchings
                  : ([{}] as StockOrderMatching[]);
                // [need_test] cho các lệnh đã hoàn thành nhưng k khớp lệnh do hết hạn
                return orderMatchings.map((order, i) => {
                  const gtKhop = order.price * order.quantity;
                  const gtVon = Number(row.currentPrice) * Number(order.quantity) || 0;
                  const laiLo = row.isBuy ? 0 : gtKhop - (gtVon + order.fee);
                  return (
                    <StyledTableRow key={row.orderId + i + `orderMatchings`}>
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
                        {formatDate(row.createdAt)}
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
                        {numberWithCommas(row.price)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {numberWithCommas(order.quantity)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {numberWithCommas(order.price)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {numberWithCommas(gtKhop)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {order.fee}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {numberWithCommas(row.currentPrice || 0)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {numberWithCommas(gtVon)}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {numberWithCommas(laiLo)}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {formatOrderStatus(row)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color: 'white',
                        }}
                      >
                        {row.orderId}_{order.id}
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

export default History;
