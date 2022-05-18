import { Stack } from '@mui/material';

import { FeedbackBalance } from './FeedbackBalance';
import { FeedbackProvider } from './FeedbackContext';
import { FeedbackCreateModal } from './FeedbackCreateModal';
import { FeedbackHeader } from './FeedbackHeader';
import { FeedbackList } from './FeedbackList';
import { FeedbackPagination } from './FeedbackList/FeedbackPagination';

export const Feedback = () => {
  return (
    <FeedbackProvider>
      <Stack>
        <FeedbackHeader />
        <FeedbackBalance />
        <FeedbackList />
      </Stack>
      <FeedbackCreateModal />
      <FeedbackPagination />
    </FeedbackProvider>
  );
};
