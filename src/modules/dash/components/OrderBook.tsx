import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const tableHeadings = [
  'Mã',
  'Trần',
  'Sàn',
  'TC',
  'Giá M 3',
  'KL M 3',
  'Giá M 2',
  'KL M 2',
  'Giá M 1',
  'KL M 1',
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
    border: 0,
  },
}));


const OrderBook = () => {
  return (
    <div>
      <div className='flex m-4'>
        <span className='font-semibold block mr-4'>Sổ lệnh</span>
        <ul className='flex'>
          <li className='border-b'>
            <button>Thường</button>
          </li>
          <li className='px-4 border-b text-red-500 border-red-500'>
            <button>Thường</button>
          </li>
          <li className='border-b'>
            <button>Thường</button>
          </li>
        </ul>
      </div>
      <div className='m-2'>
        <ul className='flex'>
          <li>
            <span>KL đặt: 600</span>
          </li>
          <li className='mx-2 border-x px-2'>
            <span>KL đặt: 600</span>
          </li>
          <li>
            <span>KL đặt: 600</span>
          </li>
        </ul>
      </div>
      <div>
        <TableContainer component={Paper} sx={{ backgroundColor: 'black', maxHeight: '300px' }}>
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
                      }
                    }}
                    align='center'
                  >
                    {tableHeading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                      borderLeft: '1px solid lightgray',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      color: 'white',
                    }}
                  >
                    {row.calories}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default OrderBook