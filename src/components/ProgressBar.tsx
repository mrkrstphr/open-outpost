import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ProgressBarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  percent: number;
};

export const ProgressBar = ({ percent, className, ...props }: ProgressBarProps) => (
  <div className={`box-border h-2 border border-green-500 bg-black p-0.5 ${className}`} {...props}>
    <div className="h-full bg-green-500" style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
  </div>
);
