import { Paper, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { Typography } from '../../../../components';

type FeedbackBalanceCardProps = {
  title: string;
  icon: ReactNode;
  amount: number;
};

export const FeedbackBalanceCard = ({
  amount,
  icon,
  title,
}: FeedbackBalanceCardProps) => {
  return (
    <Paper sx={{ height: 90 }}>
      <Stack justifyContent="space-between" sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{ fontWeight: 'medium' }}
            color="grey.400"
            variant="subtitle1"
          >
            {title}
          </Typography>
          {icon}
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="points">{amount}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
