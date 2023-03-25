import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { logout } from 'providers/AuthProvider';
import { useAuthDispatch } from 'hooks/useAuthDispatch';
import { useAuthState } from 'hooks/useAuthState';

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAuthDispatch();
  const { isLoggedIn } = useAuthState();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <IconButton onClick={handleClick}>
        <AccountCircleIcon style={{ width: 40, height: 40 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isLoggedIn && (
          <MenuItem onClick={handleClose}>
            {' '}
            <Link
              to="/profile"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Profile
            </Link>
          </MenuItem>
        )}
        {isLoggedIn ? (
          <MenuItem onClick={() => logout(dispatch)}>Sign Out</MenuItem>
        ) : (
          <MenuItem>
            {' '}
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Sign In
            </Link>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
