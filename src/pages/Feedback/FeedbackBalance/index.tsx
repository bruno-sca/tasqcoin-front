import { Paid, Savings } from '@mui/icons-material';
import { Grid, Stack, useTheme } from '@mui/material';

import { ColoredText, Typography } from '../../../components';
import { useFeedback } from '../FeedbackContext';
import { FeedbackBalanceCard } from './FeedbackBalanceCard';

export const FeedbackBalance = () => {
  const {
    data: { balance, dark_balance, targetUser },
  } = useFeedback();

  const theme = useTheme();

  return (
    <Grid container columns={[1, 2, 3, 5]} spacing={5}>
      <Grid item xs={1}>
        <FeedbackBalanceCard
          title="Saldo Atual"
          amount={balance}
          icon={<Paid color="secondary" />}
        />
      </Grid>
      <Grid item xs={1}>
        <FeedbackBalanceCard
          title={
            <>
              Saldo{' '}
              <ColoredText color={theme.palette.error.main}>
                negativo
              </ColoredText>{' '}
              Atual
            </>
          }
          amount={dark_balance}
          icon={<Paid color="error" />}
        />
      </Grid>
      <Grid item xs={1}>
        <FeedbackBalanceCard
          title="Pontos a distribuir"
          amount={targetUser?.balance}
          icon={<Savings color="secondary" />}
        />
      </Grid>
      <Grid item xs={1}>
        <FeedbackBalanceCard
          title={
            <>
              Pontos{' '}
              <ColoredText color={theme.palette.error.main}>
                negativos
              </ColoredText>{' '}
              a distribuir
            </>
          }
          amount={targetUser?.dark_balance}
          icon={<Savings color="error" />}
        />
      </Grid>
      <Grid item xs={1}>
        <Stack sx={{ height: 90 }} justifyContent="center">
          <Typography
            color="grey.400"
            sx={{ font: 'normal normal normal 15px/25px Roboto' }}
          >
            Expiram em <br /> 15 dias
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
