import { Stack } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, TextField, Typography } from '../../../components';
import { services } from '../../../services';

interface IFormState {
  email: string;
  password: string;
}

interface ISignInForm {
  setSignUp: () => void;
  setIsLogged?: (isLogged: boolean) => void;
}

export const SignInForm: React.FC<ISignInForm> = ({
  setSignUp,
  setIsLogged,
}) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<IFormState>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (setLoading) setLoading(true);
    await services.auth
      .login(formState)
      .then(({ data: { refresh_token, token } }) => {
        localStorage.setItem('@tasq/refresh_token', refresh_token);
        localStorage.setItem('@tasq/token', token);
        if (setIsLogged) setIsLogged(true);

        const url = sessionStorage.getItem('prevUrl');
        if (url) sessionStorage.removeItem('prevUrl');

        navigate(url || '/', { replace: !!url });
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1}>
        <TextField
          fullWidth
          onChange={handleChange}
          name="email"
          label="E-mail"
          variant="standard"
        />
        <TextField
          fullWidth
          onChange={handleChange}
          name="password"
          label="Password"
          variant="standard"
          type="password"
        />
      </Stack>
      <Stack
        sx={{ mt: 6 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button sx={{ fontWeight: 'bold' }} size="small" variant="text">
          Forgot Password?
        </Button>
        <Button disabled={loading} variant="contained" type="submit">
          log in
        </Button>
      </Stack>
      <Stack sx={{ mt: 6 }} alignItems="center">
        <Button
          fullWidth
          sx={{ width: '100%', maxWidth: '290px' }}
          variant="outlined"
          onClick={setSignUp}
          disabled={loading}
        >
          <Typography
            sx={{
              color: 'black',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }}
          >
            Don&apos;t have an account?
          </Typography>
          &nbsp;Sign Up
        </Button>
      </Stack>
    </form>
  );
};
