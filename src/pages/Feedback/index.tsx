import { Stack } from '@mui/material';
import { FeedbackBalance } from './FeedbackBalance';
import { FeedbackProvider } from './FeedbackContext';
import { FeedbackHeader } from './FeedbackHeader';
import { FeedbackList } from './FeedbackList';

export const Feedback = () => {
  return (
    <FeedbackProvider>
      <Stack>
        <FeedbackHeader />
        <FeedbackBalance />
        <FeedbackList />
      </Stack>
    </FeedbackProvider>
  );
};
