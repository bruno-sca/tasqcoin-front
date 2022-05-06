import { PersonOutlineRounded } from '@mui/icons-material';
import { Paper, Stack } from '@mui/material';

import { Typography } from '../../components';
import { UserProfileDisplayInfo } from './UserProfileDisplayInfo';
import { UserProfilePassword } from './UserProfilePassword';

export const UserProfile = () => {
  return (
    <Paper>
      <Stack spacing={3} sx={{ p: 4, width: '100%' }} alignItems="center">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <PersonOutlineRounded
            color="secondary"
            sx={{ fontSize: '1.875rem' }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
            Meu Perfil
          </Typography>
        </Stack>

        <Stack spacing={4} sx={{ maxWidth: 640, width: '100%' }}>
          <UserProfileDisplayInfo />
          <UserProfilePassword />
        </Stack>
      </Stack>
    </Paper>
  );
};
