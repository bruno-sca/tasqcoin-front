import { Add } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Avatar, TextField, Typography } from '../../../components';
import { useAuth } from '../../../contexts';
import { services } from '../../../services';

export const UserProfileDisplayInfo = () => {
  const {
    data: { user },
    actions: { updateUserData },
  } = useAuth();

  const [avatar, setAvatar] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');

  useEffect(() => {
    setUserName(user?.name);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    await Promise.all([
      services.user.changeUserAvatar(avatar),
      ...(avatar && [services.user.changeUserName(userName)]),
    ])
      .then(() => {
        toast.success('Profile updated successfully!');
        updateUserData();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3.75 }}>
        Informações Pessoais
      </Typography>
      <Stack direction="row" spacing={4}>
        <Box
          sx={{
            borderRadius: '50%',
            borderWidth: '1px',
            borderColor: 'secondary.main',
            borderStyle: 'solid',
            p: 0.75,
          }}
        >
          <Avatar
            sx={{
              height: 136,
              width: 136,
            }}
            src={user?.avatar_url}
          />
        </Box>
        <Stack sx={{ width: '100%', pt: 1 }} spacing={4}>
          <TextField
            value={userName}
            onChange={({ target: { value } }) => setUserName(value)}
            label="Nome"
            variant="standard"
            fullWidth
          />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button startIcon={<Add />} variant="outlined" component="label">
              Adicionar Foto
              <input
                onChange={({ target: { files } }) => setAvatar(files[0])}
                type="file"
                hidden
              />
            </Button>
            <Typography>Formatos: png, jpg.</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="end" sx={{ mt: 1.75 }}>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Salvar
        </Button>
      </Stack>
    </Box>
  );
};
