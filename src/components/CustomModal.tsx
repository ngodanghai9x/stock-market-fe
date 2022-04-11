import { Close } from '@mui/icons-material';
import Modal from '@mui/material/Modal'
import { ReactNode } from 'react';

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  modalTitle: string;
}

const CustomModal = ({ open, onClose, children, modalTitle }: CustomModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className='bg-white absolute top-2/4 left-2/4 -translate-x-1/2	-translate-y-1/2 w-5/12 rounded'>
          <div className='flex justify-between border-b p-4'>
            <h1 className='text-xl font-bold '>{modalTitle}</h1>
            <Close onClick={onClose} className='cursor-pointer' />
          </div>
          {children}
        </div>
      </Modal>
    </div>
  )
}

export default CustomModal