import {
  Modal as MUIModal,
  ModalProps as MUIModalProps,
  Box,
  Divider,
} from '@mui/material';
import { ReactNode } from 'react';

import { Typography } from '..';

type ModalProps = {
  styles?: {};
  title: string;
  children?: ReactNode;
} & MUIModalProps;

export const Modal = ({
  children,
  styles,
  title,
  ...propsModal
}: ModalProps) => {
  return (
    <MUIModal {...propsModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 16px)',
          maxWidth: '44rem',
          maxHeight: 'calc(100% - 16px)',
          bgcolor: 'background.paper',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'secondary.main',
          borderRadius: 1,
          p: 3,
          ...styles,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Divider sx={{ mt: 1, mb: 3 }} />
        {children}
      </Box>
    </MUIModal>
  );
};
