import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MoneyInfo from './MoneyInfo';

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
  'Giá',
  'KL',
  '+/-',
  'Giá B 1',
  'KL B 1',
  'Giá B 2',
  'KL B 2',
  'Giá B 3',
  'KL B 3',
  'Cao',
  'TB',
  'Thấp',
  'T.KL',
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
}));

const Table1 = () => {
  return (
    <div className="w-screen h-screen bg-trueGray-800 grid grid-rows-4 grid-flow-col">
      <div className="row-span-2">
        <TableContainer component={Paper} sx={{ backgroundColor: 'black' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeadings.map((tableHeading) => (
                  <TableCell
                    sx={{
                      color: 'white',
                      fontWeight: '600',
                      backgroundColor: 'gray',
                      borderLeft: '1px solid lightgray',
                    }}
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
                      borderLeft: '1px solid lightgray',
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
      <MoneyInfo />
    </div>
  );
};

export default Table1;
