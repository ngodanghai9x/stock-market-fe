import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className='m-5'>
      <Typography align="center" variant="h4">
        Bạn chưa đăng nhập hoặc token đã hết hạn
      </Typography>
      <div className="flex justify-center m-2">
        <Button variant="contained">
          <Link to="/login">Đăng nhập ngay</Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
