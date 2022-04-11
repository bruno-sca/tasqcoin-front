import { Today } from '@mui/icons-material';
import { Box, Grid, Stack } from '@mui/material';
import { Typography } from '../../../components';
import { FeedbackListCard } from './FeedbackListCard';

export const FeedbackList: React.FC = () => {
  return (
    <Stack spacing={4} sx={{ mt: 6 }}>
      <Stack spacing={1.75} direction="row" alignItems="center">
        <Today sx={{ fontSize: '29px' }} color="secondary" />
        <Typography variant="points">Feedbacks do Mês</Typography>
      </Stack>
      <Box>
        <Grid container columns={[1, 2, 4]} spacing={5}>
          <Grid item xs={1}>
            <FeedbackListCard
              name="Claud Davies"
              amount={100}
              createdAt="20/03/2022"
              type="recieved"
            />
          </Grid>
          <Grid item xs={1}>
            <FeedbackListCard
              name="Claud Davies"
              amount={100}
              createdAt="20/03/2022"
              type="recieved"
            />
          </Grid>
          <Grid item xs={1}>
            <FeedbackListCard
              name="Claud Davies"
              amount={100}
              createdAt="20/03/2022"
              type="recieved"
            />
          </Grid>
          <Grid item xs={1}>
            <FeedbackListCard
              name="Claud Davies"
              amount={100}
              createdAt="20/03/2022"
              type="recieved"
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};
