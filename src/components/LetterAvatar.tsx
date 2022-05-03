import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/auth/AuthContext';
import { SxProps } from '@mui/material';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, sx?: SxProps) {
  try {
    return {
      sx: {
        ...sx,
        bgcolor: stringToColor(name),
        // width: 32,
        // height: 32,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } catch (error) {
    console.log('LetterAvatar', name);
    console.error('error', name);
  }
}

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
