import { Stack } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Typography } from '../../../components';
import { useAuth } from '../../../contexts';

interface IFormState {
  email: string;
  password: string;
}

interface ISignInForm {
  setSignUp: () => void;
}

export const SignInForm: React.FC<ISignInForm> = ({ setSignUp }) => {
  const {
    actions: { login },
  } = useAuth();
  const [formState, setFormState] = useState<IFormState>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(formState, setLoading);
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
        <Button
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          size="small"
          variant="text"
        >
          Forgot Password?
        </Button>
        <Button disabled={loading} variant="contained" type="submit">
          log in
        </Button>
      </Stack>
      <Stack sx={{ mt: 6 }} alignItems="center">
        <Button
          fullWidth
          sx={{ textTransform: 'none', width: '290px' }}
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
            Don't have an account?
          </Typography>
          &nbsp;Sign Up
        </Button>
      </Stack>
    </form>
  );
};
