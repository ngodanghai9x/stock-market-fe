import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ImageUpload from '../../components/ImageUpload';
import { AppContext } from '../../context';
import { flatGrouped } from '../../lib/utils';
import PriceTable from '../../modules/dash/components/PriceTable';
import { User } from '../../services/api-admin.type';
import { customerChangePassword } from '../../services/api-auth.service';

const PriceTableDashboard = () => {
  const { register, handleSubmit } = useForm<User>();
  const { store, matchingGrouped, marketHistory, fetchData } = React.useContext(AppContext);

  const registerHandler: SubmitHandler<User> = async (data) => {
    // const res = await customerPriceTableDashboard(data);
    // console.log(res)
  };
  const list = flatGrouped(matchingGrouped, store, marketHistory);

  return (
    <div>
      {/* <ImageUpload /> */}
      <PriceTable list={list} />
    </div>
  );
};

export default PriceTableDashboard;
