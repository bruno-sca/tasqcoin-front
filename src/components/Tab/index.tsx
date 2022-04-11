import { Tab as MUITab, TabProps } from '@mui/material';

export const Tab = ({ sx, ...props }: TabProps) => {
  return (
    <MUITab
      sx={{
        textTransform: 'none',
        font: 'normal normal normal 18px/18px Roboto',
        ...sx,
      }}
      {...props}
    />
  );
};
