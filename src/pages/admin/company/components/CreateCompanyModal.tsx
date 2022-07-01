import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomModal from '../../../../components/CustomModal';
import { Company, CreateCompanyPayload, Industry } from '../../../../services/api-admin.type';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useContext, useEffect, useState } from 'react';
import { createCompany, editCompany, getAllIndustry } from '../../../../services/api-admin.service';
import ValidateMessage from '../../../../components/ValidateMessage';
import ImageUpload from '../../../../components/ImageUpload';
import { FileState, MyResponse } from '../../../../types';
import { AppContext } from '../../../../context';
import { OPTIONS_NUMBER, RoleIdType, StatusIdType, StatusLabelType } from '../../../../constants';
import { AuthContext } from '../../../../context/auth/AuthContext';

type CreateCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editRecord?: Company;
  fetchData: () => Promise<void>;
};

const CreateCompanyModal = ({ isOpen, onClose, editRecord, fetchData }: CreateCompanyModalProps) => {
  const { user } = useContext(AuthContext);
  const [ipoDate, setIpoDate] = useState<Date | null>(null);
  const [foundedDate, setFoundedDate] = useState<Date | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [fileState, setFileState] = useState<FileState | null>(null);
  const [fileUrl, setFileUrl] = useState<string>(editRecord?.certificateUrl || ' ');

  const { filestackClient } = React.useContext(AppContext);

  const listIndustry = new Map<string, number>(
    industries.map((el) => {
      return [el.industryName, el.industryId];
    })
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<CreateCompanyPayload>({
    mode: 'onBlur',
    defaultValues: {
      company: editRecord || {
        ipoDate: new Date(),
      },
      isIpo: true,
    },
  });

  useEffect(() => {
    const getData = async () => {
      const res: Industry[] = await getAllIndustry();
      setIndustries(res.filter((o) => o.statusId === StatusIdType.activated));
    };
    getData();
  }, []);

  React.useEffect(() => {
    resetForm();
  }, [editRecord]);

  const resetForm = () => {
    setFileState(null);
    setFileUrl(editRecord?.certificateUrl || '');
    reset({
      company: editRecord || {
        ipoDate: new Date(),
      },
      isIpo: true,
    });
  };

  const onChangeFile = (file: FileState) => {
    setFileState(file);
    setFileUrl('');
  };

  const uploadFile = async (): Promise<string | void> => {
    if (fileState) {
      return await filestackClient
        .upload(fileState.file)
        .then((data: { url: string }) => {
          setFileUrl(data.url);
          return data.url;
        })
        .catch((err: Error) => console.error('filestackClient', err));
    }
  };

  const onSubmit: SubmitHandler<CreateCompanyPayload> = async (data) => {
    try {
      const url = fileUrl || (await uploadFile()) || '';
      const formData = {
        ...data,
        account: {
          username: data.company.companyName,
        },
        company: {
          ...data.company,
          certificateUrl: url,
          industryId: listIndustry.get(getValues('company.industryId').toString()) || 0,
        },
      };
      let res = {} as MyResponse<any>;
      if (editRecord) {
        res = await editCompany(formData, formData.company.companyId);
      } else {
        res = await createCompany(formData);
      }
      if (res.status === 200) {
        resetForm();
        fetchData();
        onClose();
      }
      toast(res.message);
    } catch (error: any) {
      toast(error?.message || error?.data.message);
    }
  };

  const getDisableFrom = () => {
    if (!editRecord) return false;
    if (!editRecord?.editable) {
      return editRecord?.statusId !== StatusIdType.pending;
    }
    if (user.roleId === RoleIdType.moderator) {
      return editRecord?.statusId !== StatusIdType.pending;
    }
    return false;
  };

  const statusOptions = React.useMemo(() => {
    const opt = [StatusIdType.activated, StatusIdType.deleted];
    if (editRecord?.statusId) {
      opt.push(+editRecord?.statusId as StatusIdType);
    }
    if (editRecord?.statusId == StatusIdType.pending) {
      opt.push(StatusIdType.reject);
    }
    return Array.from(new Set(opt));
  }, [editRecord?.statusId]);

  return (
    <div>
      <CustomModal
        modalTitle={`${editRecord ? 'Chỉnh sửa' : 'Thêm mới'} công ty`}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-10 mb-4">
            <p className="mt-4 font-medium">Công ty: </p>
            <div className="grid grid-cols-2 gap-0 ml-[-0.5rem] mr-[-0.5rem]">
              <div className="my-1 mx-2">
                <TextField
                  id="company-name"
                  required
                  label="Tên công ty"
                  variant="standard"
                  className="w-full"
                  {...register('company.companyName', { required: true })}
                />
                {errors?.company?.companyName && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <Autocomplete
                  freeSolo
                  disableClearable
                  options={industries.map((option) => option.industryName)}
                  defaultValue={getValues('company.industry.industryName')}
                  renderInput={(params) => (
                    <div className="">
                      <TextField
                        {...params}
                        {...register('company.industryId')}
                        required
                        label="Ngành nghề"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                      {errors?.company?.industryId && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                    </div>
                  )}
                />
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="contact-email"
                  required
                  label="Email"
                  variant="standard"
                  className="w-full"
                  {...register('company.contactEmail', {
                    required: true,
                    pattern: /^[a-z][a-z0-9_\-.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i,
                    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors?.company?.contactEmail && <ValidateMessage>Email không đúng định dạng</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="website-url"
                  label="Website"
                  variant="standard"
                  className="w-full"
                  {...register('company.websiteUrl', {
                    required: false,
                    pattern:
                      /^((http:|https:|http:|https:)\/\/(www\.)?)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,255}(:[0-9]{1,5})?(\/.*)?$/i,
                  })}
                />
                {errors?.company?.websiteUrl && <ValidateMessage>URL không đúng định dạng</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="phone-number"
                  label="Số điện thoại"
                  variant="standard"
                  className="w-full"
                  {...register('company.phoneNumber', {
                    required: false,
                    maxLength: 10,
                    minLength: 10,
                    pattern: /^((09|03|07|08|05)+([0-9]{8})\b)$/,
                  })}
                />
                {errors?.company?.phoneNumber && <ValidateMessage>Số điện thoại không đúng định dạng</ValidateMessage>}
              </div>
              <div className="my-1 mx-2">
                <TextField
                  id="number-employees"
                  label="Số lượng nhân viên"
                  variant="standard"
                  className="w-full"
                  {...register('company.numEmployees', {
                    required: false,
                    ...OPTIONS_NUMBER,
                  })}
                />
                {errors?.company?.numEmployees && (
                  <ValidateMessage>
                    {errors?.company?.numEmployees.message || `Số nhân viên phải là số nguyên dương không quá 1 tỷ`}Ư
                  </ValidateMessage>
                )}
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  orientation="portrait"
                  label="Ngày niêm yết"
                  inputFormat="MM/dd/yyyy"
                  value={ipoDate}
                  className="w-full"
                  onChange={(newValue) => {
                    setIpoDate(newValue);
                  }}
                  disabled={getValues().isIpo}
                  renderInput={(params) => (
                    <div className="my-1 mx-2">
                      <TextField variant="standard" className="w-full" {...params} />
                      {errors?.company?.ipoDate && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                    </div>
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  orientation="portrait"
                  label="Ngày thành lập"
                  inputFormat="MM/dd/yyyy"
                  value={foundedDate}
                  className="w-full"
                  onChange={(newValue) => {
                    setFoundedDate(newValue);
                  }}
                  renderInput={(params) => (
                    <div className="my-1 mx-2">
                      <TextField variant="standard" className="w-full" {...params} />
                      {errors?.company?.foundedDate && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                    </div>
                  )}
                />
              </LocalizationProvider>
            </div>

            {editRecord ? (
              user.roleId === RoleIdType.admin && (
                <>
                  <div className="mb-2">
                    <FormControl variant="standard" className="w-full">
                      <InputLabel id="company.statusId">Trạng thái</InputLabel>
                      <Select
                        variant="standard"
                        labelId="company.statusId"
                        {...register('company.statusId', { required: true, valueAsNumber: true })}
                        defaultValue={+getValues('company.statusId')}
                        label="Trạng thái"
                      >
                        {statusOptions.map((id, i) => {
                          return (
                            <MenuItem key={i + id + i + `statusOptions`} value={+id}>
                              {StatusLabelType[id]}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {errors?.company?.statusId && <ValidateMessage>Trường này bắt buộc phải nhập</ValidateMessage>}
                  </div>
                </>
              )
            ) : (
              <>
                <div className="flex gap-5">
                  <div className="flex -ml-3">
                    <Checkbox
                      id="isIpo"
                      {...register('isIpo')}
                      checked={getValues('isIpo')}
                      onClick={() => {
                        setIpoDate(new Date());
                      }}
                    />
                    <label className="mt-2 cursor-pointer select-none" htmlFor="isIpo">
                      Niêm yết ngay
                    </label>
                  </div>
                  <div className="flex -ml-3">
                    <Checkbox id="newChangePW" {...register('needChangePw')} />
                    <label className="mt-2 cursor-pointer select-none" htmlFor="newChangePW">
                      Cần thay đổi mật khẩu
                    </label>
                  </div>
                </div>

                <p className="mt-2 font-medium">Cố phiếu: </p>
                <div className="my-2">
                  <TextField
                    id="stock-symbol"
                    required
                    label="Mã cổ phiếu"
                    variant="standard"
                    className="w-full"
                    {...register('stock.stockSymbol', { required: true, pattern: /^[A-Z]{3,5}$/ })}
                  />
                  {errors?.stock?.stockSymbol && (
                    <ValidateMessage>Mã cổ phiếu chỉ gồm 3-5 kí tự chữ in hoa</ValidateMessage>
                  )}
                </div>
                <div className="mb-2">
                  <TextField
                    id="quantity"
                    required
                    label="Số lượng cổ phiếu"
                    variant="standard"
                    className="w-full"
                    type="number"
                    {...register('stock.quantity', { required: true, ...OPTIONS_NUMBER })}
                  />
                  {errors?.stock?.quantity && (
                    <ValidateMessage>
                      {errors?.stock?.quantity.message || `Trường này bắt buộc phải nhập`}
                    </ValidateMessage>
                  )}
                </div>
                <div className="mb-2">
                  <TextField
                    id="price"
                    required
                    label="Giá cổ phiếu"
                    variant="standard"
                    className="w-full"
                    type="number"
                    {...register('stock.price', { required: true, ...OPTIONS_NUMBER })}
                  />
                  {errors?.stock?.price && (
                    <ValidateMessage>{errors?.stock?.price.message || `Trường này bắt buộc phải nhập`}</ValidateMessage>
                  )}
                </div>
              </>
            )}
            <div className="mt-4">
              <ImageUpload disabled={getDisableFrom()} onChange={onChangeFile} fileUrl={fileUrl} />
            </div>
          </div>
          <div className="flex justify-end px-6 pb-6">
            <div className="mr-3">
              <Button type="button" variant="outlined" className="mr-3" onClick={onClose}>
                Hủy
              </Button>
            </div>
            <Button disabled={getDisableFrom()} type="submit" variant="contained">
              Lưu
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateCompanyModal;
