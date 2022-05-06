import { Box, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { Button, TextField, Typography } from '../../../components';
import { services } from '../../../services';

interface IFormState {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const UserProfilePassword = () => {
  const {
    errors,
    isSubmitting,
    touched,
    values,
    handleChange,
    handleSubmit,
    submitForm,
    resetForm,
  } = useFormik<IFormState>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async (payload) =>
      services.user.changeUserPassword(payload).then(() => {
        toast.success('Password changed successfully!');
        resetForm();
      }),
  });

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3.75 }}>
        Alterar Senha
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            type="password"
            variant="standard"
            id="password"
            name="password"
            color="secondary"
            label="Senha atual"
            onChange={handleChange}
            value={values.password}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            fullWidth
          />
          <TextField
            type="password"
            variant="standard"
            id="newPassword"
            name="newPassword"
            color="secondary"
            label="Nova senha"
            onChange={handleChange}
            value={values.newPassword}
            error={touched.newPassword && !!errors.newPassword}
            helperText={touched.newPassword && errors.newPassword}
            fullWidth
          />
          <TextField
            type="password"
            variant="standard"
            id="confirmNewPassword"
            name="confirmNewPassword"
            color="secondary"
            label="Confirme a nova senha"
            onChange={handleChange}
            value={values.confirmNewPassword}
            error={touched.confirmNewPassword && !!errors.confirmNewPassword}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            fullWidth
          />
        </Stack>
      </form>
      <Stack direction="row" justifyContent="end" sx={{ mt: 1.75 }}>
        <Button
          disabled={isSubmitting}
          onClick={submitForm}
          color="primary"
          variant="contained"
        >
          Salvar Senha
        </Button>
      </Stack>
    </Box>
  );
};
