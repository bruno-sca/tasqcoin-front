import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Paper, Stack, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import { Avatar, Typography } from '../../../../components';

export const FeedbackListCard = ({
  amount,
  created_at,
  description,
  type,
  user_from,
  user_to,
}: Feedback) => {
  const user: UserData = type === 'sent' ? user_to : user_from;
  const [, setSearchParams] = useSearchParams();
  return (
    <Tooltip title={description}>
      <Paper
        sx={{ mt: 4, cursor: 'pointer' }}
        onClick={() => setSearchParams({ user: user.id })}
      >
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
            src={user.avatar_url}
          />
          <Typography
            sx={{
              textAlign: 'center',
              font: 'normal normal bold 18px/20px Roboto',
              color: '#172031',
              mb: 2,
            }}
          >
            {user.name}
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
            {dayjs(created_at).format('DD/MM/YYYY')}
          </Typography>
        </Stack>
      </Paper>
    </Tooltip>
  );
};
