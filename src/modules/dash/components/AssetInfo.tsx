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
import { formatDate, numberWithCommas } from '../../../lib/utils';
import { AppContext } from '../../../context';
import { PriceItem } from '../../../services/api-user.type';

const tableHeadings = [
  'Mã',
  'SL Tổng',
  'Được GD',
  'Giá vốn',
  'Thị giá',
  'Giá trị vốn',
  'Giá trị',
  'Lãi/lỗ',
  '% Lãi/lỗ',
];

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

export const AssetInfo = ({ itemList }: { itemList: PriceItem[] }) => {
  const {
    userInfo: { storage },
  } = React.useContext(AppContext);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <TableContainer component={Paper} sx={{ backgroundColor: '#171717', maxHeight: '250px' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {tableHeadings.map((tableHeading) => (
                <TableCell
                  key={tableHeading}
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
            {Object.values(storage).map((row) => {
              const priceItem = itemList.find((o) => o.symbol === row.stockSymbol) || ({} as PriceItem);
              const giaTriVon = row.quantity + (row.lockedQuantity || 0) * row.price;
              const giaTri = row.quantity + (row.lockedQuantity || 0) * priceItem.matchingPrice;
              return (
                <StyledTableRow>
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
                    }}
                  >
                    {numberWithCommas(row.quantity + (row.lockedQuantity || 0))}
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
                    {numberWithCommas(priceItem.matchingPrice)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {numberWithCommas(giaTriVon)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {numberWithCommas(giaTri)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {numberWithCommas(giaTri - giaTriVon)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {}
                    {+(((giaTri - giaTriVon) * 100) / giaTriVon).toFixed(3) + '%'}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
