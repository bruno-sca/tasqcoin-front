import { Paid, Savings } from '@mui/icons-material';
import { Grid, Stack } from '@mui/material';
import { Typography } from '../../../components';
import { FeedbackBalanceCard } from './FeedbackBalanceCard';

export const FeedbackBalance = () => {
  return (
    <Grid container columns={[1, 2, 3, 5]} spacing={5}>
      <Grid item xs={1}>
        <FeedbackBalanceCard
          title="Saldo Atual"
          amount={2600}
          icon={<Paid color="secondary" />}
        />
      </Grid>
      <Grid item xs={1}>
        <FeedbackBalanceCard
          title="Pontos a distribuir"
          amount={1000}
          icon={<Savings color="secondary" />}
        />
      </Grid>
      <Grid item xs={1}>
        <Stack sx={{ height: 90 }} justifyContent="center">
          <Typography
            color="grey.400"
            sx={{ font: 'normal normal normal 15px/25px Roboto' }}
          >
            Expiram em <br /> 14 dias
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
