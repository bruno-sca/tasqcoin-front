import { Tabs as MUITabs, TabsProps } from '@mui/material';

export const Tabs = ({ children, ...props }: TabsProps) => {
  return <MUITabs {...props}>{children}</MUITabs>;
};
