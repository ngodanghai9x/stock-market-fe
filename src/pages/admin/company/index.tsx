import { Button, CircularProgress } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CreateCompanyModal from './components/CreateCompanyModal';
import { getAllCompany, searchCompanies } from '../../../services/api-admin.service';
import { Company, Industry } from '../../../services/api-admin.type';
import { StatusLabelType } from '../../../constants';
import { formatDate } from '../../../lib/utils';
import SearchIcon from '@mui/icons-material/Search';
// export interface CompanyData {
//   companyId: number;
//   companyName: string;
//   stockSymbol: string;
//   industryId: number;
//   industry: Industry;
//   websiteUrl: string;
//   numEmployees: number;
//   foundedDate: string;
//   ipoDate: string;
//   statusId: number;
// }
interface Column {
  id: keyof Company;
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value?: string | number) => string;
}

const columns: readonly Column[] = [
  { id: 'companyId', label: 'ID', minWidth: 55 },
  { id: 'companyName', label: 'Tên công ty', minWidth: 120 },
  {
    id: 'stockSymbol',
    label: 'Mã cổ phiếu',
    minWidth: 65,
    align: 'left',
  },
  {
    id: 'industryId',
    label: 'Ngành nghề',
    minWidth: 170,
    align: 'left',
  },
  // {
  //   id: 'websiteUrl',
  //   label: 'Website',
  //   minWidth: 170,
  //   align: 'left',
  // },
  // {
  //   id: 'numEmployees',
  //   label: 'Số nhân viên',
  //   minWidth: 170,
  //   align: 'left',
  //   format: (value: number) => value.toFixed(2),
  // },
  {
    id: 'foundedDate',
    label: 'Ngày thành lập',
    minWidth: 170,
    align: 'left',
    format: (date) => formatDate(String(date || '')),
  },
  {
    id: 'ipoDate',
    label: 'Ngày niêm yết',
    minWidth: 170,
    align: 'left',
    format: (date) => formatDate(String(date || '')),
  },
  {
    id: 'editable',
    label: 'Có thể sửa',
    minWidth: 100,
    align: 'left',
    format: (id) => (id == 1 ? 'Có' : 'Không'),
  },
  {
    id: 'statusId',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'left',
    format: (id) => StatusLabelType[String(id)],
  },
];

const CompanyPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editRecord, setEditRecord] = useState<Company | undefined>(undefined);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const listCompany = await getAllCompany();
    setIsLoading(false);
    setCompanies(listCompany);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!isOpenModal) {
      setEditRecord(undefined);
    }
  }, [isOpenModal]);

  const toggleModal = useCallback(() => {
    setIsOpenModal((p) => !p);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDoubleClick = (record?: Company) => {
    setEditRecord(record);
    setIsOpenModal(true);
  };

  const searchHandler = async () => {
    if (!searchValue) return;
    setIsLoading(true);
    const res = await searchCompanies({
      q: searchValue,
      page: page + 1,
      size: 100,
    });
    setIsLoading(false);
    setCompanies(res.data.companies);
  };

  return (
    <div className="bg-white h-full w-11/12 relative">
      <div className="flex justify-end mt-4 mr-4 items-center">
        <div className="flex border mr-10 py-2 px-4 rounded-md focus-within:border-lightBlue-500">
          <input
            type="text"
            placeholder="Tìm kiếm công ty"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.keyCode !== 13) return;
              searchHandler();
            }}
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(event.currentTarget.value);
            }}
            className="mr-2 focus:outline-none"
          />
          <button onClick={searchHandler}>
            <SearchIcon />
          </button>
        </div>
        <Button variant="outlined" onClick={toggleModal} className="py-2">
          Thêm mới
        </Button>
      </div>
      <div className="mt-5 px-4 ">
        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <CircularProgress />
          </div>
        )}

        {!isLoading && (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 545, minHeight: 545 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id + 'th'} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.companyId}
                        onDoubleClick={() => handleDoubleClick(row)}
                      >
                        {columns.map((column) => {
                          const value = column.id === 'industryId' ? row.industry.industryName : row[column.id];
                          return (
                            <TableCell key={column.id + 'tr'} align={column.align}>
                              {column.format ? column.format(value?.toString()) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Số bản ghi trên từng trang"
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={companies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
      <CreateCompanyModal isOpen={isOpenModal} onClose={toggleModal} editRecord={editRecord} fetchData={fetchData} />
    </div>
  );
};

export default CompanyPage;
