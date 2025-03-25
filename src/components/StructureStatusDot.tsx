import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BuildingStatus } from '../types';

export type StructureStatusDotProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  status: BuildingStatus;
};

const statusToClassMap: Record<BuildingStatus, string> = {
  [BuildingStatus.Building]: 'bg-gray-500',
  [BuildingStatus.Online]: 'bg-green-500',
  [BuildingStatus.Offline]: 'bg-gray-500',
  [BuildingStatus.NoPower]: 'bg-red-500 animate-pulse',
};

export const StructureStatusDot = ({ className, status, ...props }: StructureStatusDotProps) => (
  <div className={clsx('rounded-full h-2 w-2', className, statusToClassMap[status])} {...props} />
);
