import { FormControl, FormHelperText, Input, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button, Modal, TextField, Typography } from '../../../components';
import { SearchInput } from '../../../components/SearchInput';
import { Slider } from '../../../components/Slider';
import { useAuth } from '../../../contexts';
import { useDebounceState } from '../../../hooks';
import { services } from '../../../services';
import { useFeedback } from '../FeedbackContext';

type CreateFeedbackForm = {
  targetUser: UserData | undefined;
  amount: number;
  description: string;
};

export const FeedbackCreateModal = () => {
  const {
    data: { user },
  } = useAuth();

  const {
    data: { isModalOpen: open },
    actions: { reloadFeedbacks, setModalOpen },
  } = useFeedback();

  const [inputValue, setInputValue, debouncedInputValue] = useDebounceState('');
  const [options, setOptions] = useState<UserData[]>([]);
  const {
    errors,
    isSubmitting,
    touched,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik<CreateFeedbackForm>({
    initialValues: {
      targetUser: undefined,
      amount: 0,
      description: '',
    },
    onSubmit: async ({ targetUser, ...rest }) =>
      services.feedback
        .createFeedback({ user_to_id: targetUser.id, ...rest })
        .then(() => {
          toast.success('Feedback created successfully!');
          reloadFeedbacks();
          resetForm();
          setModalOpen(false);
        }),
    validationSchema: yup.object({
      amount: yup
        .number()
        .min(1, 'Minumum amount required is 1')
        .max(Number(user?.balance ?? 0), 'Invalid amount')
        .required('Required Field'),
      targetUser: yup.object().required('Required Field'),
    }),
  });

  useEffect(() => {
    if (debouncedInputValue.length === 0) {
      setOptions([]);
      return;
    }
    services.user
      .searchUser(debouncedInputValue)
      .then(({ data }) => setOptions(data));
  }, [debouncedInputValue]);

  return (
    <Modal
      onClose={() => setModalOpen(false)}
      title="Distribuir Pontos"
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={1.5}>
          <Typography variant="body1">Colaborador</Typography>
          <SearchInput
            color="secondary"
            clearOnBlur={false}
            placeholder="Pesquisar colaborador"
            options={options}
            getOptionLabel={(option: UserData) => option.name}
            value={values.targetUser}
            inputValue={inputValue}
            onChange={(e, newValue: UserData) =>
              setFieldValue('targetUser', newValue)
            }
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            error={touched.targetUser && !!errors.targetUser}
            helperText={
              touched.targetUser &&
              !!errors.targetUser &&
              String(errors.targetUser)
            }
            isOptionEqualToValue={(option, val) => option.alias === val.alias}
            filterOptions={(x) => x}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Quantidade de Pontos
          </Typography>
          <FormControl>
            <Stack direction="row" spacing={2} sx={{ pl: 1.5 }}>
              <Slider
                id="amount"
                name="amount"
                min={0}
                max={Number(user?.balance ?? 0)}
                value={values.amount}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
              <Input
                id="amount"
                name="amount"
                size="small"
                value={values.amount}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Stack>
            {touched.amount && errors.amount && (
              <FormHelperText error>{errors.amount}</FormHelperText>
            )}
          </FormControl>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Deixe uma mensagem:
          </Typography>
          <TextField
            id="description"
            name="description"
            color="secondary"
            onChange={handleChange}
            value={values.description}
            error={touched.description && !!errors.description}
            helperText={touched.description && errors.description}
            multiline
            fullWidth
            minRows={3}
          />
          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button
              onClick={() => setModalOpen(false)}
              disabled={isSubmitting}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>
            <Button disabled={isSubmitting} type="submit" variant="contained">
              Enviar Feedback
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};
