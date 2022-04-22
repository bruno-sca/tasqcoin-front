import { ArrowBack } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';

import { logo_purple, logo_white } from '../../assets/images';
import { IconButton } from '../../components';
import { Typography } from '../../components/Typography';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const Login: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Stack direction="row" sx={{ minHeight: '100vh' }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          width: '100%',
          maxWidth: [0, 0, '600px', '600px'],
          backgroundColor: 'primary.main',
          display: ['none', 'none', 'flex'],
        }}
      >
        <Stack alignItems="center">
          <Box
            component="img"
            sx={{
              height: 176,
              width: 176,
              mb: '55px',
            }}
            alt=""
            src={logo_white}
          />
          <Typography
            sx={{
              font: 'normal normal 300 20px Segoe UI',
              letterSpacing: '10.5px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            BEM VINDO A
          </Typography>
          <Typography
            sx={{
              font: 'normal normal 600 72px Montserrat',
              color: 'white',
            }}
          >
            TasqCoin
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Box
          component="img"
          sx={{
            position: 'absolute',
            top: '60px',
            right: '64px',
            height: 70,
            width: 70,
          }}
          alt=""
          src={logo_purple}
        />
        {!isSignIn && (
          <IconButton
            onClick={() => setIsSignIn(true)}
            sx={{
              position: 'absolute',
              top: ['56px', '72px', '90px'],
              left: [20, 20, 36, 52],
              color: 'black',
            }}
          >
            <ArrowBack sx={{ fontSize: '30px' }} />
          </IconButton>
        )}
        <Stack
          sx={{
            px: [4, 6, 8, 10],
            height: '100%',
            width: '100%',
            maxWidth: { sx: '100%', md: '640px' },
          }}
          justifyContent="center"
          spacing={6}
        >
          <Typography sx={{ ml: [0, -2] }} variant="h4">{`Sign ${
            isSignIn ? 'In' : 'Up'
          }`}</Typography>
          {isSignIn ? (
            <SignInForm setSignUp={() => setIsSignIn(false)} />
          ) : (
            <SignUpForm setSignIn={() => setIsSignIn(true)} />
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
