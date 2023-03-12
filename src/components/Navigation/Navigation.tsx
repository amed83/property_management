import Box from '@mui/material/Box';
import { ProfileMenu } from './ProfileMenu';

export const Navigation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ProfileMenu />
    </Box>
  );
};
