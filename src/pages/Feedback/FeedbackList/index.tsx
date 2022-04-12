import { Today } from '@mui/icons-material';
import { Box, Grid, Stack } from '@mui/material';
import { Typography } from '../../../components';
import { useFeedback } from '../FeedbackContext';
import { FeedbackListCard } from './FeedbackListCard';

export const FeedbackList: React.FC = () => {
  const {
    data: {
      feedbacksData: { feedbacks },
    },
  } = useFeedback();
  return (
    <Stack spacing={4} sx={{ mt: 6 }}>
      <Stack spacing={1.75} direction="row" alignItems="center">
        <Today sx={{ fontSize: '29px' }} color="secondary" />
        <Typography variant="points">Feedbacks do Mês</Typography>
      </Stack>
      <Box>
        <Grid container columns={[1, 2, 4]} spacing={5}>
          {feedbacks.map(({ id, ...rest }) => (
            <Grid key={id} item xs={1}>
              <FeedbackListCard id={id} {...rest} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
