import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type BoxProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Box = ({ children, className, ...props }: BoxProps) => (
  <div className={clsx('border border-purple-500 p-1', className)} {...props}>
    {children}
  </div>
);
