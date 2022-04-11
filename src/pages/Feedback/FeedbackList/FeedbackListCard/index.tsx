import { ArrowDropDown, ArrowDropUp, Translate } from '@mui/icons-material';
import { Paper, Stack } from '@mui/material';
import { Avatar, Typography } from '../../../../components';

type FeedbackListCardProps = {
  name: string;
  amount: number;
  type: 'recieved' | 'sent';
  createdAt: string;
};

export const FeedbackListCard = ({
  amount,
  createdAt,
  name,
  type,
}: FeedbackListCardProps) => {
  return (
    <Paper sx={{ mt: 4 }}>
      <Stack sx={{ px: 2, pt: 5.5, pb: 3.25, position: 'relative' }}>
        <Avatar
          sx={{
            height: '64px',
            width: '64px',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Typography
          sx={{
            textAlign: 'center',
            font: 'normal normal bold 18px/20px Roboto',
            color: '#172031',
            mb: 2,
          }}
        >
          {name}
        </Typography>
        <Typography variant="overline">Pontos de Feedback</Typography>
        <Stack direction="row" alignItems="center">
          <Typography
            variant="points"
            sx={{ fontSize: '1.875rem', lineHeight: '2.3125rem' }}
          >
            {amount}
          </Typography>
          {type === 'recieved' ? (
            <ArrowDropDown color="success" sx={{ fontSize: '2.3125rem' }} />
          ) : (
            <ArrowDropUp color="error" sx={{ fontSize: '2.3125rem' }} />
          )}
        </Stack>
        <Typography
          variant="overline"
          sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
        >
          {createdAt}
        </Typography>
      </Stack>
    </Paper>
  );
};
