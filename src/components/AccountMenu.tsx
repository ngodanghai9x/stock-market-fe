import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LetterAvatar from './LetterAvatar';
import { USER_SIDEBAR } from './user/layout/UserSideBar';
import { PATH_NAMES } from '../constants/path-name';
import CustomLink from './CustomLink';
import { AuthContext } from '../context/auth/AuthContext';
import { RoleIdType } from '../constants';
import { Login } from '@mui/icons-material';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = React.useContext(AuthContext);
  const open = Boolean(anchorEl);

  const USER_MENU = React.useMemo(() => {
    const toReturn = {
      [PATH_NAMES.admin.slice(1)]: { label: 'Trang quản lý', render: () => <PersonIcon />, exact: true },
      ...USER_SIDEBAR,
      [PATH_NAMES.logout.slice(1)]: { label: 'Đăng xuất', render: () => <Logout fontSize="small" />, exact: true },
      [PATH_NAMES.login.slice(1)]: { label: 'Đăng nhập', render: () => <Login fontSize="small" />, exact: true },
    };

    if (![RoleIdType.admin, RoleIdType.moderator].includes(user.roleId)) {
      delete toReturn[PATH_NAMES.admin.slice(1)];
    }
    if (!user?.userId) {
      delete toReturn[PATH_NAMES.logout.slice(1)];
    } else {
      delete toReturn[PATH_NAMES.login.slice(1)];
    }
    return toReturn;
  }, [user.roleId, user?.userId]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Thông tin cá nhân">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, py: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
            <LetterAvatar />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <Divider /> */}
        {Object.keys(USER_MENU).map((option) => (
          <MenuItem>
            <CustomLink to={USER_MENU[option].exact ? `/${option}` : `/user/${option}`}>
              <span className="mr-3">{USER_MENU[option].render()}</span>
              <span className="">{USER_MENU[option].label}</span>
            </CustomLink>
          </MenuItem>
        ))}
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
