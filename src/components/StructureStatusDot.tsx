import clsx from 'clsx';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { StructureStatus } from '../types';

export type StructureStatusDotProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  status: StructureStatus;
};

const statusToClassMap: Record<StructureStatus, string> = {
  [StructureStatus.Building]: 'bg-gray-500',
  [StructureStatus.Online]: 'bg-green-500',
  [StructureStatus.Offline]: 'bg-gray-500',
  [StructureStatus.NoPower]: 'bg-red-500 animate-pulse',
};

export const StructureStatusDot = ({ className, status, ...props }: StructureStatusDotProps) => (
  <div className={clsx('rounded-full h-2 w-2', className, statusToClassMap[status])} {...props} />
);
