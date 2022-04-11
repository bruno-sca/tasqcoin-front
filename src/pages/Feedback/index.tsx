import { Stack } from '@mui/material';
import { FeedbackBalance } from './FeedbackBalance';
import { FeedbackHeader } from './FeedbackHeader';
import { FeedbackList } from './FeedbackList';

export const Feedback = () => {
  return (
    <Stack>
      <FeedbackHeader />
      <FeedbackBalance />
      <FeedbackList />
    </Stack>
  );
};
