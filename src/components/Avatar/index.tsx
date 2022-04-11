import { Avatar as MUIAvatar, AvatarProps } from '@mui/material';

export const Avatar = ({ children, ...props }: AvatarProps) => {
  return <MUIAvatar {...props}>{children}</MUIAvatar>;
};
