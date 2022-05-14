import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getReport } from '../../../services/api-admin.service';
import { Grid } from '@mui/material';
import { GetReportResponse } from '../../../services/api-admin.type';
import { numberWithCommas } from '../../../lib/utils';

function BasicCard({ title, content }: { title: string; content?: string }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

const DashboardPage = () => {
  const [report, setReport] = React.useState<GetReportResponse | null>(null);

  const fetchData = async () => {
    const list = await getReport();
    setReport(list);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white h-full w-11/12">
      <Typography align="center" variant="h4" sx={{ my: 2 }}>
        Thông kê trong vòng 7 ngày
      </Typography>
      <Box sx={{ mx: 4, my: 2 }}>
        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 4, md: 4 }}>
          <Grid item xs={3}>
            <BasicCard title="Tài khoản" content={report?.user.count + ' tạo mới'} />
          </Grid>
          <Grid item xs={3}>
            <BasicCard title="Công ty" content={report?.company.count + ' tạo mới'} />
          </Grid>

          <Grid item xs={3}>
            <BasicCard title="Số lệnh đã đặt" content={report?.stockOrder.count + ' lệnh'} />
          </Grid>
          <Grid item xs={3}>
            <BasicCard title="Số lệnh đã khớp" content={report?.matchedOrder.count + ' lệnh'} />
          </Grid>
          <Grid item xs={3}>
            <BasicCard
              title="GT lệnh đã đặt"
              content={
                numberWithCommas(
                  report?.stockOrder.records.reduce((sum, cur) => sum + (cur.quantity || 0) * (cur.price || 0), 0)
                ) + ' VNĐ'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <BasicCard
              title="GT lệnh đã khớp"
              content={
                numberWithCommas(
                  report?.matchedOrder.records.reduce((sum, cur) => sum + (cur.quantity || 0) * (cur.price || 0), 0)
                ) + ' VNĐ'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <BasicCard
              title="GT lệnh mua đã đặt"
              content={
                numberWithCommas(
                  report?.stockOrder.records
                    .filter((o) => o.isBuy)
                    .reduce((sum, cur) => sum + (cur.quantity || 0) * (cur.price || 0), 0)
                ) + ' VNĐ'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <BasicCard
              title="GT lệnh bán đã đặt"
              content={
                numberWithCommas(
                  report?.stockOrder.records
                    .filter((o) => !o.isBuy)
                    .reduce((sum, cur) => sum + (cur.quantity || 0) * (cur.price || 0), 0)
                ) + ' VNĐ'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <BasicCard
              title="GT lệnh mua đã khớp"
              content={
                numberWithCommas(
                  report?.matchedOrder.records
                    .filter((o) => o.order?.isBuy)
                    .reduce((sum, cur) => sum + (cur.quantity || 0) * (cur.price || 0), 0)
                ) + ' VNĐ'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <BasicCard
              title="GT lệnh bán đã khớp"
              content={
                numberWithCommas(
                  report?.matchedOrder.records
                    .filter((o) => !o.order?.isBuy)
                    .reduce((sum, cur) => sum + (cur.quantity || 0) * (cur.price || 0), 0)
                ) + ' VNĐ'
              }
            />
          </Grid>

          <Grid item xs={3}>
            <BasicCard
              title="Doanh thu"
              content={
                numberWithCommas(report?.matchedOrder.records.reduce((sum, cur) => sum + (cur.fee || 0), 0)) + ' VNĐ'
              }
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardPage;
