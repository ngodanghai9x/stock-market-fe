import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/auth/AuthContext';
import { SxProps } from '@mui/material';
import { stringAvatar } from '../lib/utils';

export default function LetterAvatar({ name, sx, noWrap }: { name?: string; sx?: SxProps; noWrap?: boolean }) {
  const { user } = React.useContext(AuthContext);
  if (noWrap) {
    return <Avatar {...stringAvatar(name || user.fullName, sx)} />;
  }
  return (
    <div className="border-solid border-warmGray-50 border-2 rounded-full">
      <Avatar {...stringAvatar(name || user.fullName, sx)} />
    </div>
  );
}
