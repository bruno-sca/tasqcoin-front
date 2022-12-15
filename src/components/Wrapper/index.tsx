import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthProvider } from '../../contexts';
import { Login } from '../../pages';
import { WrapperHeader } from './WrapperHeader';

export const Wrapper = () => {
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem('@tasq/token')
  );

  if (!isLogged) return <Login setIsLogged={(logged) => setIsLogged(logged)} />;

  return (
    <AuthProvider>
      <Stack>
        <WrapperHeader setIsLogged={(logged) => setIsLogged(logged)} />
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
