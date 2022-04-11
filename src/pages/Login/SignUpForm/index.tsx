import { Stack } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, TextField } from '../../../components';
import { services } from '../../../services';

interface IFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISignUpForm {
  setSignIn: () => void;
}

export const SignUpForm = ({ setSignIn }: ISignUpForm) => {
  const [formState, setFormState] = useState<IFormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await services.user
      .signup(formState)
      .then(() => {
        toast.success('Account successfully created!');
        setSignIn();
      })
      .finally(() => setLoading(false));
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
          onChange={handleChange}
          fullWidth
          name="name"
          label="Name"
          variant="standard"
        />
        <TextField
          onChange={handleChange}
          fullWidth
          name="email"
          label="E-mail"
          variant="standard"
        />
        <TextField
          onChange={handleChange}
          fullWidth
          name="password"
          label="Password"
          variant="standard"
          type="password"
        />
        <TextField
          onChange={handleChange}
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          variant="standard"
          type="password"
        />
      </Stack>
      <Stack
        sx={{ mt: 6 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="contained" type="submit">
          CREATE ACCOUNT
        </Button>
      </Stack>
    </form>
  );
};
