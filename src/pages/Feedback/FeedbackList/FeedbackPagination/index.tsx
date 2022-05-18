import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useCallback } from 'react';

import { useFeedback } from '../../FeedbackContext';
import { FeedbackButton } from './FeedbackButton';

export const FeedbackPagination = () => {
  const {
    data: {
      feedbacksData: { currentPage, totalPages },
    },
    actions: { changePage },
  } = useFeedback();

  const pageButtonNumbers = useCallback(() => {
    if (totalPages <= 3)
      return Array(totalPages)
        .fill(0)
        .map((_, idx) => idx + 1);

    let start = currentPage - 1;
    let end = currentPage + 1;

    if ([1, totalPages].includes(currentPage)) {
      if (currentPage === 1) {
        start = currentPage;
        end = currentPage + 2;
      } else {
        start = currentPage - 2;
        end = currentPage;
      }
    }

    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);
  }, [currentPage, totalPages]);

  return (
    <Stack sx={{ mt: 6.5 }} direction="row" justifyContent="center">
      <Stack direction="row" spacing={1}>
        <FeedbackButton
          active={false}
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          page={<ChevronLeft htmlColor="inherit" />}
        />
        {pageButtonNumbers().map((page) => (
          <FeedbackButton
            active={page === currentPage}
            onClick={() => changePage(page)}
            disabled={false}
            page={page}
          />
        ))}
        <FeedbackButton
          active={false}
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
          page={<ChevronRight htmlColor="inherit" />}
        />
      </Stack>
    </Stack>
  );
};
