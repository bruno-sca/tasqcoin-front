/* eslint-disable no-nested-ternary */
import { Stack } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  active: boolean;
  disabled: boolean;
  onClick?: () => void;
  page: ReactNode;
};

export const FeedbackButton = ({ active, disabled, onClick, page }: Props) => {
  return (
    <Stack
      sx={{
        height: '35px',
        width: '35px',
        borderRadius: '4px',
        backgroundColor: active ? 'primary.main' : '#fff',
        color: active ? '#fff' : disabled ? '#BCBCCB' : '#A1A0AE',
        cursor: active || disabled ? 'default' : 'pointer',
      }}
      justifyContent="center"
      alignItems="center"
      onClick={() => {
        if (!active && !disabled && onClick) onClick();
      }}
    >
      {page}
    </Stack>
  );
};
