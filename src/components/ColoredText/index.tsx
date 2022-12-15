import { ReactNode } from 'react';

export const ColoredText = ({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) => {
  return (
    <mark
      style={{
        color,
        background: 'transparent',
      }}
    >
      {children}
    </mark>
  );
};
