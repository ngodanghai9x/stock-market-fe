import React from 'react';
import { FileState } from '../types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify';

export default function ImageUpload({
  onChange,
  setFileUrl,
  disabled,
  fileUrl,
}: {
  disabled?: boolean;
  onChange?: (fileState: FileState) => void;
  fileUrl?: string;
  setFileUrl: (url: string) => void;
}): JSX.Element {
  const [fileState, setFileState] = React.useState<FileState | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = String(reader.result);
      const state: FileState = {
        file,
        fileName: file.name,
        base64,
      };
      setFileState(state);
      onChange && onChange(state);
    };
  };

  return (
    <div className="">
      <input
        className="hidden"
        accept="image/png, image/jpeg"
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChangeFile}
        disabled={disabled}
      />
      <label htmlFor="contained-button-file" className={disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}>
        <div>Tải lên chứng chỉ</div>
        {fileState ? (
          <img src={fileState?.base64} alt="" className="max-w-[100px] min-w-[100px] aspect-square" />
        ) : fileUrl ? (
          <img src={fileUrl} alt="" className="max-w-[100px] min-w-[100px] aspect-square" />
        ) : (
          <div className="w-[100px] h-[100px] rounded bg-gray-200 text-gray-400 flex justify-center items-center">
            <AddPhotoAlternateIcon className="w-10 h-10" />
          </div>
        )}
      </label>
    </div>
  );
}
