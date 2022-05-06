import { Box, Stack } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthProvider } from '../../contexts';
import { WrapperHeader } from './WrapperHeader';

export const Wrapper = () => {
  const token = localStorage.getItem('@tasq/token');

  if (!token) return <Navigate to="/auth" />;

  return (
    <AuthProvider>
      <Stack>
        <WrapperHeader />
        <Box
          sx={{
            maxWidth: '1200px',
            width: '100%',
            marginY: [2, 3, 6],
            marginX: 'auto',
            px: 3,
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </AuthProvider>
  );
};
