import { Add } from '@mui/icons-material';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { IconButton, Tab, Tabs } from '../../../components';
import { Avatar } from '../../../components/Avatar';
import { useFeedback } from '../FeedbackContext';

export const FeedbackHeader = () => {
  const {
    data: { targetUser, feedbackType },
    actions: { setModalOpen, changeFeedbackType },
  } = useFeedback();

  return (
    <Paper sx={{ mt: 8.5, mb: 4 }}>
      <Stack sx={{ px: 3.5 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{
              height: 136,
              width: 136,
              position: 'absolute',
              top: 0,
              left: -1,
              transform: 'translateY(-50%)',
            }}
            src={targetUser?.avatar_url}
          />
          <Typography
            variant="h5"
            sx={{ mt: 3.75, ml: 17.5, mb: 1, fontWeight: 'medium' }}
          >
            {targetUser?.name}
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', px: 1.5 }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={feedbackType}
            onChange={(_, value) => changeFeedbackType(value)}
            sx={{ textTransform: 'none' }}
          >
            <Tab label="Geral" value="both" />
            <Tab label="Recebidos" value="recieved" />
            <Tab label="Enviados" value="sent" />
          </Tabs>
          <IconButton
            onClick={() => setModalOpen(true)}
            size="large"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translateY(50%)',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <Add sx={{ fontSize: '32px' }} />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
};
