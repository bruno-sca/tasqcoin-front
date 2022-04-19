import { Box, Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { WrapperHeader } from './WrapperHeader';

export const Wrapper = () => {
  const token = localStorage.getItem('@tasq/token');

  if (!token) return <Navigate to="/auth" />;

  return (
    <Stack>
      <WrapperHeader />
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          marginY: [2, 3, 6],
          marginX: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};
